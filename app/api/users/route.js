import connectMongoDB from "@/lib/mongodb";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, age, email, address, approvalStatus } = await request.json();

    await connectMongoDB();

    await Users.create({ name, age, email, address, approvalStatus });

    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const users = await Users.find({});
    
    return NextResponse.json({ users });
}

export async function DELETE(request) {
    await connectMongoDB();
    const id = request.nextUrl.searchParams.get("id");
    await Users.findByIdAndDelete(id);

    return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 });
}
