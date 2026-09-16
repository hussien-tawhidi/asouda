"use client";

import Input from "@/components/common/Input";
import BirthdayPicker from "./BirthdayPicker";

type FormData = {
  name: string;
  phone: string;
  email: string;
  birthday: string;
};

type EditFormProps = {
  form: FormData;
  submitting: boolean;
  error: string | null;
  success: boolean;
  isDirty: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ProfileEditForm({
  form,
  submitting,
  error,
  success,
  isDirty,
  handleChange,
  handleSubmit,
}: EditFormProps) {
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <fieldset disabled={submitting} className='space-y-6'>
        <div className='grid gap-5 sm:grid-cols-2'>
          <Input
            name='name'
            label='نام و نام خانوادگی'
            value={form.name}
            onChange={handleChange}
            placeholder='نام و نام خانوادگی'
            autoComplete='name'
          />

          <Input
            name='phone'
            label='شماره تلفن'
            value={form.phone}
            onChange={handleChange}
            placeholder='۰۹۱۲۱۲۳۴۵۶۷'
            dir='ltr'
            autoComplete='tel'
          />

            <Input
              name='email'
              label='ایمیل'
              type='email'
              value={form.email}
              onChange={handleChange}
              placeholder='example@email.com'
              dir='ltr'
              autoComplete='email'
            />
            <BirthdayPicker
              value={form.birthday}
              onChange={(value) =>
                handleChange({
                  target: {
                    name: "birthday",
                    value,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              disabled={submitting}
            />
      
        </div>

        {error && (
          <p
            role='alert'
            className='rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600'>
            {error}
          </p>
        )}

        {success && (
          <p
            role='status'
            className='rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700'>
            تغییرات با موفقیت ذخیره شد.
          </p>
        )}

        <div className='flex justify-end border-t border-espresso-clay/10 pt-6'>
          <button
            type='submit'
            disabled={submitting || !isDirty}
            className='rounded-xl bg-espresso-clay px-6 py-3 text-sm font-semibold text-bone-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'>
            {submitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
