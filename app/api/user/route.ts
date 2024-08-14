import { NextResponse } from 'next/server';

import { connectToDB } from '@/lib/connectToDB';
import User from '@/models/userSchema';

export async function POST(req) {
    await connectToDB();

    try {
        const data = await req.json();
        const user = new User(data);
        await user.save();
        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET(req) {
    await connectToDB();

    try {
        const users = await User.find({});
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
