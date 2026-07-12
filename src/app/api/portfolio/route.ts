import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ portfolio: data });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { ticker, assetType, companyName, quantity, averageBuyPrice } = body;

  if (!ticker || !assetType || quantity === undefined || averageBuyPrice === undefined) {
    return NextResponse.json(
      { error: "ticker, assetType, quantity, and averageBuyPrice are required" },
      { status: 400 }
    );
  }

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("portfolio")
    .upsert(
      {
        user_id: userId,
        ticker,
        asset_type: assetType,
        company_name: companyName,
        quantity: Number(quantity),
        average_buy_price: Number(averageBuyPrice),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,ticker" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get("ticker");

  if (!ticker) {
    return NextResponse.json({ error: "ticker is required" }, { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase
    .from("portfolio")
    .delete()
    .eq("user_id", userId)
    .eq("ticker", ticker);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
