"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileEdit() {
  const router = useRouter();

  const [role, setRole] = useState("beginner");
  const [nickname, setNickname] = useState("");
  const [childAge, setChildAge] = useState<number | "">("");
  const [childCount, setChildCount] = useState<number | "">("");
  const [location, setLocation] = useState("");

  // 登録処理
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          childrenAge: childAge,
          childrenNum: childCount,
          location,
          isBeginner: role === "beginner",
        }),
      });

      if (res.ok) {
        router.push("/profile"); // 成功したらプロフィールページへ遷移
      } else {
        alert("登録に失敗しました");
      }
    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    }
  };

  return (
    <>
      {/* 画面全体 */}
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300">
        {/* 登録画面 */}
        <div className="flex flex-col items-center w-120 h-210 bg-gradient-to-b from-pink-300 to-white rounded-2xl shadow-2xl">
          <ul className="steps text-xs items-center mt-16">
            <li className="step step-primary text-xs">新規登録</li>
            <li className="step step-primary text-xs">プロフィール登録</li>
          </ul>

          <p className="text-center text-4xl font-bold text-pink-500 mt-8">
            ママプロフィール作成
          </p>
          <p className="text-center text-base font-bold text-pink-400 mt-4">
            他のママに紹介されるプロフィールを入力してください
          </p>

          {/* ベテランか新米か選ぶ */}
          <div className="p-4">
            <div className="flex flex-row">
              <label className="flex items-center space-x-2 mr-4">
                <input
                  type="radio"
                  name="role"
                  value="beginner"
                  checked={role === "beginner"}
                  onChange={(e) => setRole(e.target.value)}
                  className="radio text-pink-400"
                />
                <span className="text-pink-600 font-bold">新米ママ</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="veteran"
                  checked={role === "veteran"}
                  onChange={(e) => setRole(e.target.value)}
                  className="radio text-pink-400"
                />
                <span className="text-pink-600 font-bold">ベテランママ</span>
              </label>
            </div>
          </div>

          {/* 入力フォーム */}
          <div className="flex flex-col items-start py-2 space-y-2 mt-2">
            <span className="text-pink-500 font-bold">ニックネーム</span>
            <input
              type="text"
              name="nickname"
              placeholder="ニックネーム"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="h-10 w-90 mt-2 border-2 border-pink-400 rounded-xl px-4"
            />
          </div>

          <div className="flex flex-col items-start py-2 space-y-2 mt-2">
            <span className="text-pink-500 font-bold">お子様の年齢</span>
            <input
              type="number"
              name="childAge"
              placeholder="お子様の年齢"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value ? Number(e.target.value) : "")}
              className="h-10 w-90 mt-2 border-2 border-pink-400 rounded-xl px-4"
            />
          </div>

          <div className="flex flex-col items-start py-2 space-y-2 mt-2">
            <span className="text-pink-500 font-bold">お子様の人数</span>
            <input
              type="number"
              name="childCount"
              placeholder="お子様の人数"
              value={childCount}
              onChange={(e) => setChildCount(e.target.value ? Number(e.target.value) : "")}
              className="h-10 w-90 mt-2 border-2 border-pink-400 rounded-xl px-4"
            />
          </div>

          <div className="flex flex-col items-start py-2 space-y-2 mt-2">
            <span className="text-pink-500 font-bold">お住まい</span>
            <input
              type="text"
              name="location"
              placeholder="市まで入力してください"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-10 w-90 mt-2 border-2 border-pink-400 rounded-xl px-4"
            />
          </div>

          {/* 登録ボタン */}
          <button
            onClick={handleSubmit}
            className="h-16 w-88 bg-pink-400 text-xl text-white font-bold border border-pink-600 rounded-2xl mt-8"
          >
            はじめる
          </button>
        </div>
      </div>
    </>
  );
}
