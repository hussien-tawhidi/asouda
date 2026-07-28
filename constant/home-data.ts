import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Gem,
  Send,
  Phone,
  Mail,
  MapPin,
  Ruler,
  Shield,
  Heart,
} from "lucide-react";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import { Clock } from "lucide-react";
import { BiMap, BiPhone, BiEnvelope } from "react-icons/bi";

export const whyTrustUs = [
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت کالا",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Truck,
    title: "ارسال رایگان",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: RotateCcw,
    title: "بازگشت ۷ روزه",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Gem,
    title: "کیفیت تضمینی",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

export const categoryOptions = [
  { label: "سرویس خواب", value: "bedroom-set" },
  { label: "تخت خواب", value: "bed" },
  { label: "میز آرایش", value: "dresser" },
  { label: "پاتختی", value: "nightstand" },
  { label: "کمد لباس", value: "wardrobe" },
];

export const categories = [
  {
    name: "خانه",
    slug: "home",
    image: "/about.jpg", // در صورت نیاز تصویر مناسب قرار دهید
    href: "/",
  },
  {
    name: "سرویس خواب مدرن",
    slug: "modern",
    image: "/images/modern.jpg",
    href: "/category/modern-bedroom-set",
  },
  {
    name: "سرویس خواب باکس‌دار",
    slug: "storage",
    image: "/images/box.webp",
    href: "/category/box-bedroom-set",
  },
  {
    name: "سرویس خواب دو نفره",
    slug: "double",
    image: "/images/double.png",
    href: "/category/double-bedroom-set",
  },
  {
    name: "سرویس خواب یک نفره",
    slug: "single",
    image: "/images/single.png",
    href: "/category/single-bedroom-set",
  },
  {
    name: "سرویس خواب کودک / نوجوان",
    slug: "kids",
    image: "/images/kid.png",
    href: "/category/kids-bedroom-set",
  },
  {
    name: "سرویس خواب سلطنتی",
    slug: "classic",
    image: "/images/kingdom.jpg",
    href: "/category/classic-bedroom-set",
  },
  {
    name: "میزد ارایش",
    slug: "beauty-desk",
    image: "/images/beauty-desk.jpg",
    href: "/category/beauty-desk",
  },
];

export const mostSellsProduct = [
  {
    _id: "1",
    name: "سرویس خواب دونفره مدل رویال",
    price: 3850000,
    // image: "/images/models/1/Kiyan-V2-poi-n27_QM5.jpeg",
    image: [
      "/images/models/1/Kiyan-V2-poi-n27_QM5.jpeg",
      "/images/models/1/Kiyan-v2-bedset-porihj-n10_xAY.jpeg",
    ],
    category: "سرویس خواب سلطنتی",
    size: "دونفره",
    material: "چوب راش و MDF با روکش",
    color: "گردویی و کرم",
    rating: 4.9,
    reviews: 148,
    sold: 620,
    stock: 18,
    discount: 10,
    brand: "آسوده",
    description:
      "سرویس خواب رویال با طراحی کلاسیک و استفاده از چوب راش مرغوب، جلو‌های سلطنتی به اتاق خواب می‌بخشد. تخت با سرتخت منبت‌کاری شده و پایه‌های مقاوم، انتخابی ایده‌آل برای فضاهای لوکس.",
    dimensions: "۲۰۰ × ۱۸۰ × ۱۰۰ سانتی‌متر (طول × عرض × ارتفاع سرتخت)",
    weight: "۶۵ کیلوگرم",
    careInstructions:
      "تمیز کردن با دستمال مرطوب و نرم، پرهیز از مواد شیمیایی قوی",
    features: [
      "چوب راش با کیفیت بالا",
      "سرتخت منبت‌کاری شده",
      "پایه‌های محکم و مقاوم",
      "گنجایش تشک ۲۰۰×۱۸۰",
      "قابل سفارش در ابعاد دیگر",
    ],
    bedSize: "Queen (۱۸۰×۲۰۰)",
    frameType: "چوبی با روکش",
    assemblyRequired: true,
    warranty: "۵ سال ضمانت",
    colors: [
      {
        name: "سفید",
        value: "#fff",
      },
      {
        name: "e",
        value: "#eee",
      },
      {
        name: "سفید",
        value: "#000",
      },
      {
        name: "سفید",
        value: "#999",
      },
    ],
  },
  {
    _id: "2",
    name: "سرویس خواب یک‌نفره مدل آرام",
    price: 2450000,
    image: ["/images/models/1/Kiyan-V2-poi-n27_QM5.jpeg"],
    category: "سرویس خواب سلطنتی",
    size: "یک‌نفره",
    material: "MDF با کیفیت و فلز",
    color: "خاکستری",
    rating: 4.8,
    reviews: 95,
    sold: 480,
    stock: 24,
    discount: 11,
    brand: "آسوده",
    description:
      "سرویس خواب آرام با طراحی مینیمال و کاربردی، مناسب برای اتاق‌های کوچک و آپارتمانی. سرتخت ساده و پایه‌های فلزی مقاوم، خوابی راحت و آرام را تضمین می‌کند.",
    dimensions: "۲۰۰ × ۹۰ × ۸۵ سانتی‌متر",
    weight: "۳۸ کیلوگرم",
    careInstructions: "گردگیری منظم، تمیز کردن با دستمال مرطوب",
    features: [
      "طراحی مینیمال و مدرن",
      "سرتخت ساده و شیک",
      "پایه‌های فلزی مقاوم",
      "گنجایش تشک ۹۰×۲۰۰",
      "مناسب برای اتاق کودک و نوجوان",
    ],
    bedSize: "Single (۹۰×۲۰۰)",
    frameType: "MDF و فلز",
    assemblyRequired: true,
    warranty: "۳ سال ضمانت",
    colors: [
      {
        name: "سفید",
        value: "#fff",
      },
    ],
  },
  {
    _id: "3",
    name: "سرویس خواب دونفره مدل کلاسیک",
    price: 4290000,
    image: ["/images/models/1/Kiyan-V2-poi-n27_QM5.jpeg"],
    category: "سرویس خواب سلطنتی",
    size: "دونفره",
    material: "چوب گردو و MDF با روکش",
    color: "طوسی و گردویی",
    rating: 4.7,
    reviews: 132,
    sold: 530,
    stock: 15,
    discount: 13,
    brand: "آسوده",
    description:
      "سرویس خواب کلاسیک با تلفیق زیبایی چوب گردو و طراحی سنتی، فضایی گرم و دلنشین ایجاد می‌کند. سرتخت با قوس‌های زیبا و پایه‌های حجیم، نمادی از اصالت و ماندگاری.",
    dimensions: "۲۰۰ × ۱۸۰ × ۱۱۰ سانتی‌متر",
    weight: "۷۲ کیلوگرم",
    careInstructions: "استفاده از دستمال نرم و خشک، روغن‌کاری سالیانه چوب",
    features: [
      "چوب گردو اصل",
      "سرتخت با قوس‌های کلاسیک",
      "پایه‌های حجیم و مقاوم",
      "قابل سفارش با تشک طبی",
      "مناسب برای دکوراسیون سنتی",
    ],
    bedSize: "Queen (۱۸۰×۲۰۰)",
    frameType: "چوبی با روکش",
    assemblyRequired: true,
    warranty: "۵ سال ضمانت",
    colors: [
      {
        name: "سفید",
        value: "#fff",
      },
    ],
  },
  {
    _id: "4",
    name: "سرویس خواب دونفره مدل گلستان",
    price: 4650000,
    image: ["/images/models/1/Kiyan-V2-poi-n27_QM5.jpeg"],
    category: "سرویس خواب سلطنتی",
    size: "دونفره",
    material: "چوب راش و پارچه مخمل",
    color: "سفید و طلایی",
    rating: 4.9,
    reviews: 176,
    sold: 710,
    stock: 12,
    discount: 8.4,
    brand: "آسوده",
    description:
      "سرویس خواب گلستان با طراحی مدرن و استفاده از پارچه مخمل در سرتخت، ترکیبی از زیبایی و راحتی است. این تخت با رنگ‌های شاد و جلو‌های مجلل، قلب اتاق خواب شما خواهد بود.",
    dimensions: "۲۲۰ × ۲۰۰ × ۱۲۰ سانتی‌متر",
    weight: "۷۸ کیلوگرم",
    careInstructions: "تمیز کردن خشک مخمل، پرهیز از آب و رطوبت",
    features: [
      "سرتخت مخمل با کیفیت",
      "قاب چوبی مقاوم",
      "پایه‌های استیل طلایی",
      "قابل سفارش با تشک رویا",
      "طراحی خاص و منحصر‌به‌فرد",
    ],
    bedSize: "King (۲۰۰×۲۲۰)",
    frameType: "چوبی با پوشش مخمل",
    assemblyRequired: true,
    warranty: "۵ سال ضمانت",
    colors: [
      {
        name: "سفید",
        value: "#fff",
      },
    ],
  },
  {
    _id: "5",
    name: "سرویس خواب کینگ مدل لوکس",
    price: 5190000,
    image: ["/images/models/1/Kiyan-V2-poi-n27_QM5.jpeg"],
    category: "سرویس خواب سلطنتی",
    size: "کینگ",
    material: "چوب گردو و چرم",
    color: "قهوه‌ای تیره",
    rating: 5.0,
    reviews: 203,
    sold: 845,
    stock: 10,
    discount: 10,
    brand: "آسوده",
    description:
      "سرویس خواب لوکس با سرتخت تمام‌چرم و قاب چوب گردو، عالی‌ترین انتخاب برای اتاق‌های بزرگ و مجلل. طراحی ارگونومیک و کیفیت ساخت درجه یک، تجربه‌ای بی‌نظیر از خواب را ارائه می‌دهد.",
    dimensions: "۲۲۰ × ۲۰۰ × ۱۳۰ سانتی‌متر",
    weight: "۸۵ کیلوگرم",
    careInstructions:
      "تمیز کردن چرم با شوینده‌های مخصوص، پرهیز از نور مستقیم خورشید",
    features: [
      "سرتخت تمام‌چرم با کیفیت",
      "قاب چوب گردو مرغوب",
      "طراحی ارگونومیک",
      "گنجایش تشک ۲۰۰×۲۲۰",
      "مناسب برای فضاهای لوکس",
      "پایه‌های ثابت و مقاوم",
    ],
    bedSize: "King (۲۰۰×۲۲۰)",
    frameType: "چوبی با روکش چرم",
    assemblyRequired: true,
    warranty: "۷ سال ضمانت",
    colors: [
      {
        name: "سفید",
        value: "#fff",
      },
    ],
  },
  {
    _id: "6",
    name: "سرویس خواب کودک مدل ستاره",
    price: 1890000,
    image: ["/images/models/1/Kiyan-V2-poi-n27_QM5.jpeg"],
    category: "سرویس خواب کودک",
    size: "یک‌نفره",
    material: "MDF با روکش و فلز",
    color: "آبی آسمانی و سفید",
    rating: 4.8,
    reviews: 84,
    sold: 390,
    stock: 20,
    discount: 15.6,
    brand: "آسوده",
    description:
      "سرویس خواب کودک ستاره با طراحی شاد و ایمن، مخصوص کودکان و نوجوانان. سرتخت با طرح ستاره‌های درخشان و پایه‌های محکم، خوابی امن و رویایی را برای کودک شما فراهم می‌کند.",
    dimensions: "۱۹۰ × ۹۰ × ۷۵ سانتی‌متر",
    weight: "۳۲ کیلوگرم",
    careInstructions: "تمیز کردن با دستمال نرم، قابل شستشوی سطح",
    features: [
      "طراحی شاد و کودکانه",
      "طرح ستاره‌های سه‌بعدی",
      "پایه‌های محکم و ایمن",
      "گنجایش تشک استاندارد ۹۰×۱۹۰",
      "فاقد گوشه‌های تیز",
      "مناسب سنین ۳ تا ۱۲ سال",
    ],
    bedSize: "Twin (۹۰×۱۹۰)",
    frameType: "MDF با روکش",
    assemblyRequired: true,
    warranty: "۳ سال ضمانت",
    colors: [
      {
        name: "سفید",
        value: "#fff",
      },
      {
        name: "e",
        value: "#eee",
      },
      {
        name: "سفید",
        value: "#fff",
      },
      {
        name: "سفید",
        value: "#fff",
      },
    ],
  },
];

export const socialLinks = [
  {
    href: "#",
    icon: BsInstagram,
    label: "Instagram",
  },
  {
    href: "#",
    icon: Send,
    label: "Telegram",
  },
  {
    href: "#",
    icon: BsFacebook,
    label: "Facebook",
  },
];

export const footerQuickLinks = [
  {
    title: "صفحه اصلی",
    href: "/",
  },
  {
    title: "محصولات",
    href: "/products",
  },
  {
    title: "درباره ما",
    href: "/about",
  },
  {
    title: "تماس با ما",
    href: "/contact",
  },
];

export const footerContactInfo = [
  {
    icon: Phone,
    value: "0912 345 6789",
  },
  {
    icon: Mail,
    value: "info@example.com",
  },
  {
    icon: MapPin,
    value: "تهران، ایران",
    className: "items-start",
    iconClassName: "mt-1",
  },
];

export const contactInfo = [
  {
    icon: BiMap,
    title: "آدرس",
    value: "تهران، خیابان آزادی، خیابان شهید حیدری، پلاک ۱۵",
    link: "https://maps.google.com",
  },
  {
    icon: BiPhone,
    title: "تلفن تماس",
    value: "۰۲۱-۱۲۳۴۵۶۷۸",
    link: "tel:+982112345678",
  },
  {
    icon: BiEnvelope,
    title: "ایمیل",
    value: "info@asouda.com",
    link: "mailto:info@asouda.com",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    value: "شنبه تا پنجشنبه: ۹ صبح تا ۹ شب",
    subtitle: "جمعه‌ها: ۱۰ صبح تا ۶ شب",
  },
];

// about us page
// Core values
export const aboutUdValues = [
  {
    icon: Gem,
    title: "کیفیت برتر",
    desc: "انتخاب دقیق مواد اولیه و کنترل کیفیت در تمام مراحل تولید",
  },
  {
    icon: Ruler,
    title: "طراحی بی‌نظیر",
    desc: "تلفیق هنر و مهندسی برای خلق محصولاتی زیبا و کاربردی",
  },
  {
    icon: Shield,
    title: "دوام و استحکام",
    desc: "ساخت با استانداردهای روز دنیا برای ماندگاری طولانی",
  },
  {
    icon: Heart,
    title: "مشتری‌مداری",
    desc: "ارتباط بر پایه اعتماد، احترام و مسئولیت‌پذیری",
  },
];

// Brand story tabs
export const aboutUsStoryTabs = [
  {
    title: "چشم‌انداز",
    content:
      "چشم‌انداز ما تبدیل شدن به برند پیشرو در صنعت سرویس خواب ایران با تکیه بر کیفیت، نوآوری و اعتماد مشتریان است. ما می‌کوشیم همواره الگوی برتری در طراحی و تولید باشیم.",
  },
  {
    title: "ماموریت",
    content:
      "ما مأموریت داریم تا با تولید سرویس‌های خواب باکیفیت و زیبا، آرامش و آسایش را به خانه‌های ایرانی هدیه دهیم و تجربه‌ای ماندگار برای مشتریان ایجاد کنیم.",
  },
  {
    title: "ارزش‌ها",
    content:
      "کیفیت، صداقت، نوآوری و مشتری‌مداری چهار ارزش اصلی ما هستند که در تمام فعالیت‌هایمان از طراحی تا خدمات پس از فروش رعایت می‌شوند.",
  },
];

// ===== TESTIMONIALS DATA =====
export const aboutUsTestimonials = [
  {
    id: 1,
    name: "محمد رضایی",
    role: "مشتری آسوده",
    content:
      "کیفیت سرویس خواب آسوده فراتر از انتظار بود. طراحی زیبا و دوام بالایی دارد. حتماً به دوستانم توصیه می‌کنم.",
    avatar: "/avatar-1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "سارا کریمی",
    role: "طراح داخلی",
    content:
      "به عنوان طراح داخلی، همیشه به مشتریانم آسوده را پیشنهاد می‌دهم. تنوع محصولات و کیفیت ساخت فوق‌العاده است.",
    avatar: "/avatar-2.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "علی محمدی",
    role: "مشتری آسوده",
    content:
      "از نهایت دقت در بسته‌بندی تا خدمات پس از فروش عالی. آسوده واقعاً به مشتریانش اهمیت می‌دهد.",
    avatar: "/avatar-3.jpg",
    rating: 5,
  },
];

// colors
export const mdfColors = [
  { name: "سفید برفی", value: "#FFFFFF" },
  { name: "سفید صدفی", value: "#F8F8F4" },
  { name: "استخوانی", value: "#F3EFE6" },
  { name: "شیری", value: "#F7F3EB" },
  { name: "کرم روشن", value: "#F4E7D0" },

  { name: "طوسی روشن", value: "#D9D9D9" },
  { name: "طوسی فیلی", value: "#B7B7B7" },
  { name: "طوسی سنگی", value: "#8F8F8F" },
  { name: "دودی", value: "#666666" },
  { name: "نوک مدادی", value: "#4B4B4B" },
  { name: "آنتراسیت", value: "#2C2C2C" },

  { name: "گردویی", value: "#6F4E37" },
  { name: "گردویی تیره", value: "#4E342E" },
  { name: "فندقی", value: "#A47149" },
  { name: "بلوط روشن", value: "#C89B63" },
  { name: "بلوط تیره", value: "#8B5A2B" },
  { name: "راش", value: "#D9B382" },
  { name: "افرا", value: "#E7C9A9" },
  { name: "ماهاگونی", value: "#7A2E2E" },
  { name: "ونگه", value: "#2D211B" },

  { name: "سبز زیتونی", value: "#6B7A3E" },
  { name: "سبز سدری", value: "#9DAA8B" },
  { name: "آبی اقیانوسی", value: "#2E5D87" },
  { name: "سرمه‌ای", value: "#1E2D4F" },
  { name: "بژ", value: "#D9C6A5" },
  { name: "کاپوچینویی", value: "#B08A6A" },

  { name: "سفید هایگلاس", value: "#FAFAFA" },
  { name: "مشکی هایگلاس", value: "#101010" },
  { name: "طوسی هایگلاس", value: "#A6A6A6" },
  { name: "مشکی مات", value: "#1E1E1E" },
];