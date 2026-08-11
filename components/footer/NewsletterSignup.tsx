"use client";

import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   if (!email.trim()) return;

   setStatus("loading");
   setMessage("");

   try {
     const response = await fetch("/api/newsletter", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email: email.trim(),
       }),
     });

     const data = await response.json();

     if (!response.ok) {
       throw new Error(data.message || "خطا در ثبت‌نام");
     }

     setStatus("success");
     setMessage("با موفقیت در خبرنامه ثبت شدید! ");
     setEmail("");
   } catch (error) {
     console.error("Newsletter error:", error);

     setStatus("error");

     setMessage(
       error instanceof Error
         ? error.message
         : "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.",
     );
   }
 };
  return (
    <div className='mt-6'>
      <p className='mb-2 text-sm font-medium text-earth-brown/80'>
        عضویت در خبرنامه
      </p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-2 sm:flex-row'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='ایمیل خود را وارد کنید'
          required
          disabled={status === "loading" || status === "success"}
          className='flex-1 rounded-full border border-espresso-clay/30 bg-white/80 px-4 py-2 text-sm text-earth-brown placeholder-earth-brown/40 transition-shadow focus:border-espresso-clay/60 focus:outline-none focus:ring-2 focus:ring-espresso-clay/20 disabled:opacity-60'
          aria-label='آدرس ایمیل'
        />

        <button
          type='submit'
          disabled={status === "loading" || status === "success"}
          className='flex items-center justify-center gap-1 rounded-full bg-espresso-clay px-5 py-2 text-sm font-medium text-bone-white transition-all hover:bg-espresso-clay/90 focus:outline-none focus:ring-2 focus:ring-espresso-clay/50 disabled:opacity-70'>
          {status === "loading" ? (
            <Loader2 className='size-4 animate-spin' />
          ) : (
            <Mail className='size-4' />
          )}
          {status === "loading" ? "در حال ثبت..." : "ثبت نام"}
        </button>
      </form>

      {/* Feedback message */}
      {message && (
        <div
          className={`mt-2 flex items-center gap-2 text-sm transition-all ${
            status === "success" ? "text-green-600" : "text-red-500"
          }`}
          role='status'
          aria-live='polite'>
          {status === "success" ? (
            <CheckCircle className='size-4' />
          ) : (
            <AlertCircle className='size-4' />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
