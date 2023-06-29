// export async function GET(request: Request) {
//     return new Response('Hello World!');
// }

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json(
        { message: "Hello World" },
        { status: 200, statusText: "Success" }
    );
}