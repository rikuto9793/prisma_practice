import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 更新
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();

  const profile = await prisma.profile.update({
    where: { id: Number(params.id) },
    data: {
      nickname: data.nickname,
      childrenAge: data.childrenAge,
      childrenNum: data.childrenNum,
      location: data.location,
      isBeginner: data.isBeginner,
    },
  });

  return NextResponse.json(profile);
}
