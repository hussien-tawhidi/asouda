"use client";

import Input from "@/components/common/Input";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
          <Input
            label='ایمیل'
            type='email'
            placeholder='ایمیل خود را وارد کنید'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='relative'>
            {" "}
            <Input
              label='رمز عبور'
              type={showPassword ? "text" : "password"}
              placeholder='رمز عبور خود را وارد کنید'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute left-3 top-9.5 text-espresso-clay/60 transition hover:text-espresso-clay'
              aria-label={
                showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
              }>
              {" "}
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}{" "}
            </button>{" "}
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
        <div className='flex justify-end mt-3'>
          <Link
            href='/forgot-password'
            className='text-sm font-medium text-espresso-clay hover:underline'>
            رمز عبور را فراموش کرده‌اید؟
          </Link>
        </div>
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
