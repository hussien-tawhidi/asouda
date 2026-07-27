import { FiAlertCircle } from "react-icons/fi";

export default function SearchError({
  error,
  retry,
}: {
  error: string;
  retry: () => void;
}) {
  return (
    <div className='text-center py-8'>
      <FiAlertCircle className='w-12 h-12 text-red-400 mx-auto mb-3' />
      <p className='text-earth-brown/80'>{error}</p>
      <button onClick={retry} className='mt-2 text-sm underline'>
        تلاش مجدد
      </button>
    </div>
  );
}
