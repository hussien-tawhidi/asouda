"use client";

import { useState } from "react";
import { BiSend } from "react-icons/bi";
import Input from "../common/Input";
type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setStatus({
      type: null,
      message: "",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "خطا در ارسال پیام");
      }

      setStatus({
        type: "success",
        message: "پیام شما با موفقیت ارسال شد.",
      });

      setFormData(initialFormData);
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4' dir='rtl'>
      {/* Name + Email */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <Input
          label='نام کامل خودرا وارد کنید ...'
          id='name'
          value={formData.name}
          type='text'
          name='name'
          onChange={handleChange}
          placeholder='نام کامل خودرا وارد کنید ..'
        />
        <Input
          label=' ایمیل خودرا وارد کنید ...'
          id='email'
          value={formData.email}
          type='email'
          name='email'
          onChange={handleChange}
          placeholder=' ایمیل خودرا وارد کنید ..'
        />
      </div>

      {/* Phone + Subject */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <Input
          label=' شماره همراه خودرا وارد کنید ...'
          id='phone'
          value={formData.phone}
          type='text'
          name='phone'
          onChange={handleChange}
          placeholder=' شماره همراه خودرا وارد کنید ..'
        />
        <Input
          label='موضوع'
          id='subject'
          value={formData.subject}
          type='text'
          name='subject'
          onChange={handleChange}
          autoComplete=' موضوع ...'
          placeholder=' موضوع ...'
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor='message'
          className='mb-1 block text-sm font-medium text-espresso-clay'>
          پیام *
        </label>

        <textarea
          id='message'
          name='message'
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder='پیام خود را بنویسید...'
          className='w-full resize-none rounded-xl border border-espresso-clay/20 bg-bone-white/50 px-4 py-2.5 text-sm text-espresso-clay transition focus:border-earth-brown focus:outline-none focus:ring-2 focus:ring-earth-brown/20'
        />
      </div>

      {/* Status */}
      {status.message && (
        <div
          role='status'
          aria-live='polite'
          className={`rounded-xl px-4 py-3 text-sm ${
            status.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}>
          {status.message}
        </div>
      )}

      {/* Submit */}
      <button
        type='submit'
        disabled={isLoading}
        className='inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-espresso-clay px-6 py-3 text-sm font-medium text-bone-white transition hover:bg-earth-brown hover:shadow-lg hover:shadow-espresso-clay/20 disabled:cursor-not-allowed disabled:opacity-70'>
        {isLoading ? (
          <span>در حال ارسال...</span>
        ) : (
          <>
            <BiSend size={18} />
            ارسال پیام
          </>
        )}
      </button>
    </form>
  );
}
