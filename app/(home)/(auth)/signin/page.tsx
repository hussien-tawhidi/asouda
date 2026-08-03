"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("خطایی رخ داده است. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center px-5'>
      <div className='w-full max-w-md rounded-3xl p-8 shadow-xl'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>
            ورود به پنل مدیریت
          </h1>

          <p className='mt-2 text-sm text-gray-500'>
            برای دسترسی به داشبورد وارد شوید
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              ایمیل
            </label>

            <input
              type='email'
              placeholder='example@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-espresso-clay'
              required
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              رمز عبور
            </label>

            <input
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-espresso-clay'
              required
            />
          </div>

          {error && (
            <div className='rounded-xl bg-red-50 p-3 text-sm text-red-600'>
              {error}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-espresso-clay py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'>
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className='mt-6 text-center text-sm text-gray-500'>
          حساب ندارید؟
          <Link
            href='/signup'
            className='mr-2 font-semibold text-espresso-clay'>
            ثبت نام
          </Link>
        </div>
      </div>
    </div>
  );
}
