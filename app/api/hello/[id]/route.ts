import { apiLogger } from "@lib/loggerFormat";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
const logger = require("@lib/logger");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log(params, `query ${id}`);
  const user = await prisma.person.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    return new NextResponse("No user with ID found", { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.person.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    apiLogger(params, error?.message);

    if (error.code === "P2025") {
      return NextResponse.json(
        { msg: "No user with ID found" },
        { status: 404 }
      );
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
