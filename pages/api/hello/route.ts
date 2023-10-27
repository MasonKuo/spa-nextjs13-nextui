import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  const users = await prisma.person.findMany();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: Request) {
  const json = await request.json();
  const { name } = json ?? {};
  try {
    if (!name) {
      return new NextResponse("name can't be empty", { status: 404 });
    }
    const user = await prisma.person
      .create({
        data: { name },
      })
      .catch((e) => {
        return NextResponse.json(e, {
          status: 500,
          statusText: `create ${name} failed`,
        });
      });

    return NextResponse.json(user, {
      status: 200,
      statusText: `create ${name} success`,
    });
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error" },
      {
        status: 400,
        // statusText: `Create Person Failed`,
      }
    );
  }
}
