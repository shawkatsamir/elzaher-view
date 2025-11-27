import React from "react";

import { Img } from "../../../components/Image";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { SubServiceCard } from "../../../components/SubServiceCard";
import { Card, CardContent } from "../../../components/ui/Card";
import { ImageCarousel } from "@/components/ImageCarousel";

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
  TreePine,
  Flower,
  Droplets,
  Scissors,
} from "lucide-react";

const landscapingServices = [
  {
    title: "تصميم الحدائق",
    description: "تصميم وتنسيق حدائق عصرية بأفكار إبداعية تناسب ذوقكم ومساحتكم",
    features: [
      "تصميم 3D احترافي",
      "اختيار النباتات",
      "توزيع المساحات",
      "إضاءة الحدائق",
    ],
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    icon: <TreePine className="h-6 w-6" />,
  },
  {
    title: "زراعة النباتات",
    description: "زراعة وتركيب جميع أنواع النباتات والأشجار والزهور",
    features: [
      "نباتات طبيعية",
      "أشجار زينة",
      "زهور موسمية",
      "نجيل صناعي وطبيعي",
    ],
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop",
    icon: <Flower className="h-6 w-6" />,
  },
  {
    title: "أنظمة الري",
    description: "تركيب وصيانة أنظمة الري الحديثة والتقليدية",
    features: ["ري أوتوماتيكي", "ري بالتنقيط", "مؤقتات ذكية", "صيانة دورية"],
    image:
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=300&fit=crop",
    icon: <Droplets className="h-6 w-6" />,
  },
  {
    title: "الصيانة الدورية",
    description: "خدمات صيانة دورية للحدائق للحفاظ على جمالها ونضارتها",
    features: ["تقليم وتشذيب", "تسميد ورش", "إزالة الأعشاب", "تجديد النباتات"],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    icon: <Scissors className="h-6 w-6" />,
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    alt: "تصميم حدائق عصرية",
  },
  {
    src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop",
    alt: "زراعة النباتات والزهور",
  },
  {
    src: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=300&fit=crop",
    alt: "أنظمة الري الحديثة",
  },
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    alt: "صيانة الحدائق",
  },
];

const relatedProjects = [
  {
    title: "حديقة فيلا فاخرة",
    description:
      "تصميم وتنفيذ حديقة فيلا بمساحة كبيرة مع أشجار ونوافير ومسارات",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    category: "حدائق فلل",
    duration: "شهر",
    size: "500 متر مربع",
  },
  {
    title: "حديقة منزلية صغيرة",
    description: "تنسيق حديقة منزلية صغيرة بنباتات متنوعة ونظام ري أوتوماتيكي",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop",
    category: "حدائق منزلية",
    duration: "أسبوعين",
    size: "100 متر مربع",
  },
  {
    title: "حديقة مجمع سكني",
    description: "تصميم وتنفيذ حديقة مجمع سكني بمساحات خضراء ومناطق جلوس",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    category: "حدائق عامة",
    duration: "شهرين",
    size: "1000 متر مربع",
  },
];

const faqItems = [
  {
    question: "كم تكلفة تنسيق حديقة منزلية؟",
    answer:
      "تختلف التكلفة حسب حجم الحديقة ونوع النباتات والتصميم، لكن نقدم عروض أسعار مجانية ومفصلة بعد المعاينة.",
  },
  {
    question: "هل تقدمون خدمة صيانة دورية؟",
    answer:
      "نعم، نوفر خدمة صيانة دورية شهرية أو حسب الطلب تشمل التقليم والتسميد والري والرش.",
  },
  {
    question: "ما هي مدة تنفيذ مشروع الحديقة؟",
    answer:
      "تختلف المدة حسب حجم المشروع، لكن عادة حديقة منزلية متوسطة تستغرق من 1-2 أسبوع.",
  },
  {
    question: "هل توفرون النجيل الصناعي والطبيعي؟",
    answer:
      "نعم، نوفر جميع أنواع النجيل الطبيعي والصناعي بجودات مختلفة لتناسب جميع الميزانيات.",
  },
  {
    question: "هل يمكن تركيب نظام ري أوتوماتيكي؟",
    answer:
      "نعم، نقوم بتركيب أنظمة ري أوتوماتيكية حديثة مع مؤقتات ذكية لتوفير المياه وسهولة الاستخدام.",
  },
];

const whyChooseUs = [
  {
    icon: <Shield className="h-12 w-12 text-green-600" />,
    title: "خبرة واسعة",
    description: "سنوات من الخبرة في تصميم وتنسيق الحدائق",
  },
  {
    icon: <Clock className="h-12 w-12 text-green-600" />,
    title: "التزام بالمواعيد",
    description: "نلتزم بتسليم المشاريع في الوقت المحدد",
  },
  {
    icon: <Users className="h-12 w-12 text-green-600" />,
    title: "فريق محترف",
    description: "مهندسون زراعيون وفنيون متخصصون",
  },
  {
    icon: <Award className="h-12 w-12 text-green-600" />,
    title: "أفضل النباتات",
    description: "نستخدم أجود أنواع النباتات والمواد",
  },
];

const workSteps = [
  {
    step: "1",
    title: "المعاينة والتصميم",
    description: "زيارة الموقع وأخذ المقاسات وتقديم التصميم المناسب",
  },
  {
    step: "2",
    title: "التخطيط والموافقة",
    description: "إعداد المخطط النهائي والحصول على موافقتكم",
  },
  {
    step: "3",
    title: "التنفيذ والزراعة",
    description: "بدء التنفيذ وزراعة النباتات وتركيب الري",
  },
  {
    step: "4",
    title: "التسليم والصيانة",
    description: "تسليم الحديقة مع خدمات الصيانة الدورية",
  },
];

export default function LandscapingServicePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <TreePine className="ml-3 h-8 w-8 text-green-600" />
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  خدمات تنسيق الحدائق المتخصصة
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                تصميم وتنسيق الحدائق
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                نقدم خدمات تصميم وتنسيق الحدائق بأفكار عصرية وإبداعية. فريق من
                المهندسين الزراعيين والفنيين المتخصصين لتحويل مساحتكم الخارجية
                إلى واحة خضراء جميلة.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  <span>احجز تصميم مجاني</span>
                  <CheckCircle className="mr-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  طلب عرض سعر
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Img
                  src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&h=400&fit=crop"
                  alt="تنسيق الحدائق"
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
              لماذا تحتاج خدمات تنسيق الحدائق؟
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              الحديقة المنسقة بشكل جميل تضيف قيمة لمنزلكم وتوفر مساحة للاسترخاء
              والاستمتاع بالطبيعة. خدماتنا المتخصصة تضمن تصميم وتنفيذ حدائق
              عصرية تناسب ذوقكم مع صيانة دورية للحفاظ على جمالها.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <TreePine className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  تصاميم إبداعية
                </h3>
                <p className="text-sm text-gray-600">
                  تصاميم حدائق عصرية تناسب جميع المساحات
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Flower className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  نباتات متنوعة
                </h3>
                <p className="text-sm text-gray-600">
                  أجود أنواع النباتات والأشجار والزهور
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Droplets className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  أنظمة ري حديثة
                </h3>
                <p className="text-sm text-gray-600">
                  أنظمة ري أوتوماتيكية لتوفير الوقت والماء
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
              خدمات تنسيق الحدائق المتخصصة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نقدم حلول شاملة لتصميم وتنفيذ وصيانة الحدائق بكافة أنواعها
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {landscapingServices.map((service, index) => (
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
              صور من مشاريع تنسيق الحدائق التي نفذناها لعملائنا الكرام
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
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نتميز بالإبداع والخبرة في تصميم وتنسيق الحدائق
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
              عملية منظمة من التصميم إلى التنفيذ والصيانة
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
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
              اطلعوا على بعض من مشاريع تنسيق الحدائق التي نفذناها بنجاح
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
              إجابات على أكثر الأسئلة شيوعاً حول تنسيق الحدائق
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
      <section className="bg-green-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            حوّل مساحتك إلى حديقة خضراء جميلة
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            احصل على تصميم مجاني وعرض سعر مفصل لحديقتك
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
