import React from 'react'
import { FaBaby } from "react-icons/fa";
import { Kiwi_Maru } from "next/font/google";
import Link from 'next/link';


export default function page() {
  return (
    <>
      {/* 画面全体 */}
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300">
        {/* ホーム画面 */}
        <div className="flex flex-col items-center w-120 h-210 bg-gradient-to-b from-pink-300 to-white rounded-2xl shadow-2xl">
          {/* タイトル */}
          <div className="flex flex-col items-center w-full mt-30">
            <p className="text-center text-6xl font-bold text-pink-500" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              ikumi-
            </p>
            <div className="px-6 py-6 border-4 rounded-full border-white mt-8 shadow-2xl">
              <FaBaby className="w-20 h-20 text-pink-500" />
            </div>
          </div>
          <p className="text-center text-4xl font-bold  text-pink-500 mt-12" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            さっそく始める
          </p>

          {/* ログインボタンと新規登録ボタン */}
          <Link href="/login">
            <button className="h-16 w-88 bg-pink-400 text-white text-xl font-bold mt-16 rounded-2xl shadow-2xl">ログイン</button>
          </Link>
          <Link href="/signup">
            <button className="h-16 w-88 bg-pink-400 text-white text-xl font-bold mt-16 rounded-2xl shadow-2xl">新規登録</button>
          </Link>
        </div>

      </div>
    </>
  )
}