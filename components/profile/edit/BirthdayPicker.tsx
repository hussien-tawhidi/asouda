
"use client";

import DatePicker from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";

import persian_fa from "react-date-object/locales/persian_fa";

type BirthdayPickerProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function BirthdayPicker({
  value,
  onChange,
  disabled = false,
}: BirthdayPickerProps) {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-medium text-espresso-clay">
        تاریخ تولد
      </label>

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={value || ""}
        format="YYYY/MM/DD"
        placeholder="تاریخ تولد خود را انتخاب کنید"
        calendarPosition="bottom-right"
        maxDate={new Date()}
        disabled={disabled}
        inputClass="
          w-full
          rounded-xl
          border
          border-espresso-clay/10
          bg-bone-white
          px-4
          py-3
          text-sm
          text-espresso-clay
          outline-none
          transition
          placeholder:text-tusi
          focus:border-espresso-clay/30
          focus:ring-4
          focus:ring-espresso-clay/5
        "
        onChange={(date) => {
          if (!date) {
            onChange("");
            return;
          }

          // Jalali → Gregorian
          const gregorianDate = date.convert(gregorian);

          onChange(
            gregorianDate.format("YYYY-MM-DD")
          );
        }}
      />
    </div>
  );
}
