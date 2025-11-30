import {
  Building,
  CheckCircle,
  Clock,
  FileCheck,
  HardHat,
  Layers,
  MessageCircle,
  Mountain,
  Paintbrush,
  Phone,
  Shield,
  Square,
  Truck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/Image";
import { SubServiceCard } from "@/components/SubServiceCard";
import { ImageCarousel } from "@/components/ImageCarousel";

export default function ContractingPage() {
  const subServices = [
    {
      title: "تركيب بديل الرخام",
      subtitle:
        "تركيب بديل الرخام عالي الجودة للواجهات والأرضيات والجدران الداخلية والخارجية",
      features: [
        "مقاوم للرطوبة",
        "سهولة التنظيف",
        "تشكيلة ألوان متنوعة",
        "مدة ضمان طويلة",
      ],

      image: "/images/contracting/sub-service-1.jpeg",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "تركيب الخشب المضغوط",
      subtitle:
        "تركيب ألواح الخشب المضغوط للأرضيات والجدران والأسقف بأحدث التقنيات",
      features: ["مقاوم للماء", "عزل حراري ممتاز", "تركيب سريع", "صديق للبيئة"],

      image: "/images/contracting/sub-service-2.jpeg",
      icon: <Square className="h-5 w-5" />,
    },
    {
      title: "تركيب البلاط والسيراميك",
      subtitle:
        "تركيب جميع أنواع البلاط والسيراميك والبورسلين للأرضيات والجدران",
      features: [
        "تشكيلة واسعة",
        "تركيب محترف",
        "مواد لاصقة عالية الجودة",
        "تشطيب نهائي مثالي",
      ],

      image: "/images/contracting/sub-service-3.jpeg",
      icon: <Square className="h-5 w-5" />,
    },
    {
      title: "أعمال البناء العامة",
      subtitle:
        "المقاولات العامة للبناء والإنشاءات السكنية والتجارية والصناعية",
      features: ["تخطيط هندسي", "تنفيذ احترافي", "متابعة دورية", "ضمان شامل"],
      image: "/images/contracting/sub-service-4.jpeg",
      icon: <Building className="h-5 w-5" />,
    },
    {
      title: "المقاولات الكهربائية",
      subtitle:
        "تمديد وصيانة الأنظمة الكهربائية للمباني السكنية والتجارية والصناعية",
      features: [
        "تمديدات آمنة",
        "أنظمة إضاءة حديثة",
        "لوحات تحكم ذكية",
        "صيانة دورية",
      ],
      price: "من 150 ريال نقطة",
      image: "/images/contracting/sub-service-5.jpeg",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: "أعمال التشطيبات",
      subtitle: "تشطيبات داخلية وخارجية شاملة للمباني بأحدث المواد والتقنيات",
      features: [
        "دهانات عصرية",
        "ديكورات حديثة",
        "تشطيبات فاخرة",
        "تسليم مفتاح بيد",
      ],

      image: "/images/contracting/sub-service-6.jpeg",
      icon: <Paintbrush className="h-5 w-5" />,
    },
    {
      title: "أعمال الخرسانة",
      subtitle: "صب وتسليح الخرسانة المسلحة للأساسات والهياكل والأسقف",
      features: [
        "خرسانة عالية المقاومة",
        "تسليح محكم",
        "عزل مائي",
        "اختبارات جودة",
      ],

      image: "/images/contracting/sub-service-7.jpeg",
      icon: <Mountain className="h-5 w-5" />,
    },
    {
      title: "أعمال الحديد والمعادن",
      subtitle: "تصنيع وتركيب الهياكل المعدنية والحديدية للمباني والمنشآت",
      features: [
        "حديد مقاوم للصدأ",
        "تصاميم هندسية دقيقة",
        "طلاء واقي",
        "تركيب محترف",
      ],
      price: "من 120 ريال/كجم",
      image: "/images/contracting/sub-service-8.jpeg",
      icon: <HardHat className="h-5 w-5" />,
    },
    {
      title: "أعمال الطرق والبنية التحتية",
      subtitle: "إنشاء وصيانة الطرق الداخلية والمواقف والبنية التحتية للمجمعات",
      features: [
        "رصف احترافي",
        "تصريف مياه الأمطار",
        "علامات المرور",
        "إضاءة الطرق",
      ],

      image: "/images/contracting/sub-service-9.jpeg",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "عقود الصيانة",
      subtitle: "عقود صيانة دورية شاملة للمباني والمنشآت السكنية والتجارية",
      features: ["صيانة دورية", "طوارئ 24/7", "فريق متخصص", "تقارير مفصلة"],

      image: "/images/contracting/sub-service-10.jpeg",
      icon: <FileCheck className="h-5 w-5" />,
    },
  ];

  const galleryImages = [
    { src: "/images/contracting/gallery-1.jpeg", alt: "معرض صور اعمالنا 1" },
  ];
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-amber-50 to-amber-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <Building className="ml-3 h-8 w-8 text-amber-600" />
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700"
                >
                  خدمات المقاوﻻت المتخصصة
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                خدمات المقاوﻻت العامة و التشطيبات المتخصصة
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {" "}
                شركة الزاهر فيو للمقاولات العامة - مقاول معتمد في السعودية نقدم
                خدمات البناء والتشطيب والترميم وتركيب البلاط والرخام والخشب
                المضغوط بأعلى معايير الجودة والاحترافية. فريق من المهندسين
                والحرفيين المهرة لتنفيذ جميع مشاريع المقاولات والبنية التحتية
                والأعمال الكهربائية بضمان شامل.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex items-center bg-amber-600 hover:bg-amber-700"
                >
                  <span>احصل علي عرض</span>
                  <CheckCircle className="mr-2 h-5 w-5" />
                </Button>

                <Button size="lg" variant="outline">
                  <span>استشارة هندسية</span>
                </Button>
              </div>
            </div>

            <div className="h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Img
                src="/images/cleaning-1.jpeg"
                alt="خدمات المقاوﻻت"
                width={800}
                height={400}
                fill={false}
                priority={true}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              شركة مقاولات معتمدة في السعودية - خدمات متكاملة
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              شركة الزاهر فيو للمقاولات العامة - أفضل مقاول في الرياض وجدة
              والدمام. نقدم خدمات مقاولات شاملة تشمل البناء العام، التشطيبات،
              تركيب البلاط والسيراميك، بديل الرخام، الخشب المضغوط، المقاولات
              الكهربائية، أعمال الخرسانة، الحديد والمعادن، الطرق والبنية التحتية
              مع عقود صيانة طويلة المدى. خبرة تزيد عن 15 عاماً في سوق المقاولات
              السعودي.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <Building className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  جودة التركيب
                </h3>
                <p className="text-sm text-gray-600">
                  معايير عالية في التنفيذ والمواد
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  الأمان والسلامة
                </h3>
                <p className="text-sm text-gray-600">
                  التزام بقوانين السلامة والأمان
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  الالتزام بالمواعيد
                </h3>
                <p className="text-sm text-gray-600">
                  تسليم المشاريع في الوقت المحدد
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              خدمات المقاولات الرئيسية - مقاول معتمد
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              خدمات مقاولات متكاملة من البناء العام إلى التشطيبات الفاخرة - أفضل
              أسعار المقاولات في السعودية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {subServices.map((service, index) => (
              <SubServiceCard
                key={index}
                title={service.title}
                subtitle={service.subtitle}
                features={service.features}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              لماذا شركة الزاهر فيو أفضل شركة مقاولات في السعودية؟
            </h2>

            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  خبرة واسعة في مجال المقاولات
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600">
                  تمتلك شركة الزاهر فيو خبرة تزيد عن 15 عاماً في مجال المقاولات
                  العامة في المملكة العربية السعودية. نحن متخصصون في جميع أنواع
                  المقاولات من البناء العام إلى التشطيبات الفاخرة، تركيب البلاط
                  والسيراميك، بديل الرخام، الخشب المضغوط، والمقاولات الكهربائية.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    مقاول معتمد ومرخص رسمياً
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    أكثر من 500 مشروع مكتمل بنجاح
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    فريق من المهندسين والفنيين المختصين
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  خدمات مقاولات شاملة ومتنوعة
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600">
                  نقدم خدمات مقاولات متكاملة تشمل البناء العام، أعمال الخرسانة
                  المسلحة، الحديد والمعادن، التشطيبات الداخلية والخارجية،
                  المقاولات الكهربائية، الطرق والبنية التحتية، بالإضافة إلى عقود
                  الصيانة الشاملة للمباني السكنية والتجارية.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    أسعار تنافسية وعروض مميزة
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    ضمان شامل على جميع الأعمال
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    استخدام أجود المواد والمعدات
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-6 text-center text-2xl font-semibold text-gray-900">
                تخصصاتنا في المقاولات
              </h3>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                <div className="text-center">
                  <Building className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">
                    مقاولات عامة
                  </p>
                </div>
                <div className="text-center">
                  <Layers className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">
                    بديل الرخام
                  </p>
                </div>
                <div className="text-center">
                  <Square className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">
                    الخشب المضغوط
                  </p>
                </div>
                <div className="text-center">
                  <Square className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">
                    البلاط والسيراميك
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">الكهرباء</p>
                </div>
                <div className="text-center">
                  <Paintbrush className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">التشطيبات</p>
                </div>
                <div className="text-center">
                  <Mountain className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">الخرسانة</p>
                </div>
                <div className="text-center">
                  <HardHat className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">
                    الحديد والمعادن
                  </p>
                </div>
                <div className="text-center">
                  <FileCheck className="mx-auto mb-2 h-8 w-8 text-amber-600" />
                  <p className="text-sm font-medium text-gray-900">
                    عقود الصيانة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              معرض صور اعمالنا
            </h2>
            <p className="text-lg text-muted-foreground">
              شاهدوا نماذج من اعمالنا المتميزة في مجال المقاوﻻت
            </p>
          </div>

          <ImageCarousel slides={galleryImages} height="h-[400px]" />
        </div>
      </section>

      <section className="bg-amber-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            احصل على أفضل عرض مقاولات في السعودية
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg opacity-90">
            تواصل مع أفضل شركة مقاولات معتمدة في الرياض وجدة والدمام للحصول على
            عرض أسعار مجاني ومفصل لمشروعك. نقدم خدمات المقاولات العامة،
            التشطيبات، تركيب البلاط والرخام، الكهرباء، والصيانة الشاملة بأفضل
            الأسعار وأعلى جودة.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="flex items-center space-x-2 space-x-reverse"
              asChild
            >
              <a href="tel:+966590123782">
                <Phone className="h-5 w-5" />
                <span>اتصل الآن</span>
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex items-center space-x-2 space-x-reverse"
              asChild
            >
              <a
                href="https://wa.me/966590123782"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                <span>واتساب</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
