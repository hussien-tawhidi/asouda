import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendPasswordResetEmailProps {
  to: string;
  name: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: SendPasswordResetEmailProps) {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Asouda <onboarding@resend.dev>",

    to: [to],

    subject: "بازیابی رمز عبور | آسوده",

    html: `
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background: #f4efe6;
            font-family: Arial, sans-serif;
            direction: rtl;
          "
        >
          <div
            style="
              max-width: 600px;
              margin: 40px auto;
              padding: 40px 24px;
              background: #ffffff;
              border-radius: 20px;
            "
          >
            <div style="text-align: center;">
              <h1
                style="
                  margin: 0 0 25px;
                  color: #5b4c3a;
                  font-size: 28px;
                "
              >
                آسوده
              </h1>

              <h2
                style="
                  color: #333333;
                  font-size: 22px;
                "
              >
                بازیابی رمز عبور
              </h2>

              <p
                style="
                  color: #666666;
                  font-size: 15px;
                  line-height: 2;
                "
              >
                سلام ${name} عزیز،
              </p>

              <p
                style="
                  color: #666666;
                  font-size: 15px;
                  line-height: 2;
                "
              >
                برای تغییر رمز عبور حساب کاربری خود روی
                دکمه زیر کلیک کنید.
              </p>

              <a
                href="${resetUrl}"
                style="
                  display: inline-block;
                  margin: 20px 0;
                  padding: 14px 30px;
                  background: #5b4c3a;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 12px;
                  font-weight: bold;
                "
              >
                تغییر رمز عبور
              </a>

              <p
                style="
                  color: #888888;
                  font-size: 13px;
                  line-height: 2;
                "
              >
                این لینک فقط به مدت ۳۰ دقیقه معتبر است.
              </p>

              <p
                style="
                  color: #999999;
                  font-size: 12px;
                  margin-top: 30px;
                "
              >
                اگر شما درخواست تغییر رمز عبور نداده‌اید،
                این ایمیل را نادیده بگیرید.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error("RESEND_ERROR:", error);
    throw new Error("ارسال ایمیل با مشکل مواجه شد.");
  }

  return data;
}
