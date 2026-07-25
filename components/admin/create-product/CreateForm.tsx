"use client";

import { MostSellProductType } from "@/types";
import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import Textarea from "@/components/common/TextArea";
import Input from "@/components/common/Input";
import AddFeatures from "./AddFeatures";
import AddColor from "./AddColor";
import ImageUploadInput from "./ImageUpload";
import Select from "@/components/common/CustomeSelect";
import { categories, mdfColors } from "@/constant/home-data";
import toast from "react-hot-toast";

type FormErrors = Partial<Record<keyof MostSellProductType, string>>;
type MDFColor = {
  name: string;
  value: string | null;
};
export default function CreateForm() {
  // ---------- Individual states ----------
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("ام دی اف");
  const [colors, setColors] = useState<MDFColor[]>(mdfColors);
  const [discount, setDiscount] = useState(0);
  const [brand, setBrand] = useState("Asouda");
  const [description, setDescription] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [careInstructions, setCareInstructions] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [bedSize, setBedSize] = useState("");
  const [frameType, setFrameType] = useState("");
  const [assemblyRequired, setAssemblyRequired] = useState(false);
  const [warranty, setWarranty] = useState("4 سال");

  // ---------- UI states ----------
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // ---------- Handlers for simple fields ----------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Map field name to its setter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setters: Record<string, (v: any) => void> = {
      name: setName,
      price: setPrice,
      category: setCategory,
      size: setSize,
      material: setMaterial,
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
      // Clear error for this field
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ---------- Assembly checkbox ----------
  const handleAssemblyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssemblyRequired(e.target.checked);
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

  // ---------- Submit (using FormData) ----------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Create FormData
      const formData = new FormData();
      // Append simple fields
      formData.append("name", name);
      formData.append("price", String(price));
      formData.append("category", category);
      formData.append("size", size);
      formData.append("material", material);
      formData.append("discount", String(discount));
      formData.append("brand", brand);
      formData.append("description", description);
      formData.append("dimensions", dimensions);
      formData.append("careInstructions", careInstructions);
      formData.append("bedSize", bedSize);
      formData.append("frameType", frameType);
      formData.append("assemblyRequired", String(assemblyRequired));
      formData.append("warranty", warranty);

      // Append arrays as JSON strings (or iterate)
      image.forEach((file) => {
        formData.append("image", file);
      });
      formData.append("colors", JSON.stringify(colors));
      formData.append("features", JSON.stringify(features));

      // Send as multipart/form-data
      await axios.post("/api/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("محصول به موفقیت وارد شد");
    } catch (error) {
      toast.error("خطای رخ داده است" + error);
      console.error("Error submitting product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto‑hide success message
  if (submitSuccess) {
    setTimeout(() => setSubmitSuccess(false), 5000);
  }

  // ---------- Render ----------
  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-8 rounded-3xl my-10 p-6 shadow-lg md:p-10'
      dir='rtl'>
      {/* ----- SECTION: General ----- */}
      <section>
        <h3 className='mb-4 text-lg font-semibold text-gray-700'>
          اطلاعات عمومی
        </h3>
        <div className='grid gap-5 md:grid-cols-2'>
          <Input
            label='نام محصول'
            name='name'
            value={name}
            onChange={handleChange}
            error={errors.name}
            required
            placeHolderText={"نام محصول را وارد کنید ..."}
          />
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

      {/* ----- SECTION: Specifications ----- */}
      <section>
        <h3 className='mb-4 text-lg font-semibold text-gray-700'>مشخصات فنی</h3>
        <div className='grid gap-5 md:grid-cols-2'>
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
          {/* ----- SECTION: Colors ----- */}
        </div>
      </section>
      <div>
        <AddColor
          label='رنگ‌ها'
          // @ts-expect-error this is type error not any security error
          value={colors}
          onChange={setColors}
          addLabel='افزودن رنگ'
          minItems={1}
          defaultColor='#000000'
        />
      </div>

      {/* ----- SECTION: Long Text ----- */}
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

      {/* ----- SECTION: Images ----- */}
      <ImageUploadInput images={image} setImages={setImage} />

      {/* ----- SECTION: Features ----- */}
      <AddFeatures
        label='ویژگی‌ها'
        value={features}
        onChange={setFeatures}
        placeholder='ویژگی'
       
      />

      {/* ----- SECTION: Boolean (Assembly) ----- */}
      <div className='flex items-center gap-3 p-4'>
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

      {/* ----- SUBMIT ----- */}
      <div className='flex items-center justify-between gap-4 border-t border-gray-200 pt-4'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='flex items-center gap-2 rounded-xl bg-espresso-clay px-8 py-3 text-lg font-semibold text-white transition hover:opacity-90 hover:shadow-lg disabled:opacity-70'>
          {isSubmitting ? (
            <>
              <span className='inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
              در حال ثبت...
            </>
          ) : (
            "ثبت محصول"
          )}
        </button>
      </div>
    </form>
  );
}
