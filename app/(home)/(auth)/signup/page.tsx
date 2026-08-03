"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/auth/register", form);

      router.push("/signin");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center p-6'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md rounded-2xl p-8 shadow-xl'>
        <h1 className='mb-8 text-center text-3xl font-bold'>ثبت نام</h1>

        <div className='space-y-5'>
          <input
            placeholder='نام'
            className='w-full rounded-xl border p-3'
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type='email'
            placeholder='ایمیل'
            className='w-full rounded-xl border p-3'
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type='password'
            placeholder='رمز عبور'
            className='w-full rounded-xl border p-3'
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className='w-full rounded-xl bg-espresso-clay py-3 font-semibold text-white'>
            {loading ? "در حال ثبت..." : "ثبت نام"}
          </button>
        </div>

        <p className='mt-6 text-center text-sm'>
          حساب دارید؟{" "}
          <Link href='/signin' className='font-semibold text-espresso-clay'>
            ورود
          </Link>
        </p>
      </form>
    </main>
  );
}
