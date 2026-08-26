"use client";

import Input from "@/components/common/Input";
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
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  function validateForm() {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      phone: "",
    };

    // Name
    if (!form.name.trim()) {
      newErrors.name = "لطفاً نام خود را وارد کنید";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "نام باید حداقل ۲ حرف باشد";
    }

    // Phone
    const phoneRegex = /^09\d{9}$/;

    if (!form.phone.trim()) {
      newErrors.phone = "لطفاً شماره همراه خود را وارد کنید";
    } else if (!phoneRegex.test(form.phone.trim())) {
      newErrors.phone = "شماره همراه معتبر نیست";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "لطفاً ایمیل خود را وارد کنید";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    // Password
    if (!form.password) {
      newErrors.password = "لطفاً رمز عبور را وارد کنید";
    } else if (form.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/auth/register", {
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
      });

      router.push("/signin");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='mt-10 flex items-center justify-center p-3 md:p-6'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md rounded-2xl p-3 shadow-xl md:p-8'>
        <h1 className='mb-8 text-center text-3xl font-bold'>ثبت نام</h1>

        <div className='flex flex-col gap-3'>
          <div>
            <Input
              label='نام کامل'
              type='text'
              placeholder='نام کامل خود را وارد کنید'
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            {errors.name && (
              <p className='mt-1 text-xs text-red-500'>{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              label='شماره همراه'
              type='tel'
              inputMode='numeric'
              placeholder='09123456789'
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
            />

            {errors.phone && (
              <p className='mt-1 text-xs text-red-500'>{errors.phone}</p>
            )}
          </div>

          <div>
            <Input
              label='ایمیل'
              type='email'
              placeholder='ایمیل خود را وارد کنید'
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            {errors.email && (
              <p className='mt-1 text-xs text-red-500'>{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              label='رمز عبور'
              type='password'
              placeholder='رمز عبور'
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>{errors.password}</p>
            )}
          </div>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='mt-3 w-full rounded-xl bg-espresso-clay py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60'>
          {loading ? "در حال ثبت..." : "ثبت نام"}
        </button>

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
