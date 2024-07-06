import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "iMeeLdsbhdgjhewkwejg#@$";

const prisma = new PrismaClient({
    log: ["query"],
});

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!findUser) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        const pwdCompare = await bcrypt.compare(password, findUser.password);
        if (!pwdCompare) {
            return NextResponse.json({ msg: "Password incorrect" }, { status: 400 });
        }

        const data = {
            user: {
                id: findUser.id,
            },
        };

        const authToken = jwt.sign(data, jwtSecret);
        return NextResponse.json({ msg: "Login successful", token: authToken }, { status: 200 });
    } catch (error) {
        console.error("Error during login process:", error);
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}
