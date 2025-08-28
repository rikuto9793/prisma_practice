import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // パスワードハッシュ比較用
import jwt from "jsonwebtoken"; // JWT発行用

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // --- 入力チェック ---
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "メールとパスワードを入力してください" }),
        { status: 400 }
      );
    }

    // --- ユーザー検索 ---
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "ユーザーが存在しません" }),
        { status: 401 }
      );
    }

    // --- パスワード検証 ---
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: "パスワードが違います" }),
        { status: 401 }
      );
    }

    // --- JWT発行 ---
    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      process.env.JWT_SECRET as string,   // 秘密鍵（環境変数に置くこと！）
      { expiresIn: "1h" }                 // 有効期限: 1時間
    );

    // --- レスポンス ---
    return new Response(
      JSON.stringify({
        message: "ログイン成功",
        token
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "ログイン中にエラーが発生しました" }),
      { status: 500 }
    );
  }
}
