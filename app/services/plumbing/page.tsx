import React from "react";

import { Img } from "../../../components/Image";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { SubServiceCard } from "../../../components/SubServiceCard";
import { Card, CardContent } from "../../../components/ui/Card";
import { ImageCarousel } from "@/components/ImageCarousel";

import {
  Truck,
  Package,
  Shield,
  CheckCircle,
  Clock,
  Home,
  Building,
  Phone,
  MessageCircle,
  MapPin,
  Users,
  Award,
  ChevronDown,
  Search,
  Droplets,
  Wrench,
  AlertTriangle,
} from "lucide-react";

const plumbingServices = [
  {
    title: "كشف تسريبات المياه",
    description: "كشف التسريبات بأحدث الأجهزة الإلكترونية دون تكسير",
    features: ["كشف دقيق", "بدون تكسير", "تقرير مفصل", "ضمان الخدمة"],
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
    icon: <Search className="h-6 w-6" />,
  },
  {
    title: "تسليك البالوعات",
    description: "تسليك المجاري والبالوعات باستخدام معدات متطورة",
    features: ["تسليك سريع", "تنظيف شامل", "معدات حديثة", "خدمة طوارئ"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    icon: <Droplets className="h-6 w-6" />,
  },
  {
    title: "إصلاح السباكة",
    description: "إصلاح وتركيب أعمال السباكة والصرف الصحي",
    features: [
      "إصلاح الأنابيب",
      "تركيب المواسير",
      "صيانة الحنفيات",
      "أعمال الصرف",
    ],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    icon: <Wrench className="h-6 w-6" />,
  },
  {
    title: "خدمات الطوارئ",
    description: "خدمة طوارئ السباكة متاحة 24 ساعة طوال الأسبوع",
    features: ["متاح 24/7", "استجابة سريعة", "حلول فورية", "فريق متخصص"],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    icon: <AlertTriangle className="h-6 w-6" />,
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1682268294094-5c68969ea23a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwd29ya2luZyUyMHBpcGVzJTIwcmVwYWlyfGVufDF8fHx8MTc1ODA1MTU0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "فني سباكة يعمل على إصلاح الأنابيب",
  },
  {
    src: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
    alt: "كشف تسريبات المياه بالأجهزة الحديثة",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    alt: "تسليك البالوعات والمجاري",
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    alt: "أعمال السباكة المتخصصة",
  },
];

const relatedProjects = [
  {
    title: "كشف تسريب خزان علوي",
    description: "كشف وإصلاح تسريب في خزان المياه العلوي لمبنى سكني",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
    category: "كشف تسريبات",
    duration: "يوم واحد",
  },
  {
    title: "تسليك شبكة الصرف الصحي",
    description: "تسليك شامل لشبكة الصرف الصحي في مجمع سكني",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "تسليك",
    duration: "3 أيام",
  },
  {
    title: "إصلاح نظام السباكة",
    description: "إصلاح وتجديد نظام السباكة الكامل لفيلا سكنية",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    category: "إصلاح سباكة",
    duration: "أسبوع",
  },
];

const faqItems = [
  {
    question: "كم تستغرق عملية كشف التسريبات؟",
    answer:
      "عادة تستغرق عملية كشف التسريبات من ساعة إلى ساعتين حسب حجم المساحة ونوع التسريب.",
  },
  {
    question: "هل تستخدمون أجهزة حديثة في الكشف؟",
    answer:
      "نعم، نستخدم أحدث الأجهزة الإلكترونية لكشف التسريبات دون الحاجة لتكسير الجدران أو الأرضيات.",
  },
  {
    question: "هل خدمة الطوارئ متاحة في أي وقت؟",
    answer:
      "نعم، خدمة طوارئ السباكة متاحة 24/7 طوال أيام الأسبوع للحالات الطارئة.",
  },
  {
    question: "ما هو الضمان المقدم على الخدمات؟",
    answer:
      "نقدم ضمان شامل لمدة 6 أشهر على جميع أعمال الإصلاح وسنة كاملة على قطع الغيار.",
  },
];

const whyChooseUs = [
  {
    icon: <Shield className="h-12 w-12 text-cyan-600" />,
    title: "أجهزة متطورة",
    description: "نستخدم أحدث الأجهزة لكشف التسريبات دون تكسير",
  },
  {
    icon: <Clock className="h-12 w-12 text-cyan-600" />,
    title: "خدمة 24/7",
    description: "متاحون على مدار الساعة للحالات الطارئة",
  },
  {
    icon: <Users className="h-12 w-12 text-cyan-600" />,
    title: "فنيون خبراء",
    description: "فريق من الفنيين المتخصصين في السباكة",
  },
  {
    icon: <Award className="h-12 w-12 text-cyan-600" />,
    title: "ضمان شامل",
    description: "ضمان على جميع الأعمال وقطع الغيار",
  },
];

const workSteps = [
  {
    step: "1",
    title: "استقبال البلاغ",
    description: "نستقبل بلاغكم ونحدد نوع المشكلة ودرجة الطوارئ",
  },
  {
    step: "2",
    title: "الوصول السريع",
    description: "نصل إليكم في أسرع وقت مع جميع المعدات اللازمة",
  },
  {
    step: "3",
    title: "التشخيص والكشف",
    description: "فحص دقيق وتشخيص المشكلة باستخدام أحدث الأجهزة",
  },
  {
    step: "4",
    title: "الإصلاح والضمان",
    description: "إصلاح احترافي مع ضمان شامل على جميع الأعمال",
  },
];

export default function PlumbingServicePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-50 to-cyan-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <Droplets className="ml-3 h-8 w-8 text-cyan-600" />
                <Badge
                  variant="secondary"
                  className="bg-cyan-100 text-cyan-700"
                >
                  خدمات السباكة المتخصصة
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                خدمات التسليك وكشف التسريبات
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                نوفر خدمات كشف التسريبات وتسليك المجار�� بأحدث التقنيات والمعدات
                المتطورة. فريق من الخبراء المتخصصين متاح على مدار الساعة لحل
                جميع مشاكل السباكة.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex items-center bg-cyan-600 hover:bg-cyan-700"
                >
                  <span>طلب خدمة فورية</span>
                  <CheckCircle className="mr-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  كشف تسريبات
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Img
                  src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop"
                  alt="خدمات السباكة"
                  className="h-[400px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              لماذا تحتاج خدمات السباكة المتخصصة؟
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              مشاكل السباكة تحتاج إلى تدخل سريع ومهني لتجنب الأضرار الكبيرة.
              خدماتنا المتخصصة تضمن حل سريع وفعال لجميع مشاكل التسريبات
              والانسدادات باستخدام أحدث التقنيات والأجهزة المتطورة دون الحاجة
              للتكسير.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100">
                  <Search className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">كشف دقيق</h3>
                <p className="text-sm text-gray-600">
                  أجهزة حديثة لكشف التسريبات دون تكسير
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100">
                  <Clock className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  استجابة سريعة
                </h3>
                <p className="text-sm text-gray-600">خدمة طوارئ متاحة 24/7</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100">
                  <Shield className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">ضمان شامل</h3>
                <p className="text-sm text-gray-600">
                  ضمان على جميع الأعمال والقطع
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
              خدمات السباكة المتخصصة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              حلول شاملة لجميع مشاكل السباكة والصرف الصحي
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {plumbingServices.map((service, index) => (
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
              صور من أعمال السباكة والتسليك التي نفذناها لعملائنا
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
      <section className="bg-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نتميز بالخبرة والتقنيات الحديثة في حل مشاكل السباكة
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
              عملية منظمة ومهنية لحل مشاكل السباكة بفعالية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-xl font-bold text-white">
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
              اطلعوا على بعض من مشاريع السباكة التي نفذناها بنجاح
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
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                    <h3 className="mb-2 text-lg font-semibold">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-600">{project.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="ml-1 h-4 w-4" />
                      <span>مدة التنفيذ: {project.duration}</span>
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
              إجابات على أكثر الأسئلة شيوعاً حول خدمات السباكة
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
      <section className="bg-cyan-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            خدمة طوارئ السباكة متاحة 24/7
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            مشكلة تسريب أو انسداد؟ فريقنا جاهز للمساعدة في أي وقت
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
