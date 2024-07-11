import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  
  let { userId } = params;

  console.log('Received request with userId:', userId); // Log received userId

  try {
    // Convert userId to an integer
    userId = parseInt(userId, 10);
    console.log(userId)

    const user = await prisma.contactBook.findMany({
      where: { userId },
    });

    console.log('User found:', user); // Log found user

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error); // Log the error
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
