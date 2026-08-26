import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { PiHeartThin } from "react-icons/pi";

export default function TopBar() {
  return (
    <div className='flex items-center justify-between bg-espresso-clay px-5 py-2 text-xs text-bone-white'>
      <span>
        خوش آمدید |{" "}
        <Link href='/signin' className='underline'>
          ورود
        </Link>
      </span>

      <div className='flex items-center gap-4 text-base'>
        <Link href='/wishlist' aria-label='علاقه‌مندی‌ها'>
          <PiHeartThin />
        </Link>

        <Link href='/account' aria-label='حساب کاربری'>
          <BiUser />
        </Link>
      </div>
    </div>
  );
}
