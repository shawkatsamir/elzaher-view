import { Img } from "@/components/Image";
import { ImageCarousel } from "@/components/ImageCarousel";
import { SubServiceCard } from "@/components/SubServiceCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Award,
  CheckCircle,
  ChevronDown,
  Clock,
  Droplets,
  Home,
  Layers,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Subtitles,
  Sun,
  Thermometer,
  Users,
} from "lucide-react";
import ServiceJsonLd from "@/app/_components/ServiceJsonLd";

const insulationTypes = [
  {
    name: "العزل الحراري",
    description: "يقلل انتقال الحرارة ويوفر في الطاقة",
    benefits: [
      "توفير 40% من فاتورة الكهرباء",
      "راحة حرارية أفضل",
      "حماية من الحرارة الخارجية",
    ],
  },
  {
    name: "العزل المائي",
    description: "يمنع تسريب المياه والرطوبة تماماً",
    benefits: [
      "منع تسريبات المياه",
      "حماية الهيكل الإنشائي",
      "منع نمو العفن والفطريات",
    ],
  },
  {
    name: "العزل الصوتي",
    description: "يقلل الضوضاء ويوفر بيئة هادئة",
    benefits: [
      "تقليل الضوضاء الخارجية",
      "خصوصية صوتية أفضل",
      "بيئة مريحة للعمل والراحة",
    ],
  },
];

const insulationServices = [
  {
    title: "عزل الأسطح ",
    subtitle: "عزل أسطح المباني ضد الحرارة باستخدام أفضل المواد العازلة",
    features: [
      "عزل حراري فعال",
      "مقاوم للعوامل الجوية",
      "توفير في فاتورة الكهرباء",
      "ضمان 10 سنوات",
    ],
    image: "/images/insulation/surface-insulation.webp",
    icon: <Sun className="h-6 w-6" />,
  },

  {
    title: "عزل الخزانات",
    subtitle: "عزل خزانات المياه من الداخل والخارج للحفاظ على جودة المياه",
    features: [
      "عزل داخلي وخارجي",
      "مواد صحية آمنة",
      "منع التلوث",
      "حماية من التآكل",
    ],
    image: "/images/services/cleaning.jpeg",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "عزل المطابخ و الحمامات",
    subtitle: "عزل مائي شامل للحمامات والمطابخ لمنع تسريب المياه",
    features: [
      "عزل جدران وأرضيات",
      "حماية من الرطوبة",
      "مقاوم للمياه",
      "تطبيق احترافي",
    ],
    image: "/images/services/cleaning.jpeg",
    icon: <Home className="h-6 w-6" />,
  },
  {
    title: "عزل حمامات السباحة",
    subtitle: "عزل مائي شامل لحمامات السباحة لمنع تسريب المياه",
    features: [
      "عزل جدران وأرضيات",
      "حماية من الرطوبة",
      "مقاوم للمياه",
      "تطبيق احترافي",
    ],
    image: "/images/services/cleaning.jpeg",
    icon: <Subtitles className="h-6 w-6" />,
  },
  {
    title: "العزل المائي",
    subtitle: "حماية المباني من تسريبات المياه والرطوبة بتقنيات متطورة",
    features: [
      "منع تسريب المياه",
      "مقاوم للرطوبة",
      "حماية الهيكل الإنشائي",
      "مواد عالية الجودة",
    ],
    image: "/images/services/cleaning.jpeg",
    icon: <Droplets className="h-6 w-6" />,
  },
  {
    title: "العزل الحرارى",
    subtitle: "حماية من تسرب المياه و الحرارة باستخدام مواد معتمدة عالميا",
    features: [
      "ضمان تنفيذى يدوم لسنوات",
      "معاومة عالية للماء و الحرارة",
      "فحص دورى مجانى",
    ],
    image: "/images/services/cleaning.jpeg",
    icon: <Subtitles className="h-6 w-6" />,
  },
  {
    title: " الصيانة و اﻻصلاح",
    subtitle: "خدمات صيانة دولية و تصليح سريع ﻻي مشاكل بعد العزل",
    features: [
      "زيارات دورية مجانية",
      "تصليح فورى عند وجود تسرب",
      "فريق محترف و معدات حديثةٍ",
    ],
    image: "/images/services/cleaning.jpeg",
    icon: <Layers className="h-6 w-6" />,
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop",
    alt: "أعمال عزل الأسطح",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    alt: "العزل الحراري للمباني",
  },
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    alt: "عزل الخزانات",
  },
  {
    src: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=300&fit=crop",
    alt: "العزل الصوتي",
  },
];

const relatedProjects = [
  {
    title: "عزل سطح فيلا سكنية",
    description: "عزل حراري ومائي كامل لسطح فيلا بمساحة كبيرة مع ضمان 10 سنوات",
    image:
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop",
    category: "عزل أسطح",
    duration: "3 أيام",
    size: "300 متر مربع",
  },
  {
    title: "عزل خزانات مبنى سكني",
    description: "عزل خزانات المياه الأرضية والعلوية لمبنى سكني متعدد الطوابق",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    category: "عزل خزانات",
    duration: "يومين",
    size: "4 خزانات",
  },
  {
    title: "عزل حراري لمبنى تجاري",
    description: "عزل حراري شامل لجدران وأسقف مبنى تجاري لتوفير الطاقة",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    category: "عزل حراري",
    duration: "أسبوع",
    size: "1000 متر مربع",
  },
];

const faqItems = [
  {
    question: "ما هي مدة الضمان على أعمال العزل؟",
    answer:
      "نقدم ضمان شامل لمدة 10 سنوات على جميع أعمال العزل المائي والحراري، مع خدمة صيانة دورية مجانية.",
  },
  {
    question: "هل العزل يساعد في توفير فاتورة الكهرباء؟",
    answer:
      "نعم، العزل الحراري الجيد يمكن أن يوفر من 30-40% من استهلاك الطاقة للتبريد والتدفئة.",
  },
  {
    question: "كم تستغرق عملية العزل؟",
    answer:
      "تختلف المدة حسب حجم المشروع، لكن عادة يستغرق عزل سطح منزل متوسط من 2-3 أيام.",
  },
  {
    question: "هل المواد المستخدمة آمنة وصحية؟",
    answer:
      "نعم، نستخدم مواد عزل معتمدة دولياً وآمنة تماماً على الصحة والبيئة.",
  },
  {
    question: "هل يمكن عزل المبنى القديم؟",
    answer:
      "نعم، يمكن عزل المباني القديمة بعد معاينة الموقع وتقييم الحالة وتحديد الحلول المناسبة.",
  },
];

const whyChooseUs = [
  {
    icon: <Shield className="h-12 w-12 text-purple-600" />,
    title: "مواد عالية الجودة",
    description: "نستخدم أفضل مواد العزل المعتمدة دولياً",
  },
  {
    icon: <Clock className="h-12 w-12 text-purple-600" />,
    title: "تنفيذ سريع",
    description: "إنجاز الأعمال في الوقت المحدد دون تأخير",
  },
  {
    icon: <Users className="h-12 w-12 text-purple-600" />,
    title: "فنيون متخصصون",
    description: "فريق مدرب ومتخصص في أعمال العزل",
  },
  {
    icon: <Award className="h-12 w-12 text-purple-600" />,
    title: "ضمان 10 سنوات",
    description: "ضمان طويل المدى على جميع الأعمال",
  },
];

const workSteps = [
  {
    step: "1",
    title: "المعاينة والفحص",
    description: "زيارة الموقع لفحص المساحة وتحديد نوع العزل المناسب",
  },
  {
    step: "2",
    title: "التحضير والتجهيز",
    description: "تحضير السطح وتنظيفه وتجهيزه لعملية العزل",
  },
  {
    step: "3",
    title: "تطبيق العزل",
    description: "تطبيق مواد العزل بطريقة احترافية ومتقنة",
  },
  {
    step: "4",
    title: "الاختبار والضمان",
    description: "اختبار العزل والتأكد من الجودة مع تقديم الضمان",
  },
];
export default function InsulationPage() {
  return (
    <div className="min-h-screen">
      <ServiceJsonLd
        name="خدمات العزل الشاملة"
        description="نوفر خدمات العزل الحراري والمائي والصوتي باستخدام أجود المواد العازلة وأحدث التقنيات العالمية. فريقنا المتخصص لديه خبرة واسعة في جميع أنواع أعمال العزل مع ضمان طويل المدى."
        image="/images/services/cleaning.webp"
        url="/services/insulation"
      />
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center">
                <Shield className="ml-3 h-8 w-8 text-blue-600" />
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  خدمات العزل المتخصصة
                </Badge>
              </div>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                خدمات العزل الشاملة
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                نوفر خدمات العزل الحراري والمائي والصوتي باستخدام أجود المواد
                العازلة وأحدث التقنيات العالمية. فريقنا المتخصص لديه خبرة واسعة
                في جميع أنواع أعمال العزل مع ضمان طويل المدى.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="flex items-center">
                  <span>احجز كشف مجاني</span>
                  <CheckCircle className="mr-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  استشارة هندسية
                </Button>
              </div>
            </div>

            <div>
              <div className="h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Img
                  src="/images/services/cleaning.webp"
                  alt="خدمات التنظيف"
                  width={800}
                  height={400}
                  fill={false}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl bg-white p-4 shadow-lg">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 fill-current text-yellow-400" />
                  <span className="font-semibold">4.8/5</span>
                  <span className="text-sm text-gray-600">تقييم العملاء</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              لماذا تختار خدمات العزل المهنية
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              العزل الاحترافي ضروري لحماية المباني من العوامل الجوية وتوفير
              الطاقة بشكل كبير. خدماتنا المتخصصة تضمن استخدام أفضل المواد
              العازلة وأحدث التقنيات العالمية لنتائج دائمة وفعالة.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Thermometer className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  توفير الطاقة
                </h3>
                <p className="text-sm text-gray-600">
                  تقليل فواتير التكييف بنسبة تصل إلى 40%
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  حماية المبنى
                </h3>
                <p className="text-sm text-gray-600">
                  منع التسريبات وحماية الهيكل الإنشائي
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Layers className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">عزل متقدم</h3>
                <p className="text-sm text-gray-600">
                  تقنيات حديثة ومواد عالية الجودة
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
              أنواع العزل المتخصصة
            </h2>
            <p className="text-gray-600m mx-auto max-w-2xl text-lg">
              نقدم جميع أنواع العزل حسب احتياجاتكم ومتطلبات المبنى
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {insulationTypes.map((type, index) => (
              <Card
                key={index}
                className="transition-shadow duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Layers className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {type.name}
                  </h3>
                  <p className="mb-4 text-gray-600">{type.description}</p>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle className="ml-2 h-4 w-4 flex-shrink-0 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              خدمات العزل المتخصصة
            </h2>
            <p className="max-w-2xl text-lg text-gray-600">
              نقدم مجموعة شاملة من خدمات العزل التقدمة لجميع انواع المبانى
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insulationServices.map((service, index) => (
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
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              معرض أعمالنا
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              صور من أعمال العزل التي نفذناها لعملائنا الكرام
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
      <section className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              لماذا تختار خدماتنا؟
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نتميز بالخبرة والمواد عالية الجودة في تقديم خدمات العزل
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
              عملية منظمة ومهنية لتنفيذ أعمال العزل بأعلى جودة
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white">
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
              اطلعوا على بعض من مشاريع العزل التي نفذناها بنجاح
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              الأسئلة الشائعة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              إجابات على أكثر الأسئلة شيوعاً حول خدمات العزل
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
          <h2 className="mb-4 text-3xl font-bold">
            احصل على عزل احترافي اليوم
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            احجز معاينة مجانية واحصل على عرض سعر مفصل لخدمات العزل
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
