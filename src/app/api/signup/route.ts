import { PrismaClient } from "@prisma/client";
import { CgMoveTask } from "react-icons/cg";

const prisma = new PrismaClient();

export async function POST(req:Request) {
  try{
  const body = await req.json();
  const {email, password} = body;

  {/* 入力チェック */}
  if (!email || !password) {
    return new Response(
      JSON.stringify({error:"すべての項目を入力してください"}),
      {status: 400}
    );
  }
  {/* 処理内容 */}
  const newUser = await prisma.user.create({
      data: {
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    {/* BigInt変換 */}
    const safeUser = {
      ...newUser,
      id: newUser.id.toString(),  // ← これが重要
    };
    {/* ここよくわかんないから後で勉強　りくと */}
     return new Response(JSON.stringify(safeUser), { status: 201 }); // new Response()の第一引数がjsonのbodyになって、第二引数がオプション扱いでステータスとか入れてるだけ.
  } catch (error) {
    // catchの部分はエラーハンドリング
    console.error(error);
    return new Response(
      JSON.stringify({ error: "ユーザー登録中にエラーが発生しました" }),
      { status: 500 }
    );
  }
  }

