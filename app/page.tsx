import React from "react";
import Link from "next/link";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ServiceCard } from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { WorkCard } from "@/components/WorkCard";
import {
  Award,
  Clock,
  Shield,
  Users,
  Sparkles,
  Wrench,
  Droplets,
  Trees,
  Building,
  Truck,
  MessageCircle,
  Phone,
} from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsappButton";
import { CallButton } from "@/components/ui/CallButton";

export default function HomePage() {
  const heroSlides = [
    {
      src: "/images/cleaning-1.jpeg",
      title: "شركة الزاهر فيو للخدمات المنزلية",
      subtitle:
        "نقدم لكم أفضل خدمات التنظيف والصيانة المنزلية بأعلى جودة وأفضل الأسعار في جميع أنحاء المملكة العربية السعودية",
    },
    {
      src: "/images/services/photo-1558618666-fcd25c85cd64.jpeg",
      title: "خدمات احترافية متميزة",
      subtitle:
        "فريق من الخبراء المتخصصين في جميع أنواع الخدمات المنزلية مع ضمان الجودة والسرعة في التنفيذ",
    },
    {
      src: "/images/services/photo-1581578731548-c64695cc6952.jpeg",
      title: "خدمة العملاء على مدار الساعة",
      subtitle:
        "نحن متاحون 24/7 لتلبية احتياجاتكم وحل جميع مشاكلكم المنزلية بسرعة وكفاءة عالية",
    },
  ];

  const services = [
    {
      title: "خدمات التنظيف",
      description:
        "تنظيف شامل للمنازل والمكاتب والفلل مع استخدام أحدث المعدات والمنظفات الآمنة",
      image: "/images/services/cleaning.jpeg",
      link: "/services/cleaning",
      icon: <Sparkles className="h-6 w-6" />,
      features: [
        "تنظيف المنازل والفلل",
        "تنظيف المكاتب والشركات",
        "تعقيم وتطهير شامل",
        "تنظيف السجاد والموكيت",
        "تنظيف الواجهات الزجاجية",
      ],
    },
    {
      title: "خدمات الصيانة المنزلية",
      description:
        "صيانة وإصلاح جميع الأجهزة المنزلية والكهربائية والتكييف بأيدي خبراء متخصصين",
      image: "/images/services/cleaning.jpeg",
      link: "/services/maintenance",
      icon: <Wrench className="h-6 w-6" />,
      features: [
        "صيانة أجهزة التكييف",
        "إصلاح الأجهزة الكهربائية",
        "صيانة شبكات الكهرباء",
        "إصلاح الأعطال الطارئة",
        "صيانة دورية شاملة",
      ],
    },
    {
      title: "خدمات التسليك وكشف التسريبات",
      description:
        "كشف وإصلاح تسريبات المياه وتسليك البالوعات بأحدث الأجهزة والتقنيات المتطورة",
      image: "/images/services/plumbing.jpeg",
      link: "/services/plumbing",
      icon: <Droplets className="h-6 w-6" />,
      features: [
        "كشف التسريبات بدون تكسير",
        "تسليك المجاري والبالوعات",
        "إصلاح أنابيب المياه",
        "تركيب التمديدات الصحية",
        "صيانة شبكات الصرف",
      ],
    },
    {
      title: "خدمات تنسيق الحدائق",
      description:
        "تصميم وتنسيق الحدائق وصيانة المساحات الخضراء بلمسة احترافية جميلة",
      image: "/images/services/gardening.jpeg",
      link: "/services/landscaping",
      icon: <Trees className="h-6 w-6" />,
      features: [
        "تصميم الحدائق والمناظر",
        "زراعة الأشجار والنباتات",
        "تركيب أنظمة الري",
        "قص وتهذيب الأشجار",
        "تركيب العشب الطبيعي والصناعي",
      ],
    },
    {
      title: "خدمات المقاولات",
      description:
        "مقاولات عامة للبناء والترميم والتشطيبات بأعلى معايير الجودة والإتقان",
      image: "/images/services/Contracting.jpeg",
      link: "/services/contracting",
      icon: <Building className="h-6 w-6" />,
      features: [
        "بناء المنازل والفلل",
        "ترميم وتجديد المباني",
        "أعمال التشطيبات الداخلية",
        "التصميم المعماري",
        "إدارة المشاريع الإنشائية",
      ],
    },
    {
      title: "خدمات نقل العفش والأثاث",
      description:
        "نقل الأثاث والعفش بأمان تام مع التغليف المتخصص وفريق محترف للنقل",
      image: "/images/services/cleaning.jpeg",
      link: "/services/fernature",
      icon: <Truck className="h-6 w-6" />,
      features: [
        "تغليف الأثاث المتخصص",
        "نقل آمن بدون خدوش",
        "فك وتركيب الأثاث",
        "تأمين شامل על البضائع",
        "نقل داخل وخارج المدينة",
      ],
    },
    {
      title: "خدمات العزل",
      description:
        "عزل الأسطح والخزانات والحمامات بأحدث التقنيات والمواد العازلة عالية الجودة",
      image: "/images/services/plumbing.jpeg",
      link: "/services/insulation",
      icon: <Shield className="h-6 w-6" />,
      features: [
        "عزل الأسطح المائي والحراري",
        "عزل الخزانات العلوية",
        "عزل الحمامات والمطابخ",
        "عزل الجدران الخارجية",
        "ضمان 10 سنوات על العزل",
      ],
    },
  ];

  const whyUsFeatures = [
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "مؤمنون ومرخصون",
      description:
        "نحن شركة مرخصة رسمياً ومؤمنة ضد جميع المخاطر لضمان راحة بالكم وحماية ممتلكاتكم",
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "سرعة في التنفيذ",
      description:
        "نلتزم بالمواعيد المحددة وننجز العمل في الوقت المطلوب دون تأخير مع الحفاظ על الجودة",
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "فريق متخصص",
      description:
        "فريق من الخبراء والفنيين المتخصصين مع سنوات من الخبرة في جميع أنواع الخدمات المنزلية",
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "ضمان الجودة",
      description:
        "نقدم ضمان شامل על جميع خدماتنا مع إمكانية المراجعة والتعديل حتى تحصلوا על النتيجة المطلوبة",
    },
  ];

  const recentWorks = [
    {
      id: "1",
      title: "تنظيف شامل لفيلا سكنية",
      description:
        "تنظيف شامل لفيلا من 3 طوابق مع التعقيم الكامل وتنظيف الحديقة",
      image: "/images/works1.jpeg",
      category: "تنظيف",
      location: "الرياض",
      date: "ديسمبر 2024",
      client: "عائلة السعد",
    },
    {
      id: "2",
      title: "صيانة نظام التكييف المركزي",
      description: "صيانة وإصلاح نظام التكييف المركزي في مجمع سكني كبير",
      image: "/images/works3.jpeg",
      category: "صيانة",
      location: "جدة",
      date: "نوفمبر 2024",
      client: "شركة العقارات المتطورة",
    },
    {
      id: "3",
      title: "تنسيق حديقة منزلية",
      description:
        "تصميم وتنسيق حديقة منزلية مع نظام ري أوتوماتيكي ومناظر طبيعية",
      image: "/images/works3.jpeg",
      category: "تنسيق حدائق",
      location: "الدمام",
      date: "أكتوبر 2024",
      client: "مؤسسة البناء الحديث",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative">
        <ImageCarousel
          slides={heroSlides}
          autoPlay={false}
          autoPlayInterval={6000}
          overlayContent={true}
          height="h-[70vh]"
        />
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              خدماتنا المتميزة
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              نقدم مجموعة شاملة من الخدمات المنزلية المتخصصة لتلبية جميع
              احتياجاتكم بأعلى مستويات الجودة والاحترافية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                link={service.link}
                icon={service.icon}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              لماذا تختار شركة الزاهر فيو؟
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              نتميز بالخبرة الواسعة و الجودة العالية فى تقديم الخدمات و الالتزام
              باعلي معايير الامان و المهنية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyUsFeatures.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center transition-shadow duration-300 hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="mb-3 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              أحدث أعمالنا
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              اطلعوا על بعض من أحدث المشاريع التي أنجزناها بنجاح ل��ملائنا
              الكرام
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentWorks.map((work) => (
              <WorkCard
                key={work.id}
                id={work.id}
                title={work.title}
                description={work.description}
                image={work.image}
                category={work.category}
                location={work.location}
                date={work.date}
                client={work.client}
              />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/works">مشاهدة جميع أعمالنا</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            هل تحتاج إلى خدماتنا؟
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            لا تتردد في التواصل معنا للحصول על استشارة مجانية وعرض أسعار فوري
            لجميع خدماتنا المتميزة
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
