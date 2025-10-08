import React from "react";
import {
  Award,
  CheckCircle,
  Clock,
  Home,
  MapPin,
  Shield,
  Sparkles,
  Users,
  ChevronDown,
} from "lucide-react";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Img } from "../../../components/Image";
import { SubServiceCard } from "../../../components/SubServiceCard";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Card, CardContent } from "@/components/ui/Card";
import { CallButton } from "@/components/ui/CallButton";
import { WhatsAppButton } from "@/components/ui/WhatsappButton";

export default function CleaningPage() {
  const keyFeatures = [
    {
      title: "تنظيف شامل ومتكامل",
      description:
        "نقوم بتنظيف جميع أجزاء المنزل من الأرضيات والجدران حتى الأسقف والنوافذ",
    },
    {
      title: "مواد تنظيف آمنة وصحية",
      description:
        "نستخدم أحدث المنظفات الآمنة على الصحة والبيئة والمعتمدة عالمياً",
    },
    {
      title: "فريق عمل محترف ومدرب",
      description: "فريق من الخبراء المدربين على أحدث تقنيات التنظيف والتعقيم",
    },
    {
      title: "أحدث المعدات والأجهزة",
      description: "نستخدم أحدث الأجهزة والمعدات المتطورة لضمان أفضل النتائج",
    },
    {
      title: "خدمة سريعة ومرنة",
      description:
        "نوفر خدمات التنظيف في أوقات مناسبة لكم مع إمكانية الحجز المسبق",
    },
    {
      title: "أسعار تنافسية وعادلة",
      description:
        "أسعار مدروسة ومناسبة لجميع الفئات مع باقات متنوعة تناسب احتياجاتكم",
    },
  ];

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
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-blue-600 ml-3" />
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  خدمات التنظيف المتخصصة
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                خدمات التنظيف الاحترافية
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                نقدم خدمات تنظيف شاملة للمنازل والمكاتب والفلل بأعلى معايير
                الجودة والنظافة. فريق محترف ومدرب لضمان حصولكم على بيئة نظيفة
                وصحية.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
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

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Img
                  src="/images/services/cleaning.jpeg"
                  alt="خدمات التنظيف"
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
              لماذا تحتاج خدمات التنظيف المهنية؟
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              التنظيف المنتظم والمهني ضروري للحفاظ على بيئة صحية ونظيفة. خدماتنا
              المتخصصة تضمن إزالة الجراثيم والبكتيريا، وتحسين جودة ا��هواء، وخلق
              مساحة مريحة ومنعشة لكم ولعائلتكم. نستخدم أحدث التقنيات والمواد
              الآمنة لضمان نتائج مثالية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">بيئة صحية</h3>
                <p className="text-gray-600 text-sm">
                  إزالة الجراثيم والبكتيريا لبيئة آمنة
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  نظافة مثالية
                </h3>
                <p className="text-gray-600 text-sm">
                  تنظيف عميق وشامل لجميع المساحات
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  توفير الوقت
                </h3>
                <p className="text-gray-600 text-sm">
                  اتركوا التنظيف لنا واستمتعوا بوقتكم
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2 space-x-reverse">
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

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              خدماتنا المتخصصة في التنظيف
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نقدم مجموعة شاملة من خدمات التنظيف المتخصصة لتلبية جميع احتياجاتكم
              بأعلى معايير الجودة والاحترافية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">معرض صور أعمالنا</h2>
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

      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نتميز بالخبرة والمهنية في تقديم أفضل خدمات التنظيف
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">كيف نعمل؟</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              عملية بسيطة ومنظمة للحصول على خدمة تنظيف مثالية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              مشاريع مماثلة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اطلعوا على بعض من مشاريع التنظيف التي نفذناها بنجاح
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((project, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  <Img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              إجابات على أكثر الأسئلة شيوعاً حول خدمات التنظيف
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50">
                      <h3 className="font-semibold text-lg">{item.question}</h3>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
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

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            احصل على تنظيف احترافي اليوم
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            تواصل معنا الآن لحجز موعد التنظيف أو للحصول على عرض أسعار مجاني
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
