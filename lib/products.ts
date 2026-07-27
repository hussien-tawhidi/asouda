import axios from "axios";
import toast from "react-hot-toast";

export const deleteProduct = async (
  productId: string,
  endpoint = "/api/products",
): Promise<boolean> => {
  const loadingToast = toast.loading("در حال حذف محصول...");

  try {
    await axios.delete(endpoint, {
      data: {
        productId,
      },
    });

    toast.success("محصول با موفقیت حذف شد.", {
      id: loadingToast,
      icon: "🗑️",
    });

    return true;
  } catch (error) {
    console.error("Delete product error:", error);

    toast.error("حذف محصول با خطا مواجه شد.", {
      id: loadingToast,
    });

    return false;
  }
};

export const toggleLike = (
  productId: string,
  e: React.MouseEvent,
  setLikedProducts: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  e.stopPropagation();

  setLikedProducts((prev) =>
    prev.includes(productId)
      ? prev.filter((id) => id !== productId)
      : [...prev, productId],
  );
};