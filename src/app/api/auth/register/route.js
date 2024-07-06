import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ msg: "Fill all fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);
  
      const newUser = await prisma.user.create({
        data: { email, password: secPassword },
      });
  
      return NextResponse.json(
        { msg: "User created successfully" }, { status: 200 }
      );
    }else{
        return NextResponse.json({ msg: "User already exists" }, { status: 404 });
    }


  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
