import React from "react";
import {
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Sparkles,
  Users,
  ChevronDown,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Img } from "../../../components/Image";
import { SubServiceCard } from "../../../components/SubServiceCard";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Card, CardContent } from "@/components/ui/Card";
import ServiceJsonLd from "@/app/_components/ServiceJsonLd";

export default function CleaningPage() {
  const galleryImages = [
    { image: "/images/gallery/gallery-1.jpeg" },
    { image: "/images/gallery/gallery-2.jpeg" },
    { image: "/images/gallery/gallery-3.jpeg" },
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "مؤمنون ومرخصون",
      description: "شركة مرخصة رسمياً ومؤمنة ضد جميع المخاطر لضمان راحة بالكم",
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "دقة في المواعيد",
      description: "نلتزم بالمواعيد المحددة وننجز العمل في الوقت المطلوب",
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "فريق محترف",
      description: "فريق مدرب ومتخصص في جميع أنواع أعمال التنظيف",
    },
    {
      icon: <Award className="h-12 w-12 text-blue-600" />,
      title: "ضمان الجودة",
      description: "ضمان 100% على رضاكم مع إمكانية إعادة التنظيف مجاناً",
    },
  ];

  const workSteps = [
    {
      step: "1",
      title: "الحجز والتقييم",
      description:
        "احجزوا موعد وسنقوم بتقييم المساحة وتحديد نوع التنظيف المطلوب",
    },
    {
      step: "2",
      title: "التحضير والوصول",
      description: "نصل في الموعد المحدد مع جميع المعدات والمواد اللازمة",
    },
    {
      step: "3",
      title: "التنظيف المتخصص",
      description: "ننفذ عملية التنظيف بطريقة منهجية ومهنية عالية",
    },
    {
      step: "4",
      title: "المراجعة والتسليم",
      description: "مراجعة شاملة للعمل والتأكد من رضاكم التام قبل المغادرة",
    },
  ];

  const relatedProjects = [
    {
      id: "1",
      title: "تنظيف شامل لفيلا سكنية",
      description: "تنظيف شامل لفيلا من 3 طوابق مع التعقيم الكامل",
      image: "/images/related-works/project-1.jpeg",
      category: "تنظيف سكني",
      location: "الرياض",
      date: "ديسمبر 2024",
    },
    {
      id: "2",
      title: "تنظيف مكاتب إدارية",
      description: "تنظيف يومي لمجمع مكاتب إدارية كبير",
      image: "/images/related-works/project-1.jpeg",
      category: "تنظيف تجاري",
      location: "جدة",
      date: "نوفمبر 2024",
    },
    {
      id: "3",
      title: "تنظيف ما بعد البناء",
      description: "تنظيف شامل لمبنى جديد بعد انتهاء أعمال البناء",
      image: "/images/related-works/project-1.jpeg",
      category: "تنظيف ما بعد البناء",
      location: "الدمام",
      date: "أكتوبر 2024",
    },
  ];

  const faqItems = [
    {
      question: "كم يستغرق تنظيف المنزل عادة؟",
      answer:
        "يختلف الوقت حسب مساحة المنزل ونوع التنظيف المطلوب. في المتوسط، تستغرق عملية التنظيف الشامل للمنزل العادي من 3-6 ساعات، بينما الفلل الكبيرة قد تحتاج إلى يوم كامل أو أكثر.",
    },
    {
      question: "هل تستخدمون مواد تنظيف آمنة؟",
      answer:
        "نعم، نحن نستخدم فقط المنظفات الآمنة والمعتمدة عالمياً والتي لا تضر بالصحة أو البيئة. جميع المواد التي نستخدمها حاصلة على شهادات الجودة والأمان.",
    },
    {
      question: "هل تقدمون خدمة التنظيف بشكل دوري؟",
      answer:
        "نعم، نوفر خدمات التنظيف الدورية (يومية، أسبوعية، شهرية) مع عقود سنوية وأسعار مخفضة للعملاء الدائمين. يمكنكم اختيار الجدول الزمني المناسب لكم.",
    },
    {
      question: "ماذا لو لم أكن راضياً عن الخدمة؟",
      answer:
        "رضاكم هو أولويتنا، لذلك نقدم ضمان على جودة العمل. إذا لم تكونوا راضين تماماً، سنعيد تنظيف المكان مجاناً حتى تحصلوا على النتيجة المطلوبة.",
    },
    {
      question: "هل تغطون جميع مناطق المملكة؟",
      answer:
        "نعم، نقدم خدماتنا في جميع مناطق المملكة العربية السعودية. لدينا فروع في المدن الرئيسية ونصل إلى جميع المناطق حسب الطلب.",
    },
  ];

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

  const subServices = [
    {
      title: "تنظيف المنازل",
      subtitle:
        "أفضل شركة تنظيف منازل في المملكة – تنظيف شامل للفلل والشقق باستخدام أحدث المعدات ومواد آمنة 100% على الصحة.",
      features: [
        "تنظيف جميع الغرف والحمامات والمطابخ",
        "تلميع الأرضيات والنوافذ",
        "إزالة الغبار من جميع الأسطح",
        "تعقيم وتطهير شامل",
        "تنظيف الأثاث والمفروشات",
      ],
      image: "/images/services/cleaning.jpeg",
    },
    {
      title: "تنظيف السجاد",
      subtitle:
        "أفضل شركة تنظيف سجاد في المملكة – إزالة البقع العميقة والروائح الكريهة باستخدام أجهزة حديثة ومواد آمنة 100%.",
      features: [
        "إزالة البقع العميقة والعنيدة",
        "تنظيف بالبخار الساخن",
        "مواد تنظيف صديقة للبيئة",
        "إزالة الروائح الكريهة نهائياً",
        "تجفيف سريع وآمن",
      ],
      image: "/imagees/cleaning.jpeg",
    },
    {
      title: "تنظيف الكنب والمفروشات",
      subtitle:
        "أفضل شركة تنظيف كنب ومفروشات في المملكة – تنظيف عميق للأقمشة والجلود بأحدث التقنيات ومواد آمنة 100%.",
      features: [
        "تنظيف الكنب الجلد والقماش",
        "إزالة البقع والأوساخ العميقة",
        "تعقيم ضد البكتيريا والفيروسات",
        "حماية الألوان من البهتان",
        "تجفيف سريع دون تلف",
      ],
      image: "/images/services/cleaning.jpeg",
    },
    {
      title: "تنظيف وتعقيم الخزانات",
      subtitle:
        "أفضل شركة تنظيف خزانات في المملكة – تنظيف وتعقيم شامل للخزانات العلوية والأرضية بأحدث المعدات ومواد معتمدة.",
      features: [
        "تفريغ وتنظيف الخزان بالكامل",
        "إزالة الرواسب والطحالب",
        "تعقيم بمواد معتمدة صحياً",
        "فحص جودة المياه",
        "ضمان سلامة مياه الشرب",
      ],
      image: "/images/services/cleaning.jpeg",
    },
    {
      title: "تنظيف المكيفات",
      subtitle:
        "أفضل شركة تنظيف مكيفات في المملكة – تنظيف وصيانة شاملة لجميع أنواع المكيفات لضمان هواء نقي وأداء أمثل.",
      features: [
        "تنظيف الفلاتر والملفات",
        "إزالة الأتربة والشوائب",
        "تعقيم ضد البكتيريا والفطريات",
        "فحص غاز التبريد",
        "تحسين كفاءة التشغيل",
      ],
      image: "/images/services/cleaning.jpeg",
    },
    {
      title: "تنظيف الزجاج والنوافذ",
      subtitle:
        "أفضل شركة تنظيف زجاج ونوافذ في المملكة – تنظيف احترافي للزجاج والنوافذ لإطلالة واضحة ومشرقة على مدار السنة.",
      features: [
        "تنظيف الزجاج الداخلي والخارجي",
        "إزالة البقع والأوساخ العنيدة",
        "تلميع الإطارات والمقابض",
        "استخدام مواد متخصصة للزجاج",
        "نتائج خالية من الخطوط",
      ],
      image: "/images/services/cleaning.jpeg",
    },
  ];

  return (
    <div className="min-h-screen">
      <ServiceJsonLd
        name="خدمات التنظيف"
        description="نقدم خدمات تنظيف شاملة للمنازل والمكاتب والفلل بأعلى معايير الجودة والنظافة."
        image="/images/services/cleaning.webp"
        url="/services/cleaning"
      />
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <Sparkles className="ml-3 h-8 w-8 text-blue-600" />
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  خدمات التنظيف المتخصصة
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                خدمات التنظيف الاحترافية
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                نقدم خدمات تنظيف شاملة للمنازل والمكاتب والفلل بأعلى معايير
                الجودة والنظافة. فريق محترف ومدرب لضمان حصولكم على بيئة نظيفة
                وصحية.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex items-center bg-blue-600 hover:bg-blue-700"
                >
                  <span>احجز تنظيف</span>
                  <CheckCircle className="mr-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  عرض أسعار مجاني
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

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              لماذا تحتاج خدمات التنظيف المهنية؟
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              التنظيف المنتظم والمهني ضروري للحفاظ على بيئة صحية ونظيفة. خدماتنا
              المتخصصة تضمن إزالة الجراثيم والبكتيريا، وتحسين جودة ا��هواء، وخلق
              مساحة مريحة ومنعشة لكم ولعائلتكم. نستخدم أحدث التقنيات والمواد
              الآمنة لضمان نتائج مثالية.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">بيئة صحية</h3>
                <p className="text-sm text-gray-600">
                  إزالة الجراثيم والبكتيريا لبيئة آمنة
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  نظافة مثالية
                </h3>
                <p className="text-sm text-gray-600">
                  تنظيف عميق وشامل لجميع المساحات
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  توفير الوقت
                </h3>
                <p className="text-sm text-gray-600">
                  اتركوا التنظيف لنا واستمتعوا بوقتكم
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

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              خدماتنا المتخصصة في التنظيف
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              نقدم مجموعة شاملة من خدمات التنظيف المتخصصة لتلبية جميع احتياجاتكم
              بأعلى معايير الجودة والاحترافية
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

      <section className="py-16">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">معرض صور أعمالنا</h2>
            <p className="text-lg text-muted-foreground">
              شاهدوا نماذج من أعمالنا المتميزة في مجال التنظيف
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

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نتميز بالخبرة والمهنية في تقديم أفضل خدمات التنظيف
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">كيف نعمل؟</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              عملية بسيطة ومنظمة للحصول على خدمة تنظيف مثالية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              مشاريع مماثلة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              اطلعوا على بعض من مشاريع التنظيف التي نفذناها بنجاح
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              الأسئلة الشائعة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              إجابات على أكثر الأسئلة شيوعاً حول خدمات التنظيف
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

      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            احصل على تنظيف احترافي اليوم
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            تواصل معنا الآن لحجز موعد التنظيف أو للحصول على عرض أسعار مجاني
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
