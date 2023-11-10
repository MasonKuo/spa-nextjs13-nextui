import { apiLogger } from "@lib/loggerFormat";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
// const logger = require("@lib/logger");

export async function GET(_: Request) {
  const users = await prisma.person.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: Request) {
  const json = await request.json();
  const { name } = json ?? {};
  try {
    const _name = name?.trim();
    if (!_name) {
      return NextResponse.json({ msg: "name can't be empty" }, { status: 400 });
    }
    const user = await prisma.person.create({
      data: { name: _name },
    });

    return NextResponse.json(user, {
      status: 200,
      statusText: `create user success`,
    });
  } catch (error: any) {
    apiLogger(json, error?.message);
    if (error.code === "P2002") {
      return NextResponse.json({ msg: "name already exist" }, { status: 409 });
    }
    return NextResponse.json(
      { msg: error?.message },
      {
        status: 400,
      }
    );
  }
}
