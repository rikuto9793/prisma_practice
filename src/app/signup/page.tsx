"use client";
import React from 'react'
import { useState } from 'react';
import { PrismaClient } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";



export default function () {
  const [email, Setemail] = useState<string>("");
  const [password, Setpassword] = useState<string>("");
  const [ispassword, Setispassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // リロード防止
    // 実際の処理内容.
    // fetchでリクエスト送って、そのレスポンスが response に入る.この一連の動作が終わるまで次に進まないように await.
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });

    const data = await response.json();  // レスポンスの中身を取り出す（非同期）
    setMessage(data.error || "登録成功！");
  };
  return (
    <>
      {/* 画面全体 */}
      {/* 画面全体 */}
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300">
        {/* 登録画面 */}
        <div className="flex flex-col items-center w-120 h-210 bg-gradient-to-b from-pink-300 to-white rounded-2xl shadow-2xl">
          <p className="text-center text-4xl font-bold text-pink-500 mt-30">
            新規登録
          </p>
          {/* 入力フォーム */}
          <form onSubmit={handleSubmit} className="flex flex-col items-start mt-8">


            <div className="flex flex-col items-start w-full py-4 space-y-2">
              <span className="text-pink-500 font-bold">メールアドレス</span>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="email"
                className="h-10 w-90 mt-2 border-2 border-pink-400 rounded-xl px-4"
                onChange={(e) => Setemail(e.target.value)}
              />
            </div>


            {/* パスワード */}
            <div className="flex flex-col items-start mt-10 w-full">
              <span className="text-pink-500 font-bold">パスワード</span>
              <div className="relative w-full">
                <input
                  type={ispassword ? "text" : "password"} // ← useStateで切り替え
                  name="password"
                  value={password}
                  placeholder="Password"
                  className="h-10 w-90 mt-2 border-2 border-pink-400 rounded-xl px-4 pr-10"
                  onChange={(e) => Setpassword(e.target.value)}
                />
                {/* 目アイコン */}
                <div
                  className="absolute top-3/5 right-3 transform -translate-y-1/2 cursor-pointer text-pink-400"
                  onClick={() => Setispassword(!ispassword)}
                >
                  {ispassword ? (
                    // 開いてる目
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  ) : (
                    // 閉じてる目（斜線）
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="label mt-2 text-pink-400">
                半角英数字で8文字以上入力してください
              </p>
            </div>

          </form>
          {/* 登録ボタン */}
          <button type="submit" className="h-16 w-88 bg-pink-400 text-xl text-white font-bold border border-pink-600 rounded-2xl mt-16">登録する</button>
        </div>
      </div >
    </>
  )
}