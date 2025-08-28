export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    /* 入力チェック */
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "すべての項目を入力してください" }),
        { status: 400 }
      );
    }

    /* 既存ユーザーの重複チェック */
    const existUser = await prisma.user.findUnique({ where: { email } });
    if (existUser) {
      return new Response(
        JSON.stringify({ error: "すでに登録済みのメールアドレスです" }),
        { status: 400 }
      );
    }

    /* パスワードをハッシュ化 */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ユーザー作成 */
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    /* bigint対応して返す */
    const safeUser = {
      id: newUser.id.toString(),  // ← userId をフロントで使えるようにする
      email: newUser.email,
    };

    return new Response(JSON.stringify(safeUser), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "ユーザー登録中にエラーが発生しました" }),
      { status: 500 }
    );
  }
}


