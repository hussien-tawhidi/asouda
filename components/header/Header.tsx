import DescktopHeader from "./DescktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <>
      <div className='md:hidden flex'>
        <MobileHeader />
      </div>
      <div className='md:flex hidden w-full'>
        <DescktopHeader />
      </div>
    </>
  );
}
