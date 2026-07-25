"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { deleteProduct } from "@/lib/products";
import { MostSellProductType } from "@/types";

interface DeleteProductButtonProps {
  productId: string;
  setData: Dispatch<SetStateAction<MostSellProductType[]>>;
}

export default function DeleteProductButton({
  productId,
  setData,
}: DeleteProductButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const success = await deleteProduct(productId);

      if (!success) return;

      setData((prev) => prev.filter((product) => product._id !== productId));

      toast.success("محصول با موفقیت حذف شد");
    } catch (error) {
      console.error(error);
      toast.error("خطا در هنگام حذف محصول");
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isLoading}
        className='rounded-lg p-1.5 text-red-500 transition hover:bg-red-50'
        aria-label='حذف'>
        <Trash2 size={16} />
      </button>

      {showConfirm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
          <div className='w-80 rounded-xl bg-white p-6 shadow-2xl'>
            <h3 className='text-lg font-bold text-gray-800'>تأیید حذف</h3>

            <p className='mt-2 text-sm text-gray-600'>
              آیا از حذف این محصول اطمینان دارید؟
            </p>

            <div className='mt-4 flex justify-end gap-3'>
              <button
                onClick={() => setShowConfirm(false)}
                className='rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100'>
                انصراف
              </button>

              <button
                onClick={handleDelete}
                disabled={isLoading}
                className='rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50'>
                {isLoading ? "در حال حذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
