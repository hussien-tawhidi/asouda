"use client";

import Loader from "@/components/common/Loader";
import Textarea from "@/components/common/TextArea";
import OrderActions from "@/components/order/OrderActions";
import OrderContactSection from "@/components/order/OrderContactSection";
import OrderDescriptionSection from "@/components/order/OrderDescriptionSection";
import OrderFabricSection from "@/components/order/OrderFabricSection";
import OrderMaterialSection from "@/components/order/OrderMaterialSection";
import OrderOptionsSection from "@/components/order/OrderOptionsSection";
import OrderProductSection from "@/components/order/OrderProductSection";
import OrderSectionTitle from "@/components/order/OrderSectionTitle";
import { initialForm, MostSellProductType, OrderFormData } from "@/types";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** Simple client‑side validation. Returns an error message or null. */
function validateForm(form: OrderFormData): string | null {
  if (!form.phone?.trim()) return "لطفاً شماره تماس را وارد کنید.";
  if (!/^0\d{10}$/.test(form.phone.trim()))
    return "شماره تماس وارد شده معتبر نیست.";
  if (!form.userAddress?.trim()) return "لطفاً آدرس خود را وارد کنید.";
  if (!form.size) return "لطفاً سایز را انتخاب کنید.";
  return null;
}

export default function OrderForm() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<OrderFormData>(initialForm);
  const [product, setProduct] = useState<MostSellProductType | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExtrasChange = (selected: string[]) => {
    setForm((prev) => ({ ...prev, extras: selected }));
  };

  // ---------------------------------------------------------------------------
  // Fetch product
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get<{ product: MostSellProductType }>(
          `/api/products/${id}`,
          { signal: controller.signal },
        );

        setProduct(data.product);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("🚀 ~ fetchProduct ~ error:", err);
        setError("خطا در دریافت اطلاعات محصول. لطفاً دوباره تلاش کنید.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!product) {
      setError("اطلاعات محصول بارگذاری نشده است.");
      return;
    }

    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("productId", product._id);
      formData.append("price", String(product.price));
      formData.append("bedSize", form.size);
      formData.append("materails", form.materails);
      formData.append("color", form.color);
      formData.append("fabric", form.fabric);
      formData.append("fabricColor", form.fabricColor);
      formData.append("mattress", form.mattress);
      formData.append("drawers", form.drawers);
      formData.append("extras", JSON.stringify(form.extras ?? []));
      formData.append("description", form.description);
      formData.append("userAddress", form.userAddress);
      formData.append("phone", form.phone);
      product.image.forEach((file) => {
        formData.append("image", file);
      });
      console.log("product.image:", product.image);
      console.log("isArray:", Array.isArray(product.image));
      await axios.post("/api/orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setForm(initialForm);

      // Uncomment if you want to redirect after a successful order:
      // router.push("/orders");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? ((err.response?.data as { message?: string })?.message ??
          "خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.")
        : "خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.";
      console.error("🚀 ~ handleSubmit ~ error:", err);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Render states
  // ---------------------------------------------------------------------------
  if (loading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center gap-3 p-4 text-center'>
        <p className='text-espresso-clay/70'>محصول موردنظر یافت نشد.</p>
        {error && <p className='text-sm text-red-600'>{error}</p>}
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center p-4'>
      <div
        className='
          relative
          w-full
          max-w-3xl
          overflow-y-auto
          rounded-3xl
          bg-bone-white
          shadow-2xl
        '>
        {/* Header */}
        <div
          className='
            border-b
            border-espresso-clay/10
            px-6
            py-5
            backdrop-blur
          '>
          <h2 className='text-xl font-bold text-espresso-clay'>
            ثبت سفارش سرویس خواب
          </h2>

          <p className='mt-1 text-sm text-espresso-clay/60'>
            مشخصات موردنظر خود را انتخاب کنید
          </p>
        </div>

        <form onSubmit={handleSubmit} className='p-6'>
          <fieldset
            disabled={submitting}
            className='min-w-0 space-y-7 border-0 p-0'>
            <OrderProductSection value={form.size} onChange={handleChange} />

            <OrderMaterialSection
              wood={form.materails}
              woodColor={form.color}
              onChange={handleChange}
            />

            <OrderFabricSection
              fabric={form.fabric}
              fabricColor={form.fabricColor}
              onChange={handleChange}
            />

            <OrderOptionsSection
              mattress={form.mattress}
              drawers={form.drawers}
              extras={form.extras}
              onChange={handleChange}
              onExtrasChange={handleExtrasChange}
            />

            <OrderDescriptionSection
              value={form.description}
              onChange={handleChange}
            />

            <OrderContactSection value={form.phone} onChange={handleChange} />

            <OrderSectionTitle number='07' title='آدرس' />
            <Textarea
              label=''
              name='userAddress'
              value={form.userAddress}
              onChange={handleChange}
              rows={4}
              placeholder='آدرس خود را دقیق وارد کنید ...'
            />

            {/* Feedback */}
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
                سفارش شما با موفقیت ثبت شد.
              </p>
            )}

            <OrderActions />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
