"use client";

import { MostSellProductType } from "@/types";
import { useState,  FormEvent, useEffect } from "react";
import axios from "axios";
import Textarea from "@/components/common/TextArea";
import Input from "@/components/common/Input";
import AddFeatures from "./AddFeatures";
import AddColor from "./AddColor";
import AddImage from "./AddImage";

type FormErrors = Partial<Record<keyof MostSellProductType, string>>;

export default function ProductForm() {
  // ---------- Individual states ----------
  const [_id, set_id] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<string[]>([""]);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      _id: set_id,
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
    if (stock < 0) newErrors.stock = "موجودی نمی‌تواند منفی باشد";
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
      // Build product object for reference (optional)
      const productData: MostSellProductType = {
        _id,
        name,
        price,
        image,
        category,
        size,
        material,
        colors,
        rating,
        reviews,
        sold,
        stock,
        discount,
        brand,
        description,
        dimensions,
        weight,
        careInstructions,
        features,
        bedSize,
        frameType,
        assemblyRequired,
        warranty,
      };

      // Create FormData
      const formData = new FormData();
      // Append simple fields
      formData.append("_id", _id);
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

      // Append arrays as JSON strings (or iterate)
      formData.append("image", JSON.stringify(image));
      formData.append("colors", JSON.stringify(colors));
      formData.append("features", JSON.stringify(features));

      // Send as multipart/form-data
      await axios.post("/api/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product submitted successfully:", productData);
      setSubmitSuccess(true);
      resetForm();
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // ---------- Reset form ----------
  const resetForm = () => {
    // set_id(defaultFields._id);
    // setName(defaultFields.name);
    // setPrice(defaultFields.price);
    // setImage(defaultFields.image);
    // setCategory(defaultFields.category);
    // setSize(defaultFields.size);
    // setMaterial(defaultFields.material);
    // setColors(defaultFields.colors);
    // setRating(defaultFields.rating);
    // setReviews(defaultFields.reviews);
    // setSold(defaultFields.sold);
    // setStock(defaultFields.stock);
    // setDiscount(defaultFields.discount);
    // setBrand(defaultFields.brand);
    // setDescription(defaultFields.description);
    // setDimensions(defaultFields.dimensions);
    // setWeight(defaultFields.weight);
    // setCareInstructions(defaultFields.careInstructions);
    // setFeatures(defaultFields.features);
    // setBedSize(defaultFields.bedSize);
    // setFrameType(defaultFields.frameType);
    // setAssemblyRequired(defaultFields.assemblyRequired);
    // setWarranty(defaultFields.warranty);
    // setErrors({});
  };

  // Auto‑hide success message
  if (submitSuccess) {
    setTimeout(() => setSubmitSuccess(false), 5000);
  }

  // ---------- Render ----------
  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto max-w-6xl space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-10'
      dir='rtl'>
      <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
        <h2 className='text-2xl font-bold text-espresso-clay'>
          ثبت محصول جدید
        </h2>
        {submitSuccess && (
          <span className='rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700'>
            ✓ محصول با موفقیت ثبت شد
          </span>
        )}
      </div>

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
          />
          <Input
            label='دسته‌بندی'
            name='category'
            value={category}
            onChange={handleChange}
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
          <Input
            type='number'
            label='موجودی'
            name='stock'
            value={stock}
            onChange={handleChange}
            error={errors.stock}
            min='0'
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
        </div>
      </section>

      {/* ----- SECTION: Ratings & Stats ----- */}
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
      <AddImage
        value={image}
        onChange={setImage}
        minItems={1}
        addLabel='افزودن تصویر'
      />

      {/* ----- SECTION: Colors ----- */}
      <AddColor
        label='رنگ‌ها'
        value={colors}
        onChange={setColors}
        addLabel='افزودن رنگ'
        minItems={1}
        defaultColor='#000000'
      />
      {/* ----- SECTION: Features ----- */}
      <AddFeatures
        label='ویژگی‌ها'
        value={features}
        onChange={setFeatures}
        placeholder='ویژگی'
        addLabel='افزودن ویژگی'
      />

      {/* ----- SECTION: Boolean (Assembly) ----- */}
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
        <button
          type='button'
          onClick={resetForm}
          className='rounded-lg px-4 py-2 text-sm text-gray-500 transition hover:bg-gray-100'>
          reset
        </button>
      </div>
    </form>
  );
}
