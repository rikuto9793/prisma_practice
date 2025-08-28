import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const profile = await prisma.profile.create({
      data: {
        nickname: data.nickname,
        childrenAge: data.childrenAge,
        childrenNum: data.childrenNum,
        location: data.location,
        isBeginner: data.isBeginner,
        userId: uuidv4(), // 認証実装後にログインユーザーIDを入れる
        userIdentifier: data.userIdentifier ?? "dummy-identifier",
        phoneNumber: data.phoneNumber ?? "000-0000-0000",
        birthDate: data.birthDate ?? new Date(),
        userName: data.userName ?? "dummyUserName",
        graduationYear: data.graduationYear ?? 2000,
        gender: data.gender ?? "OTHER",
        affiliation: data.affiliation ?? "unknown",
        realName: data.realName ?? "dummyRealName",
        realNameKana: data.realNameKana ?? "ダミーリョウメイカナ",
        userSei: data.userSei ?? "ダミー姓",
        userSeiKana: data.userSeiKana ?? "ダミーセイカナ",
        userMeiKana: data.userMeiKana ?? "ダミーメイカナ",
        completed: data.completed ?? false,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "プロフィール作成中にエラーが発生しました" }, { status: 500 });
  }
}
