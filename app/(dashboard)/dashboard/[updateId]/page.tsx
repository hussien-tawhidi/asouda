"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import axios from "axios";

// Components
import Input from "@/components/common/Input";
import Textarea from "@/components/common/TextArea";
// Types
import { MostSellProductType } from "@/types";
import AddImage from "@/components/admin/create-product/AddImage";
import AddColor from "@/components/admin/create-product/AddColor";
import AddFeatures from "@/components/admin/create-product/AddFeatures";
import toast from "react-hot-toast";
import Select from "@/components/common/CustomeSelect";
import { categories } from "@/constant/home-data";
import UpdateHeader from "../../../../components/admin/update/UpdateHeader";

type FormErrors = Partial<Record<keyof MostSellProductType, string>>;

export default function ProductUpdatePage() {
  const { updateId } = useParams<{ updateId: string }>();
  const router = useRouter();

  // ---------- States ----------
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Product fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [colors, setColors] = useState<{ name: string; value: string }[]>([
    { name: "", value: "#000000" },
  ]);
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState(0);
  const [sold, setSold] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [careInstructions, setCareInstructions] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [bedSize, setBedSize] = useState("");
  const [frameType, setFrameType] = useState("");
  const [assemblyRequired, setAssemblyRequired] = useState(false);
  const [warranty, setWarranty] = useState("");
  // ---------- Fetch product ----------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${updateId}`);
        if (!res.ok) throw new Error("محصول یافت نشد");
        const data = await res.json();

        // Populate all fields
        const product = data.product || data;
        setName(product.name || "");
        setPrice(product.price || 0);
        setImage(product.image || []);
        setCategory(product.category || "");
        setSize(product.size || "");
        setMaterial(product.material || "");
        setColors(product.colors || [{ name: "", value: "#000000" }]);
        setRating(product.rating || 5);
        setReviews(product.reviews || 0);
        setSold(product.sold || 0);
        setStock(product.stock || 0);
        setDiscount(product.discount || 0);
        setBrand(product.brand || "");
        setDescription(product.description || "");
        setDimensions(product.dimensions || "");
        setWeight(product.weight || "");
        setCareInstructions(product.careInstructions || "");
        setFeatures(product.features || [""]);
        setBedSize(product.bedSize || "");
        setFrameType(product.frameType || "");
        setAssemblyRequired(product.assemblyRequired || false);
        setWarranty(product.warranty || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطا در دریافت محصول");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (updateId) fetchProduct();
  }, [updateId]);

  // ---------- Handlers ----------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setters: Record<string, (v: any) => void> = {
      name: setName,
      price: setPrice,
      category: setCategory,
      size: setSize,
      material: setMaterial,
      rating: setRating,
      reviews: setReviews,
      sold: setSold,
      stock: setStock,
      discount: setDiscount,
      brand: setBrand,
      description: setDescription,
      dimensions: setDimensions,
      weight: setWeight,
      careInstructions: setCareInstructions,
      bedSize: setBedSize,
      frameType: setFrameType,
      warranty: setWarranty,
    };

    const setter = setters[name];
    if (setter) {
      const val =
        type === "number"
          ? Number(value)
          : type === "checkbox"
            ? checked
            : value;
      setter(val);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAssemblyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssemblyRequired(e.target.checked);
  };

  // ---------- Image upload ----------
  const uploadImages = async (files: FileList) => {
    setIsUploading(true);

    try {
      const uploadedImages: string[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("productId", updateId);

        const { data } = await axios.put("/api/products/image", formData);

        uploadedImages.push(data.image);
      }

      setImage((prev) => [...prev, ...uploadedImages]);
      console.log(image, "uploaded new");
      toast.success("تصویر با موفقیت اضافه شد.");
    } catch (error) {
      console.error(error);
      toast.error("آپلود تصویر ناموفق بود.");
    } finally {
      setIsUploading(false);
    }
  };

  // ---------- Validation ----------
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "نام محصول الزامی است";
    if (price <= 0) newErrors.price = "قیمت باید بزرگتر از صفر باشد";
    if (!category.trim()) newErrors.category = "دسته‌بندی الزامی است";
    if (discount < 0 || discount > 100)
      newErrors.discount = "تخفیف باید بین ۰ تا ۱۰۰ باشد";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- Submit ----------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isUploading) {
      alert("لطفاً منتظر آپلود تصاویر بمانید");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", String(price));
      formData.append("category", category);
      formData.append("size", size);
      formData.append("material", material);
      formData.append("rating", String(rating));
      formData.append("reviews", String(reviews));
      formData.append("sold", String(sold));
      formData.append("stock", String(stock));
      formData.append("discount", String(discount));
      formData.append("brand", brand);
      formData.append("description", description);
      formData.append("dimensions", dimensions);
      formData.append("weight", weight);
      formData.append("careInstructions", careInstructions);
      formData.append("bedSize", bedSize);
      formData.append("frameType", frameType);
      formData.append("assemblyRequired", String(assemblyRequired));
      formData.append("warranty", warranty);
      formData.append("colors", JSON.stringify(colors));
      formData.append("features", JSON.stringify(features));
      image.forEach((file) => {
        formData.append("image", file);
      });
      await axios.put(`/api/products/${updateId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------- delete image ------
  const deleteImage = async (index: number) => {
    const imageUrl = image[index];

    const loadingToast = toast.loading("در حال حذف تصویر...");

    try {
      await axios.delete("/api/products/image", {
        data: {
          productId: updateId,
          imageUrl,
        },
      });

      setImage((prev) => prev.filter((_, i) => i !== index));

      toast.success("تصویر با موفقیت حذف شد.", {
        id: loadingToast,
        duration: 2500,
        icon: "🗑️",
      });
    } catch (error) {
      console.error(error);

      toast.error("حذف تصویر با خطا مواجه شد.", {
        id: loadingToast,
        duration: 3000,
      });
    }
  };

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div className='flex min-h-100 items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <Loader2 size={40} className='animate-spin text-espresso-clay' />
          <p className='text-sm text-gray-500'>در حال بارگذاری محصول...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-100 flex-col items-center justify-center gap-4'>
        <p className='text-lg font-medium text-red-500'>{error}</p>
        <Link
          href='/dashboard'
          className='flex items-center gap-2 rounded-lg bg-espresso-clay px-4 py-2 text-sm text-white hover:opacity-90'>
          بازگشت به داشبورد
        </Link>
      </div>
    );
  }

  // ---------- Render ----------
  return (
    <div className='mx-auto max-w-6xl space-y-6 mt-10'>
      <UpdateHeader />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className='space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-10'
        dir='rtl'>
        {/* ----- General ----- */}
        <section>
          <h3 className='mb-4 text-lg font-semibold text-gray-700'>
            اطلاعات عمومی
          </h3>
          <Input
            label='نام محصول'
            name='name'
            value={name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <div className='grid md:grid-cols-3 gap-3 my-5'>
            <Select
              label='دسته‌بندی'
              name='category'
              value={category}
              onChange={handleChange}
              options={categories.slice(1).map((item) => ({
                label: item.name,
                value: item.slug,
              }))}
              error={errors.category}
              required
            />
            <Input
              type='number'
              label='قیمت (تومان)'
              name='price'
              value={price}
              onChange={handleChange}
              error={errors.price}
              required
              min='0'
            />
            <Input
              type='number'
              label='تخفیف (%)'
              name='discount'
              value={discount}
              onChange={handleChange}
              error={errors.discount}
              min='0'
              max='100'
            />
            <Input
              label='برند'
              name='brand'
              value={brand}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* ----- Specifications ----- */}
        <section>
          <h3 className='mb-4 text-lg font-semibold text-gray-700'>
            مشخصات فنی
          </h3>
          <div className='grid gap-5 md:grid-cols-4'>
            <Input
              label='جنس'
              name='material'
              value={material}
              onChange={handleChange}
            />
            <Input
              label='سایز'
              name='size'
              value={size}
              onChange={handleChange}
            />
            <Input
              label='سایز تخت'
              name='bedSize'
              value={bedSize}
              onChange={handleChange}
            />
            <Input
              label='نوع فریم'
              name='frameType'
              value={frameType}
              onChange={handleChange}
            />
            <Input
              label='ابعاد'
              name='dimensions'
              value={dimensions}
              onChange={handleChange}
            />
            <Input
              label='وزن'
              name='weight'
              value={weight}
              onChange={handleChange}
            />
            <Input
              label='گارانتی'
              name='warranty'
              value={warranty}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* ----- Stats ----- */}
        <section>
          <h3 className='mb-4 text-lg font-semibold text-gray-700'>
            آمار و امتیازات
          </h3>
          <div className='grid gap-5 md:grid-cols-3'>
            <Input
              type='number'
              label='امتیاز (۱ تا ۵)'
              name='rating'
              value={rating}
              onChange={handleChange}
              min='0'
              max='5'
              step='0.1'
            />
            <Input
              type='number'
              label='تعداد نظرات'
              name='reviews'
              value={reviews}
              onChange={handleChange}
              min='0'
            />
            <Input
              type='number'
              label='تعداد فروش'
              name='sold'
              value={sold}
              onChange={handleChange}
              min='0'
            />
          </div>
        </section>

        {/* ----- Text ----- */}
        <section>
          <h3 className='mb-4 text-lg font-semibold text-gray-700'>
            توضیحات تکمیلی
          </h3>
          <div className='space-y-4'>
            <Textarea
              label='توضیحات محصول'
              name='description'
              value={description}
              onChange={handleChange}
              rows={5}
            />
            <Textarea
              label='دستورالعمل نگهداری'
              name='careInstructions'
              value={careInstructions}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </section>

        {/* ----- Images ----- */}
        <AddImage
          value={image}
          onUpload={uploadImages}
          onRemove={deleteImage}
          isUploading={isUploading}
        />

        {/* ----- Colors ----- */}
        <AddColor
          label='رنگ‌ها'
          value={colors}
          onChange={setColors}
          addLabel='افزودن رنگ'
          minItems={1}
          defaultColor='#000000'
        />

        {/* ----- Features ----- */}
        <AddFeatures
          label='ویژگی‌ها'
          value={features}
          onChange={setFeatures}
          placeholder='ویژگی'
          // addLabel='افزودن ویژگی'
        />

        {/* ----- Assembly ----- */}
        <div className='flex items-center gap-3 rounded-lg bg-gray-50 p-4'>
          <input
            type='checkbox'
            id='assemblyRequired'
            checked={assemblyRequired}
            onChange={handleAssemblyChange}
            className='h-5 w-5 rounded border-gray-300 text-espresso-clay focus:ring-2 focus:ring-espresso-clay/30'
          />
          <label htmlFor='assemblyRequired' className='text-sm font-medium'>
            نیاز به نصب / سرهم‌بندی دارد
          </label>
        </div>

        {/* ----- Submit ----- */}
        <div className='flex items-center justify-between gap-4 border-t border-gray-200 pt-4'>
          <button
            type='submit'
            disabled={isSubmitting || isUploading}
            className='flex items-center gap-2 rounded-xl bg-espresso-clay px-8 py-3 text-lg font-semibold text-white transition hover:opacity-90 hover:shadow-lg disabled:opacity-70'>
            {isSubmitting ? (
              <>
                <Loader2 size={20} className='animate-spin' />
                در حال به‌روزرسانی...
              </>
            ) : (
              "به‌روزرسانی محصول"
            )}
          </button>
          <button
            type='button'
            onClick={() => router.back()}
            className='rounded-lg px-4 py-2 text-sm text-gray-500 transition hover:bg-gray-100'>
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
