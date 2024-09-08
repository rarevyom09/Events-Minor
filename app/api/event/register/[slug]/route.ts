import { NextResponse,NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import Event from "@/models/eventSchema";

export async function POST(req:NextRequest) {
  await connectToDB();
//   const { pathname } = new URL(req.url);
//   console.log("pathname: ", pathname);
//   const slug = pathname.split("/").pop();
  try {
    const body = await req.json();

    return NextResponse.json(
      { success: true, data:body},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
