import { NextResponse } from 'next/server';



export async function GET(req) {
    
    try {
        return NextResponse.json({ success: true, "hello": "world" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
