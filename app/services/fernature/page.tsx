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
} from "lucide-react";

const serviceAreas = [
  "الرياض",
  "جدة",
  "الدمام",
  "مكة المكرمة",
  "المدينة المنورة",
  "الطائف",
  "أبها",
  "تبوك",
  "بريدة",
  "خميس مشيط",
];

const galleryImages = [
  { image: "/images/gallery/gallery-1.jpeg" },
  { image: "/images/gallery/gallery-2.jpeg" },
  { image: "/images/gallery/gallery-3.jpeg" },
];

const relatedProjects = [
  {
    title: "نقل فيلا سكنية كاملة",
    description: "نقل جميع محتويات فيلا من 3 طوابق مع التغليف والتركيب",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    category: "نقل منازل",
    duration: "يومين",
    size: "فيلا كاملة",
  },
  {
    title: "نقل مكتب شركة",
    description: "نقل مكتب شركة بكامل معداته إلى مقر جديد في نفس المدينة",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    category: "نقل مكاتب",
    duration: "يوم واحد",
    size: "مكتب كامل",
  },
  {
    title: "نقل بين مدينتين",
    description: "نقل عفش منزل من الرياض إلى جدة مع التخزين المؤقت",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop",
    category: "نقل بين المدن",
    duration: "3 أيام",
    size: "منزل متوسط",
  },
];

const faqItems = [
  {
    question: "كم تكلفة نقل العفش؟",
    answer:
      "تختلف التكلفة حسب حجم العفش، المسافة، والخدمات المطلوبة. نقدم معاينة مجانية وعرض سعر مفصل قبل البدء.",
  },
  {
    question: "هل تقدمون خدمة التغليف؟",
    answer:
      "نعم، نوفر خدمة تغليف احترافية لجميع الأغراض باستخدام مواد تغليف عالية الجودة لضمان الحماية الكاملة.",
  },
  {
    question: "هل هناك تأمين على الممتلكات؟",
    answer:
      "نعم، جميع عمليات النقل لدينا مؤمنة بالكامل ضد التلف أو الفقدان لضمان راحة بالكم.",
  },
  {
    question: "كم يستغرق نقل منزل متوسط الحجم؟",
    answer:
      "عادة يستغرق نقل منزل متوسط من 4-8 ساعات حسب كمية الأثاث والمسافة بين الموقعين.",
  },
  {
    question: "هل يمكنكم النقل بين المدن؟",
    answer:
      "نعم، نوفر خدمات نقل العفش بين جميع مدن المملكة مع إمكانية التتبع والتأمين الكامل.",
  },
];

const whyChooseUs = [
  {
    icon: <Shield className="h-12 w-12 text-amber-600" />,
    title: "نقل مؤمن",
    description: "تأمين شامل على جميع الممتلكات المنقولة",
  },
  {
    icon: <Clock className="h-12 w-12 text-amber-600" />,
    title: "سرعة وكفاءة",
    description: "نلتزم بالمواعيد وننجز العمل بسرعة",
  },
  {
    icon: <Users className="h-12 w-12 text-amber-600" />,
    title: "فريق محترف",
    description: "عمال مدربون ومتخصصون في نقل الأثاث",
  },
  {
    icon: <Award className="h-12 w-12 text-amber-600" />,
    title: "أسعار منافسة",
    description: "أفضل الأسعار مع جودة عالية في الخدمة",
  },
];

const workSteps = [
  {
    step: "1",
    title: "المعاينة والتقييم",
    description: "زيارة مجانية لتقييم كمية العفش وتحديد السعر",
  },
  {
    step: "2",
    title: "التغليف والتجهيز",
    description: "تغليف احترافي لجميع الأغراض وتجهيزها للنقل",
  },
  {
    step: "3",
    title: "النقل والتحميل",
    description: "نقل آمن مع عناية فائقة بجميع الممتلكات",
  },
  {
    step: "4",
    title: "التفريغ والتركيب",
    description: "تفريغ الأغراض وتركيب الأثاث في المكان الجديد",
  },
];

export default function MovingServicePage() {
  const subServices = [
    {
      title: "نقل الأثاث المنزلي",
      description: "نقل الأثاث والعفش المنزلي بأمان تام ودقة عالية",
      features: ["تغليف احترافي", "نقل آمن", "فك وتركيب", "تأمين شامل"],
      price: "من 300 ريال",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      icon: <Home className="h-6 w-6" />,
    },
    {
      title: "نقل المكاتب",
      description: "خدمات نقل المكاتب والشركات مع الحفاظ على سرية الوثائق",
      features: [
        "نقل المعدات",
        "ترتيب المكاتب",
        "حماية البيانات",
        "جدولة مرنة",
      ],
      price: "من 500 ريال",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      icon: <Building className="h-6 w-6" />,
    },
    {
      title: "التغليف والتعبئة",
      description: "خدمات التغليف المتخصصة لحماية الأثاث أثناء النقل",
      features: [
        "مواد عالية الجودة",
        "تغليف متخصص",
        "حماية كاملة",
        "تعبئة منظمة",
      ],
      price: "من 100 ريال",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      icon: <Package className="h-6 w-6" />,
    },
    {
      title: "التخزين المؤقت",
      description: "خدمات التخزين الآمن للأثاث والعفش لفترات مختلفة",
      features: [
        "مخازن مؤمنة",
        "حماية من الرطوبة",
        "مراقبة دائمة",
        "مرونة في المدة",
      ],
      price: "من 50 ريال/يوم",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      icon: <Shield className="h-6 w-6" />,
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 to-purple-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <Truck className="ml-3 h-8 w-8 text-purple-600" />
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  خدمات النقل المتخصصة
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                خدمات نقل العفش والأثاث
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                نوفر خدمات نقل الأثاث والعفش بأمان تام مع فريق متخصص ومعدات
                حديثة. نضمن وصول ممتلكاتكم بحالة ممتازة مع التغليف المحترف
                والنقل الآمن.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex items-center bg-purple-600 hover:bg-purple-700"
                >
                  <span>احجز نقل</span>
                  <CheckCircle className="mr-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  تقدير التكلفة
                </Button>
              </div>
            </div>

            <div className="h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Img
                src="/images/services/cleaning.webp"
                alt="خدمات التنظيف"
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
              لماذا تحتاج خدمات النقل المهنية؟
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              النقل المهني للأثاث والعفش يضمن وصول ممتلكاتكم بحالة ممتازة دون
              خسائر أو أضرار. خدماتنا المتخصصة توفر التغليف الآمن والنقل
              الاحترافي مع فريق مدرب وخبرة واسعة في التعامل مع جميع أنواع
              الأثاث.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  تغليف احترافي
                </h3>
                <p className="text-sm text-gray-600">
                  حماية كاملة للأثاث والممتلكات
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">أمان مضمون</h3>
                <p className="text-sm text-gray-600">
                  تأمين شامل على جميع الممتلكات
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  سرعة التنفيذ
                </h3>
                <p className="text-sm text-gray-600">
                  التزام بالمواعيد المحددة
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-3 flex items-center space-x-2 space-x-reverse text-lg font-semibold">
                <MapPin className="h-5 w-5 text-primary" />
                <span>المناطق التي نخدمها</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area, index) => (
                  <Badge key={index} variant="outline">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              خدمات النقل المتخصصة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              حلول نقل شاملة لجميع احتياجاتكم من الأثاث والعفش
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {subServices.map((service, index) => (
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
              صور من عمليات النقل والتغليف التي نفذناها لعملائنا
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

      <section className="bg-amber-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نتميز بالأمان والسرعة في تقديم خدمات النقل
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
              عملية نقل منظمة ومهنية من البداية إلى النهاية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-600 text-xl font-bold text-white">
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
              اطلعوا على بعض من عمليات النقل التي نفذناها بنجاح
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
              إجابات على أكثر الأسئلة شيوعاً حول خدمات النقل
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
      <section className="bg-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">نقل آمن ومضمون لممتلكاتكم</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            تواصل معنا لحجز موعد النقل والحصول على تقدير مجاني
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
