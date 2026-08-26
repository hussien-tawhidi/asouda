"use client";

import Input from "@/components/common/Input";

import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("لینک بازیابی رمز عبور معتبر نیست.");
      return;
    }

    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/auth/reset-password", {
        token,
        password,
      });

      setSuccess(response.data.message);

      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error.response?.data?.message || "خطایی رخ داده است. دوباره تلاش کنید.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center px-5'>
      <div className='w-full max-w-md rounded-3xl p-8 shadow-xl'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold'>تغییر رمز عبور</h1>

          <p className='mt-2 text-sm text-gray-500'>
            رمز عبور جدید خود را وارد کنید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <Input
            label='رمز عبور جدید'
            type='password'
            placeholder='حداقل ۶ کاراکتر'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            label='تکرار رمز عبور'
            type='password'
            placeholder='رمز عبور را دوباره وارد کنید'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <div className='rounded-xl bg-red-50 p-3 text-sm text-red-600'>
              {error}
            </div>
          )}

          {success && (
            <div className='rounded-xl bg-green-50 p-3 text-sm text-green-600'>
              {success}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-espresso-clay py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60'>
            {loading ? "در حال تغییر..." : "تغییر رمز عبور"}
          </button>
        </form>

        <div className='mt-6 text-center text-sm'>
          <Link href='/signin' className='font-semibold text-espresso-clay'>
            بازگشت به ورود
          </Link>
        </div>
      </div>
    </main>
  );
}
