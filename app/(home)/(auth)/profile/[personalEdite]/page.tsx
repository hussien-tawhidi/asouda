"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import ProfileEditForm from "@/components/profile/edit/ProfileEditForm";

type FormData = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
};

type UserData = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  birthday?: string | null;
};

const getBirthdayValue = (birthday?: string | null) => {
  if (!birthday) return "";

  return birthday.includes("T") ? birthday.split("T")[0] : birthday;
};

export default function PersonalEditPage() {
  const { data: session, status, update } = useSession();

  const user = session?.user as UserData | undefined;

  const [form, setForm] = useState<FormData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /*
   * Create form only when we actually have a user.
   *
   * We use lazy state initialization so we don't need
   * useEffect + setState.
   */
  const [initializedUser, setInitializedUser] = useState<string | null>(null);

  const userKey = user?.email ?? null;

  if (status === "authenticated" && user && initializedUser !== userKey) {
    setInitializedUser(userKey);

    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      birthday: getBirthdayValue(user.birthday),
    });
  }

  if (status === "loading") {
    return (
      <div className='flex min-h-60 items-center justify-center'>
        <p className='text-sm text-espresso-clay/60'>
          در حال دریافت اطلاعات...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <div className='flex min-h-60 items-center justify-center rounded-3xl border border-espresso-clay/10'>
        <p className='text-sm text-espresso-clay/60'>
          لطفاً ابتدا وارد حساب کاربری خود شوید.
        </p>
      </div>
    );
  }

  if (!form) {
    return null;
  }

  const originalForm: FormData = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    birthday: getBirthdayValue(user?.birthday),
  };

  const isDirty = JSON.stringify(form) !== JSON.stringify(originalForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [name]: value,
      };
    });

    setError(null);
    setSuccess(false);
  };

  const validate = (): string | null => {
    if (!form.name.trim()) {
      return "لطفاً نام و نام خانوادگی را وارد کنید.";
    }

    if (!form.email.trim()) {
      return "لطفاً ایمیل را وارد کنید.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return "فرمت ایمیل وارد شده صحیح نیست.";
    }

    if (!form.phone.trim()) {
      return "لطفاً شماره تلفن را وارد کنید.";
    }

    if (!/^09\d{9}$/.test(form.phone.trim())) {
      return "شماره تلفن باید ۱۱ رقم و با ۰۹ شروع شود.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      await axios.patch("/api/auth/edit-profile", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        birthday: form.birthday || null,
      });

      await update();

      setSuccess(true);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? ((
            err.response?.data as {
              message?: string;
            }
          )?.message ?? "خطا در ذخیره تغییرات. لطفاً دوباره تلاش کنید.")
        : "خطا در ذخیره تغییرات. لطفاً دوباره تلاش کنید.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='md:w-[70%] w-[90%] mx-auto'>
      <section className='rounded-3xl p-6 shadow-sm ring-1 ring-espresso-clay/5 sm:p-8'>
        {/* Header */}
        <div className='mb-8'>
          <p className='text-sm text-espresso-clay/50'>حساب کاربری</p>

          <h1 className='mt-2 text-2xl font-bold text-espresso-clay'>
            اطلاعات شخصی
          </h1>

          <p className='mt-2 text-sm leading-7 text-espresso-clay/60'>
            اطلاعات شخصی خود را بررسی و در صورت نیاز ویرایش کنید.
          </p>
        </div>
        <ProfileEditForm
          form={form}
          submitting={submitting}
          error={error}
          success={success}
          isDirty={isDirty}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}
