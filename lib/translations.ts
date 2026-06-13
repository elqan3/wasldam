export type Locale = "ar" | "en";

export const translations = {
  ar: {
    nav: {
      home: "الرئيسية",
      donate: "تبرع بالدم",
      findDonor: "ابحث عن متبرع",
      about: "عن المنصة",
    },
    hero: {
      headline: "تبرعك قد ينقذ حياة إنسان",
      subheadline:
        "وصل دم يربط المتبرعين بالمحتاجين في وقت الحاجة. منصة مجانية، سريعة، وموثوقة لخدمة المجتمع.",
      ctaRegister: "سجل كمتبرع",
      ctaSearch: "ابحث عن متبرع",
      imageAlt: "متطوعون يساهمون في التبرع بالدم",
    },
    trust: {
      title: "لماذا وصل دم؟",
      subtitle: "منصة مصممة لخدمة المجتمع بثقة وسرعة",
      cards: [
        {
          title: "سرعة الوصول للمتبرعين",
          description:
            "ابحث عن متبرعين متاحين في مدينتك خلال ثوانٍ، عندما يكون الوقت حاسماً.",
        },
        {
          title: "سهولة الاستخدام",
          description:
            "واجهة بسيطة وواضحة تمكّن أي شخص من التسجيل أو البحث دون تعقيد.",
        },
        {
          title: "خدمة مجانية للمجتمع",
          description:
            "منصة مجانية بالكامل، مخصصة لخدمة المجتمع وإنقاذ الأرواح دون أي رسوم.",
        },
      ],
    },
    howItWorks: {
      title: "كيف تعمل المنصة؟",
      subtitle: "ثلاث خطوات بسيطة للوصول إلى المتبرع المناسب",
      steps: [
        {
          title: "سجل كمتبرع",
          description:
            "أنشئ حسابك وأضف فصيلة دمك ومدينتك لتكون جزءاً من شبكة المنقذين.",
        },
        {
          title: "ابحث أو اطلب متبرع",
          description:
            "ابحث عن متبرعين حسب المدينة وفصيلة الدم، أو اطلب المساعدة عند الحاجة.",
        },
        {
          title: "تواصل مباشرة",
          description:
            "تواصل مع المتبرع مباشرة لتنسيق التبرع بسرعة وأمان.",
        },
      ],
    },
    
    impact: {
      title: "أثرنا في المجتمع",
      subtitle: "أرقام تعكس التزامنا بخدمة المحتاجين",
      stats: [
        { value: "1,200+", label: "عدد المتبرعين" },
        { value: "25+", label: "عدد المدن" },
        { value: "3,500+", label: "عدد عمليات البحث" },
        
      ],
    },
    cta: {
      title: "كن جزءاً من شبكة المنقذين",
      subtitle:
        "سجّل كمتبرع اليوم وساهم في إنقاذ حياة. تبرع واحد قد يغيّر مصير عائلة بأكملها.",
      button: "سجل كمتبرع الآن",
    },
    footer: {
      mission:
        "وصل دم — منصة مجتمعية تربط المتبرعين بالمحتاجين لإنقاذ الأرواح في وقت الحاجة.",
      copyright: "© 2026 وصل دم. جميع الحقوق محفوظة.",
      links: {
        home: "الرئيسية",
        register: "التسجيل",
        search: "البحث",
        about: "عن المنصة",
      },
    },
    brand: {
      name: "وصل دم",
      tagline: "WaslDam",
    },
  },
  en: {
    nav: {
      home: "Home",
      donate: "Donate Blood",
      findDonor: "Find Donor",
      about: "About",
    },
    hero: {
      headline: "Your donation could save a life",
      subheadline:
        "WaslDam connects donors with those in need when every minute counts. A free, fast, and trusted platform for the community.",
      ctaRegister: "Register as Donor",
      ctaSearch: "Find a Donor",
      imageAlt: "Volunteers contributing to blood donation",
    },
    trust: {
      title: "Why WaslDam?",
      subtitle: "A platform built for community trust and speed",
      cards: [
        {
          title: "Fast Donor Access",
          description:
            "Find available donors in your city within seconds when time is critical.",
        },
        {
          title: "Easy to Use",
          description:
            "A simple, clear interface that lets anyone register or search without hassle.",
        },
        {
          title: "Free for the Community",
          description:
            "Completely free — dedicated to serving the community and saving lives at no cost.",
        },
      ],
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Three simple steps to reach the right donor",
      steps: [
        {
          title: "Register as a Donor",
          description:
            "Create your account and add your blood type and city to join the network of lifesavers.",
        },
        {
          title: "Search or Request a Donor",
          description:
            "Search for donors by city and blood type, or request help when you need it.",
        },
        {
          title: "Connect Directly",
          description:
            "Reach out to the donor directly to coordinate donation quickly and safely.",
        },
      ],
    },
    impact: {
      title: "Our Community Impact",
      subtitle: "Numbers that reflect our commitment to those in need",
      stats: [
        { value: "1,200+", label: "Registered Donors" },
        { value: "25+", label: "Cities Covered" },
        { value: "3,500+", label: "Searches Completed" },
      ],
    },
    cta: {
      title: "Join the Network of Lifesavers",
      subtitle:
        "Register as a donor today and help save a life. One donation can change an entire family's fate.",
      button: "Register as Donor Now",
    },
    footer: {
      mission:
        "WaslDam — a community platform connecting donors with those in need to save lives when it matters most.",
      copyright: "© 2026 WaslDam. All rights reserved.",
      links: {
        home: "Home",
        register: "Register",
        search: "Search",
        about: "About",
      },
    },
    brand: {
      name: "WaslDam",
      tagline: "وصل دم",
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];
