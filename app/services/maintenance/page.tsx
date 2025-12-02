import React from "react";

import { Img } from "../../../components/Image";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { SubServiceCard } from "../../../components/SubServiceCard";
import { Card, CardContent } from "../../../components/ui/Card";
import { ImageCarousel } from "@/components/ImageCarousel";
import ServiceJsonLd from "@/app/_components/ServiceJsonLd";

import {
  Shield,
  CheckCircle,
  Clock,
  Home,
  Phone,
  MessageCircle,
  Users,
  Award,
  ChevronDown,
  Wind,
  Settings,
  Zap,
  Hammer,
  Wrench,
} from "lucide-react";

const maintenanceServices = [
  {
    title: "صيانة التكييف",
    description: "صيانة وإصلاح جميع أنواع مكيفات الهواء المنزلية والتجارية",
    features: ["تنظيف الفلاتر", "شحن الغاز", "فحص الكمبروسر", "صيانة دورية"],
    image:
      "https://images.unsplash.com/photo-1631494775567-e5e44d3a1e6f?w=400&h=300&fit=crop",
    icon: <Wind className="h-6 w-6" />,
  },
  {
    title: "صيانة الأجهزة الكهربائية",
    description: "إصلاح وصيانة جميع الأجهزة المنزلية بكفاءة عالية",
    features: [
      "ثلاجات وفريزرات",
      "غسالات ونشافات",
      "مايكروويف وأفران",
      "غسالات أطباق",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
    icon: <Settings className="h-6 w-6" />,
  },
  {
    title: "العمال الكهربائية",
    description: "تركيب وإصلاح الأنظمة الكهربائية بأمان تام",
    features: [
      "تمديدات كهربائية",
      "تركيب الإنارة",
      "لوحات التحكم",
      "أنظمة الحماية",
    ],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "الصيانة العامة",
    description: "خدمات صيانة عامة للمنازل والمكاتب والمنشآت",
    features: [
      "نجارة وديكور",
      "دهانات",
      "صيانة الأبواب والنوافذ",
      "أعمال السباكة البسيطة",
    ],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    icon: <Hammer className="h-6 w-6" />,
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1631494775567-e5e44d3a1e6f?w=400&h=300&fit=crop",
    alt: "صيانة أنظمة التكييف",
  },
  {
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
    alt: "إصلاح الأجهزة الكهربائية",
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    alt: "الأعمال الكهربائية",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    alt: "أعمال الصيانة العامة",
  },
];

const relatedProjects = [
  {
    title: "صيانة شاملة لفيلا سكنية",
    description:
      "صيانة جميع الأجهزة الكهربائية وأنظمة التكييف في فيلا من طابقين",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    category: "صيانة منزلية",
    duration: "3 أيام",
    size: "فيلا كاملة",
  },
  {
    title: "تجديد النظام الكهربائي",
    description: "تحديث وتجديد النظام الكهربائي الكامل لمبنى سكني",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    category: "كهرباء",
    duration: "5 أيام",
    size: "مبنى سكني",
  },
  {
    title: "صيانة مركز تجاري",
    description: "صيانة دورية لجميع أنظمة التكييف والكهرباء في مركز تجاري",
    image:
      "https://images.unsplash.com/photo-1631494775567-e5e44d3a1e6f?w=400&h=300&fit=crop",
    category: "تجاري",
    duration: "أسبوع",
    size: "مركز تجاري",
  },
];

const faqItems = [
  {
    question: "كم تستغرق صيانة المكيف العادية؟",
    answer:
      "صيانة المكيف العادية تستغرق من 30-45 دقيقة وتشمل التنظيف والفحص وشحن الغاز إن لزم الأمر.",
  },
  {
    question: "هل تقدمون خدمة صيانة دورية؟",
    answer:
      "نعم، نوفر عقود صيانة دورية شهرية وربع سنوية وسنوية لجميع الأجهزة والأنظمة مع خصومات مميزة.",
  },
  {
    question: "هل لديكم فنيون متخصصون؟",
    answer:
      "نعم، جميع الفنيين لدينا مدربون ومعتمدون في مجالات الكهرباء والتكييف والأجهزة المنزلية.",
  },
  {
    question: "ما هو الضمان على الإصلاحات؟",
    answer:
      "نقدم ضمان من 3-6 أشهر على جميع الإصلاحات وسنة كاملة على قطع الغيار المستبدلة.",
  },
  {
    question: "هل متاحون للطوارئ؟",
    answer:
      "نعم، لدينا خدمة طوارئ متاحة 24/7 للحالات الكهربائية والتكييف الطارئة.",
  },
];

const whyChooseUs = [
  {
    icon: <Shield className="h-12 w-12 text-indigo-600" />,
    title: "فنيون معتمدون",
    description: "فريق من الفنيين المدربين والمعتمدين",
  },
  {
    icon: <Clock className="h-12 w-12 text-indigo-600" />,
    title: "استجابة سريعة",
    description: "نصل إليكم بسرعة في الأوقات المحددة",
  },
  {
    icon: <Users className="h-12 w-12 text-indigo-600" />,
    title: "خبرة طويلة",
    description: "سنوات من الخبرة في مجال الصيانة",
  },
  {
    icon: <Award className="h-12 w-12 text-indigo-600" />,
    title: "ضمان شامل",
    description: "ضمان على جميع الأعمال وقطع الغيار",
  },
];

const workSteps = [
  {
    step: "1",
    title: "البلاغ والحجز",
    description: "استقبال بلاغكم وتحديد موعد الزيارة المناسب",
  },
  {
    step: "2",
    title: "الفحص والتشخيص",
    description: "فحص شامل لتحديد المشكلة وأسبابها",
  },
  {
    step: "3",
    title: "الإصلاح والصيانة",
    description: "تنفيذ أعمال الصيانة والإصلاح بمهنية",
  },
  {
    step: "4",
    title: "الاختبار والضمان",
    description: "اختبار الجهاز وتقديم الضمان المطلوب",
  },
];

export default function MaintenanceServicePage() {
  return (
    <main className="flex-1">
      <ServiceJsonLd
        name="خدمات الصيانة الشاملة"
        description="نقدم خدمات صيانة متكاملة للتكييف والأجهزة الكهربائية والأنظمة الكهربائية. فريق من الفنيين المتخصصين متاح لتلبية جميع احتياجاتكم من الصيانة والإصلاح."
        image="/images/services/cleaning.webp"
        url="/services/maintenance"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <Wrench className="ml-3 h-8 w-8 text-indigo-600" />
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700"
                >
                  خدمات الصيانة المتخصصة
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                خدمات الصيانة الشاملة
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                نقدم خدمات صيانة متكاملة للتكييف والأجهزة الكهربائية والأنظمة
                الكهربائية. فريق من الفنيين المتخصصين متاح لتلبية جميع
                احتياجاتكم من الصيانة والإصلاح.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex items-center bg-indigo-600 hover:bg-indigo-700"
                >
                  <span>احجز صيانة</span>
                  <CheckCircle className="mr-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  عقود صيانة دورية
                </Button>
              </div>
            </div>

            <div className="h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Img
                src="/images/services/cleaning.webp"
                alt="خدمات الصيانة"
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

      {/* Introduction Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              لماذا تحتاج خدمات الصيانة المهنية؟
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              الصيانة الدورية والمهنية ضرورية للحفاظ على أداء الأجهزة وإطالة
              عمرها الافتراضي. خدماتنا المتخصصة تضمن إصلاح سريع وفعال مع ضمانات
              شاملة على جميع الأعمال.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <Wind className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  صيانة التكييف
                </h3>
                <p className="text-sm text-gray-600">
                  خدمات صيانة شاملة لجميع أنواع المكيفات
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <Zap className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  أعمال كهربائية
                </h3>
                <p className="text-sm text-gray-600">
                  تركيب وإصلاح الأنظمة الكهربائية بأمان
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <Settings className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  إصلاح الأجهزة
                </h3>
                <p className="text-sm text-gray-600">
                  صيانة جميع الأجهزة المنزلية والكهربائية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              خدمات الصيانة المتخصصة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نقدم حلول صيانة شاملة لجميع احتياجاتكم من الإصلاح والصيانة
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {maintenanceServices.map((service, index) => (
              <SubServiceCard
                key={index}
                title={service.title}
                subtitle={service.title}
                features={service.features}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              معرض أعمالنا
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              صور من أعمال الصيانة التي نفذناها لعملائنا الكرام
            </p>
          </div>

          <ImageCarousel
            slides={galleryImages}
            autoPlay={true}
            height="h-[400px]"
            overlayContent={false}
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نتميز بالخبرة والمهنية في تقديم خدمات الصيانة
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center transition-shadow duration-300 hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="mb-3 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">كيف نعمل؟</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              عملية منظمة ومهنية للحصول على خدمة صيانة مثالية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              مشاريع مماثلة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              اطلعوا على بعض من مشاريع الصيانة التي نفذناها بنجاح
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedProjects.map((project, index) => (
              <Card
                key={index}
                className="transition-shadow duration-300 hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <Img
                    src={project.image}
                    alt={project.title}
                    containerClassName="h-48 w-full rounded-t-lg"
                    className="object-cover"
                  />
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                    <h3 className="mb-2 text-lg font-semibold">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-600">{project.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="ml-1 h-4 w-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="ml-1 h-4 w-4" />
                        <span>{project.size}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              الأسئلة الشائعة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              إجابات على أكثر الأسئلة شيوعاً حول خدمات الصيانة
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between p-6 hover:bg-gray-50">
                      <h3 className="text-lg font-semibold">{item.question}</h3>
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="leading-relaxed text-gray-600">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            احصل على خدمة صيانة احترافية اليوم
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            احجز موعد صيانة أو احصل على عقد صيانة دورية بأسعار مميزة
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
    </main>
  );
}
