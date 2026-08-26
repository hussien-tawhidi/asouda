"use client";

import Input from "@/components/common/Input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/auth/forgot-password", {
        email,
      });

      setMessage(response.data.message);
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
          <h1 className='text-3xl font-bold'>فراموشی رمز عبور</h1>

          <p className='mt-2 text-sm text-gray-500'>
            ایمیل خود را وارد کنید تا لینک تغییر رمز برای شما ارسال شود.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <Input
            label='ایمیل'
            type='email'
            placeholder='ایمیل خود را وارد کنید'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <div className='rounded-xl bg-red-50 p-3 text-sm text-red-600'>
              {error}
            </div>
          )}

          {message && (
            <div className='rounded-xl bg-green-50 p-3 text-sm text-green-600'>
              {message}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-espresso-clay py-3 font-semibold text-white disabled:opacity-60'>
            {loading ? "در حال ارسال..." : "ارسال لینک تغییر رمز"}
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
