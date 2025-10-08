import { Img } from "@/components/Image";
import { SubServiceCard } from "@/components/SubServiceCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  CheckCircle,
  Droplets,
  Home,
  Layers,
  Shield,
  Star,
  Subtitles,
  Sun,
  Thermometer,
} from "lucide-react";

export default function InsulationPage() {
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
  return (
    <div className="min-h-screen">
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

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Img
                  src="/images/services/cleaning.jpeg"
                  alt="خدمات العزل"
                  className="h-[400px] w-full object-cover"
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
    </div>
  );
}
