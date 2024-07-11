import { NextResponse } from "next/server";

export  async function POST(req, res) {
    const response = NextResponse.json({
        msg: "logout Done",
        status: 200
    });

    // Clear the "token" cookie
    response.cookies.set( "token", "");

    return response;
}
