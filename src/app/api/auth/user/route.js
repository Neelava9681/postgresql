import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req) {
  try {
    // const { userId } = req.json();

    const user = await prisma.user.findMany({
      // where: { userId }, // Adjusted to match the field name in your database
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}

