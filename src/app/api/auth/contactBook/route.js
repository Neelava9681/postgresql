import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken"
import toast from "react-toastify"

const prisma = new PrismaClient();


export async function GET(req) {
  try {
    // const { userId } = req.json();

    const user = await prisma.contactBook.findMany({
      // where: { userId }, // Adjusted to match the field name in your database
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}



export async function POST(req) {
  try {
    const { Contacts_book_Name, number, Postal_Address, Email } = await req.json();

    const authToken = req.cookies.get("token")?.value;
    if (!authToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = jwt.verify(authToken, process.env.jwtSecret);
    
    const userId = parseInt(data, 10);
    console.log(userId);
    // const userId = parseInt(userIdStr, 10);

    console.log(userId);
    console.log(Contacts_book_Name);
    console.log(number);
    console.log(Postal_Address);
    console.log(Email);

    if (!Contacts_book_Name || !number || !Postal_Address || !Email || isNaN(userId)) {
      return NextResponse.json({ msg: "All fields are required" }, { status: 400 });
    }

    const addBook = await prisma.contactBook.create({
      data: {
        Contacts_book_Name: Contacts_book_Name,
        Email: Email,
        Postal_Address: Postal_Address,
        number: number,
        userId: userId,
      },
    });

    return NextResponse.json({ msg: "Contact added" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}