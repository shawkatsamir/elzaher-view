import {
  Building,
  CheckCircle,
  Clock,
  FileCheck,
  HardHat,
  Layers,
  Mountain,
  Paintbrush,
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
import { CallButton } from "@/components/ui/CallButton";
import { WhatsAppButton } from "@/components/ui/WhatsappButton";

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 text-amber-600 ml-3" />
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700"
                >
                  خدمات المقاوﻻت المتخصصة
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                خدمات المقاوﻻت العامة و التشطيبات المتخصصة
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {" "}
                شركة الزاهر فيو للمقاولات العامة - مقاول معتمد في السعودية نقدم
                خدمات البناء والتشطيب والترميم وتركيب البلاط والرخام والخشب
                المضغوط بأعلى معايير الجودة والاحترافية. فريق من المهندسين
                والحرفيين المهرة لتنفيذ جميع مشاريع المقاولات والبنية التحتية
                والأعمال الكهربائية بضمان شامل.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
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

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Img
                  src="/images/contracting/hero.jpeg"
                  alt="خدمات المقاوﻻت"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              شركة مقاولات معتمدة في السعودية - خدمات متكاملة
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              شركة الزاهر فيو للمقاولات العامة - أفضل مقاول في الرياض وجدة
              والدمام. نقدم خدمات مقاولات شاملة تشمل البناء العام، التشطيبات،
              تركيب البلاط والسيراميك، بديل الرخام، الخشب المضغوط، المقاولات
              الكهربائية، أعمال الخرسانة، الحديد والمعادن، الطرق والبنية التحتية
              مع عقود صيانة طويلة المدى. خبرة تزيد عن 15 عاماً في سوق المقاولات
              السعودي.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  جودة التركيب
                </h3>
                <p className="text-gray-600 text-sm">
                  معايير عالية في التنفيذ والمواد
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  الأمان والسلامة
                </h3>
                <p className="text-gray-600 text-sm">
                  التزام بقوانين السلامة والأمان
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  الالتزام بالمواعيد
                </h3>
                <p className="text-gray-600 text-sm">
                  تسليم المشاريع في الوقت المحدد
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              خدمات المقاولات الرئيسية - مقاول معتمد
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              خدمات مقاولات متكاملة من البناء العام إلى التشطيبات الفاخرة - أفضل
              أسعار المقاولات في السعودية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              لماذا شركة الزاهر فيو أفضل شركة مقاولات في السعودية؟
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  خبرة واسعة في مجال المقاولات
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  تمتلك شركة الزاهر فيو خبرة تزيد عن 15 عاماً في مجال المقاولات
                  العامة في المملكة العربية السعودية. نحن متخصصون في جميع أنواع
                  المقاولات من البناء العام إلى التشطيبات الفاخرة، تركيب البلاط
                  والسيراميك، بديل الرخام، الخشب المضغوط، والمقاولات الكهربائية.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    مقاول معتمد ومرخص رسمياً
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    أكثر من 500 مشروع مكتمل بنجاح
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    فريق من المهندسين والفنيين المختصين
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  خدمات مقاولات شاملة ومتنوعة
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  نقدم خدمات مقاولات متكاملة تشمل البناء العام، أعمال الخرسانة
                  المسلحة، الحديد والمعادن، التشطيبات الداخلية والخارجية،
                  المقاولات الكهربائية، الطرق والبنية التحتية، بالإضافة إلى عقود
                  الصيانة الشاملة للمباني السكنية والتجارية.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    أسعار تنافسية وعروض مميزة
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    ضمان شامل على جميع الأعمال
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    استخدام أجود المواد والمعدات
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                تخصصاتنا في المقاولات
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="text-center">
                  <Building className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    مقاولات عامة
                  </p>
                </div>
                <div className="text-center">
                  <Layers className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    بديل الرخام
                  </p>
                </div>
                <div className="text-center">
                  <Square className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    الخشب المضغوط
                  </p>
                </div>
                <div className="text-center">
                  <Square className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    البلاط والسيراميك
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">الكهرباء</p>
                </div>
                <div className="text-center">
                  <Paintbrush className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">التشطيبات</p>
                </div>
                <div className="text-center">
                  <Mountain className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">الخرسانة</p>
                </div>
                <div className="text-center">
                  <HardHat className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    الحديد والمعادن
                  </p>
                </div>
                <div className="text-center">
                  <Truck className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    الطرق والبنية التحتية
                  </p>
                </div>
                <div className="text-center">
                  <FileCheck className="h-8 w-8 text-amber-600 mx-auto mb-2" />
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
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
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

      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            احصل على أفضل عرض مقاولات في السعودية
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            تواصل مع أفضل شركة مقاولات معتمدة في الرياض وجدة والدمام للحصول على
            عرض أسعار مجاني ومفصل لمشروعك. نقدم خدمات المقاولات العامة،
            التشطيبات، تركيب البلاط والرخام، الكهرباء، والصيانة الشاملة بأفضل
            الأسعار وأعلى جودة.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallButton />

            <WhatsAppButton />
          </div>
        </div>
      </section>
    </div>
  );
}
