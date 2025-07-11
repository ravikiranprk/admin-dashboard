import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Users from "@/models/users";

export async function PUT(request, { params }) {
    const { id } = await params;
    const { newName: name, newAge: age, newEmail: email, newAddress: address, newApprovalStatus: approvalStatus } = await request.json();

    await connectMongoDB();
    await Users.findByIdAndUpdate(id , {  name, age, email, address, approvalStatus });

    return NextResponse.json({ message: "User Updated successfully!" }, { status: 200 });    
}

export async function GET(request, { params }) {
    const { id } = await params;
    
    await connectMongoDB();
    const user = await Users.findById({ _id: id });
    
    return NextResponse.json({ message: { user }}, { status: 200 });
}