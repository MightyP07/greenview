
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=2200&q=85",
  orchard:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85",
  cherries:
    "https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=1000&q=85",
  peaches:
    "https://images.unsplash.com/photo-1629828874514-c1e5103f0550?auto=format&fit=crop&w=1000&q=85",
  apples:
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1000&q=85",
  pears:
    "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=1000&q=85",
  plums:
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1000&q=85",
  apricots:
    "https://images.unsplash.com/photo-1595743825637-cdafc8ad4173?auto=format&fit=crop&w=1000&q=85",
  gallery1:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",
  gallery2:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=85",
  gallery3:
    "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=85",
  gallery4:
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85",
  closing:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85",
};

const FRUITS = [
  {
    id: "cherries",
    name: "Cherries",
    category: "summer",
    season: "Summer",
    image: IMAGES.cherries,
    description:
      "Bright, sweet, and unmistakably seasonal. Cherries are a favourite part of the summer fruit experience.",
    link: "/shop?category=fruit&subcategory=cherries",
  },
  {
    id: "peaches",
    name: "Peaches & Nectarines",
    category: "summer",
    season: "Summer",
    image: IMAGES.peaches,
    description:
      "Juicy stone fruit with beautiful colour and flavour, best enjoyed when the season is right.",
    link: "/shop?category=fruit&subcategory=stone-fruit",
  },
  {
    id: "apples",
    name: "Apples",
    category: "autumn",
    season: "Autumn",
    image: IMAGES.apples,
    description:
      "Crisp, versatile fruit to enjoy fresh or use in your favourite homemade recipes.",
    link: "/shop?category=fruit&subcategory=apples-pears",
  },
  {
    id: "pears",
    name: "Pears",
    category: "autumn",
    season: "Autumn",
    image: IMAGES.pears,
    description:
      "A classic orchard favourite, known for its delicate sweetness and soft texture when ripe.",
    link: "/shop?category=fruit&subcategory=apples-pears",
  },
  {
    id: "plums",
    name: "Plums",
    category: "summer",
    season: "Summer",
    image: IMAGES.plums,
    description:
      "Colourful stone fruit with a satisfying balance of sweetness and tang.",
    link: "/shop?category=fruit&subcategory=stone-fruit",
  },
  {
    id: "apricots",
    name: "Apricots",
    category: "summer",
    season: "Summer",
    image: IMAGES.apricots,
    description:
      "Golden stone fruit with a gentle fragrance and naturally rich flavour.",
    link: "/shop?category=fruit&subcategory=stone-fruit",
  },
];

const FILTERS = [
  { id: "all", label: "All Fruit" },
  { id: "summer", label: "Summer Fruit" },
  { id: "autumn", label: "Autumn Fruit" },
];

const FAQS = [
  {
    question: "When is the fruit stall open?",
    answer:
      "Opening hours have not yet been confirmed for this website. Please contact Greenview Orchard before planning your visit.",
  },
  {
    question: "Is every fruit available all year?",
    answer:
      "No. Fruit availability changes with the seasons, weather, and harvest conditions. Contact the orchard for current stock information.",
  },
  {
    question: "Can I order fruit online?",
    answer:
      "The online shop is being prepared. Product prices and ordering availability will be published once confirmed.",
  },
  {
    question: "Where is the fruit stall located?",
    answer:
      "The exact visitor address and directions will be published once confirmed by Greenview Orchard.",
  },
];

function Icon({ name, size = 20, className = "" }) {
  const paths = {
    arrow: (
      <>
        <path d="M4 12h16" />
        <path d="m13 5 7 7-7 7" />
      </>
    ),
    diagonal: (
      <>
        <path d="M5 19 19 5" />
        <path d="M9 5h10v10" />
      </>
    ),
    left: (
      <>
        <path d="M20 12H4" />
        <path d="m11 19-7-7 7-7" />
      </>
    ),
    right: (
      <>
        <path d="M4 12h16" />
        <path d="m13 5 7 7-7 7" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="M5 5 19 19M19 5 5 19" />,
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 15a5 5 0 0 0 5 5c8 0 11-6 10-16Z" />
        <path d="M4 21c3-7 7-10 13-13" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    map: (
      <>
        <path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    basket: (
      <>
        <path d="M3 10h18l-2 11H5L3 10Z" />
        <path d="m8 10 4-7 4 7M9 14v3M15 14v3" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </>
    ),
    camera: (
      <>
        <path d="M3 7h4l2-3h6l2 3h4v13H3V7Z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 38,
  className = "",
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reducedMotion ? 0 : 0.75,
        delay: reducedMotion ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${
        light ? "text-[#e5c18a]" : "text-[#b28b51]"
      }`}
    >
      {children}
    </p>
  );
}

function FruitStallHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[680px] items-center overflow-hidden bg-[#284831] sm:min-h-[780px] lg:min-h-[830px]">
      <motion.img
        src={IMAGES.hero}
        alt="Fresh seasonal produce at a market"
        initial={reducedMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.7,
          ease: EASE,
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#102519]/90 via-[#102519]/65 to-[#102519]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#102519]/50 via-transparent to-[#102519]/15" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-28 sm:px-10 lg:px-14">
        <Reveal>
          <div className="mb-14 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-white/65">
            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <span>/</span>
            <span className="text-[#e5c18a]">Fruit Stall</span>
          </div>

          <SectionLabel light>
            Fresh from the Orchard
          </SectionLabel>

          <h1 className="mt-7 max-w-[980px] font-serif text-[clamp(4rem,8vw,9rem)] leading-[0.99] tracking-[-0.06em] text-white">
            Nature's
            <br />
            <span className="italic text-[#e5c18a]">
              finest.
            </span>
          </h1>

          <p className="mt-9 max-w-[530px] text-[15px] leading-[2] text-white/80 sm:text-[17px]">
            Discover the colours, flavours, and changing
            seasons of orchard-grown fruit.
          </p>

          <div className="mt-11 flex flex-wrap gap-4">
            <a
              href="#fruit-collection"
              className="group inline-flex items-center gap-5 bg-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
            >
              Explore Our Fruit
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border border-white/55 px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#284831]"
            >
              Plan a Visit
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 right-6 hidden items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white/70 sm:flex sm:right-10 lg:right-14">
        <span className="h-px w-12 bg-white/60" />
        Scroll to Explore
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-14">
        <Reveal className="relative">
          <div className="relative aspect-[4/4.8] max-w-[570px] overflow-hidden bg-[#e7e9e0]">
            <motion.img
              src={IMAGES.orchard}
              alt="Scenic natural landscape"
              loading="lazy"
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1, ease: EASE }}
            />
          </div>

          <div className="absolute -bottom-7 -right-3 hidden h-44 w-44 items-center justify-center bg-[#284831] p-6 text-center sm:flex lg:-right-8">
            <div>
              <Icon
                name="basket"
                size={30}
                className="mx-auto mb-3 text-[#e5c18a]"
              />

              <p className="font-serif text-[20px] leading-snug text-white">
                Seasonal
                <br />
                goodness
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>The Fruit Stall</SectionLabel>

            <h2 className="mt-7 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.055em] text-[#284831]">
              Every season
              <br />
              <span className="italic">has a story.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 h-px w-16 bg-[#b28b51]" />

            <p className="mt-8 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              There's something special about enjoying
              fruit at its seasonal best. From the
              brightness of summer stone fruit to the
              familiar crunch of autumn apples, each
              harvest brings something different.
            </p>

            <p className="mt-5 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              Explore our fruit collection below and
              contact Greenview for current availability,
              stall opening hours, and visitor information.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              to="/shop?category=fruit"
              className="group mt-10 inline-flex items-center gap-5 border-b border-[#284831] pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
            >
              Browse Fresh Fruit

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FruitCard({ fruit, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: EASE,
      }}
      className="group"
    >
      <Link to={fruit.link} className="block">
        <div className="relative aspect-[3/3.65] overflow-hidden bg-[#e6e9e0]">
          <motion.img
            src={fruit.image}
            alt={fruit.name}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.85, ease: EASE }}
          />

          <span className="absolute left-4 top-4 bg-[#faf9f5] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#284831]">
            {fruit.season}
          </span>

          <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center bg-white text-[#284831] transition-colors group-hover:bg-[#e5c18a]">
            <Icon name="diagonal" size={19} />
          </span>
        </div>

        <div className="pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b28b51]">
            Seasonal Fruit
          </p>

          <h3 className="mt-3 font-serif text-[clamp(1.7rem,2.6vw,2.3rem)] leading-tight text-[#284831] transition-colors group-hover:text-[#b28b51]">
            {fruit.name}
          </h3>

          <p className="mt-4 text-[13px] leading-[1.9] text-[#7c897a]">
            {fruit.description}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

function FruitCollection() {
  const [filter, setFilter] = useState("all");

  const visibleFruits = useMemo(() => {
    if (filter === "all") return FRUITS;

    return FRUITS.filter(
      (fruit) => fruit.category === filter
    );
  }, [filter]);

  return (
    <section
      id="fruit-collection"
      className="scroll-mt-24 bg-[#f0f2eb] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>Seasonal Favourites</SectionLabel>

            <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.6rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
              Fruit worth
              <br />
              <span className="italic">waiting for.</span>
            </h2>
          </div>

          <p className="max-w-[390px] text-[14px] leading-[1.95] text-[#788575]">
            Discover familiar orchard favourites.
            Harvest dates and availability vary
            throughout the year.
          </p>
        </Reveal>

        <Reveal>
          <div className="mb-12 flex flex-wrap gap-2 border-b border-[#d9e0d5] pb-5">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={`relative px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors ${
                  filter === item.id
                    ? "bg-[#284831] text-white"
                    : "text-[#7b8978] hover:bg-[#e3e8df] hover:text-[#284831]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleFruits.map((fruit, index) => (
              <FruitCard
                key={fruit.id}
                fruit={fruit}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-[#d9e0d5] pt-9 sm:flex-row sm:items-center">
            <p className="max-w-[560px] text-[12px] leading-[1.9] text-[#7b8879]">
              These are illustrative seasonal fruit
              categories. Greenview's confirmed produce
              range and current stock will be updated
              when available.
            </p>

            <Link
              to="/shop?category=fruit"
              className="group inline-flex shrink-0 items-center gap-4 border-b border-[#284831] pb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#284831]"
            >
              Visit the Shop

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StallExperience() {
  const experiences = [
    {
      number: "01",
      icon: "basket",
      title: "Seasonal Produce",
      description:
        "Explore a changing selection of orchard fruit, with availability guided by the harvest.",
    },
    {
      number: "02",
      icon: "sun",
      title: "A Taste of the Season",
      description:
        "Discover the fruits and flavours that make each part of the growing year different.",
    },
    {
      number: "03",
      icon: "map",
      title: "Plan Your Visit",
      description:
        "Contact Greenview for opening hours, directions, and visitor arrangements before travelling.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 text-center">
          <SectionLabel>The Experience</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
            A little closer
            <br />
            <span className="italic">to nature.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {experiences.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.12}>
              <div className="h-full border border-[#e0e5db] px-8 py-10 transition-colors hover:bg-[#f0f2eb] sm:px-9 sm:py-12">
                <div className="mb-12 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center bg-[#edf0e9] text-[#284831]">
                    <Icon name={item.icon} size={27} />
                  </div>

                  <span className="text-[11px] tracking-[0.2em] text-[#b28b51]">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-serif text-[29px] text-[#284831]">
                  {item.title}
                </h3>

                <p className="mt-5 text-[14px] leading-[1.95] text-[#7b887a]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const images = [
    { src: IMAGES.gallery1, alt: "Fresh produce display" },
    { src: IMAGES.gallery2, alt: "Assorted seasonal fruit" },
    { src: IMAGES.gallery3, alt: "Rural farm landscape" },
    { src: IMAGES.gallery4, alt: "Flowers in natural surroundings" },
  ];

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);

      if (event.key === "ArrowRight") {
        setActiveImage(
          (current) => (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage(
          (current) =>
            (current - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <section className="bg-[#284831] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <SectionLabel light>
              A Glimpse of the Season
            </SectionLabel>

            <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.1] tracking-[-0.05em] text-white">
              From the
              <br />
              <span className="italic text-[#e5c18a]">
                orchard.
              </span>
            </h2>
          </div>

          <p className="max-w-[360px] text-[13px] leading-[1.9] text-white/60">
            A visual introduction to seasonal produce
            and the countryside. Images are illustrative.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.09}>
              <button
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Open gallery image ${index + 1}`}
                className="group relative block aspect-[3/4] w-full overflow-hidden bg-[#395b41]"
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.09 }}
                  transition={{
                    duration: 0.85,
                    ease: EASE,
                  }}
                />

                <div className="absolute inset-0 bg-[#102519]/0 transition-colors group-hover:bg-[#102519]/25" />

                <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center bg-white text-[#284831] opacity-0 transition-opacity group-hover:opacity-100">
                  <Icon name="diagonal" size={18} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Fruit stall image gallery"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b1910]/95 px-5 py-16 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white hover:text-[#284831] sm:right-10 sm:top-9"
            >
              <Icon name="close" size={23} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={images[activeImage].src}
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="max-h-[78vh] max-w-full object-contain"
              />
            </AnimatePresence>

            <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-7 text-white">
              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (current) =>
                      (current - 1 + images.length) %
                      images.length
                  )
                }
                aria-label="Previous image"
                className="p-3"
              >
                <Icon name="left" size={22} />
              </button>

              <span className="text-xs tracking-[0.15em]">
                {activeImage + 1} / {images.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (current) =>
                      (current + 1) % images.length
                  )
                }
                aria-label="Next image"
                className="p-3"
              >
                <Icon name="right" size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VisitorInfo() {
  const details = [
    {
      icon: "clock",
      label: "Opening Hours",
      value: "To be confirmed",
      description:
        "Please check with Greenview before visiting.",
    },
    {
      icon: "map",
      label: "Location",
      value: "Address to be confirmed",
      description:
        "Visitor directions will be published here.",
    },
    {
      icon: "basket",
      label: "Fruit Availability",
      value: "Seasonal",
      description:
        "Harvest timing and stock vary throughout the year.",
    },
  ];

  return (
    <section className="bg-[#f0f2eb] py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 text-center">
          <SectionLabel>Before You Visit</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
            Plan your
            <span className="italic"> visit.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal key={detail.label} delay={index * 0.1}>
              <div className="h-full bg-[#faf9f5] px-8 py-10 text-center sm:px-9 sm:py-12">
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf0e9] text-[#284831]">
                  <Icon name={detail.icon} size={28} />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b28b51]">
                  {detail.label}
                </p>

                <h3 className="mt-4 font-serif text-[25px] text-[#284831]">
                  {detail.value}
                </h3>

                <p className="mt-4 text-[13px] leading-[1.85] text-[#839080]">
                  {detail.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-5 bg-[#284831] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
          >
            Contact the Orchard

            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={19} />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 sm:py-32 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14">
        <Reveal>
          <SectionLabel>Good to Know</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,4.7vw,5rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
            A few things
            <br />
            <span className="italic">to know.</span>
          </h2>

          <p className="mt-7 max-w-[350px] text-[14px] leading-[1.95] text-[#7b8879]">
            Answers to common questions about fruit,
            seasonal availability, and visiting.
          </p>
        </Reveal>

        <div>
          {FAQS.map((faq, index) => {
            const open = openIndex === index;

            return (
              <Reveal key={faq.question} delay={index * 0.06}>
                <div className="border-b border-[#e0e5dc]">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(open ? -1 : index)
                    }
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-serif text-[19px] leading-snug text-[#284831] sm:text-[23px]">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors ${
                        open
                          ? "bg-[#284831] text-white"
                          : "bg-[#edf0e9] text-[#284831]"
                      }`}
                    >
                      <Icon
                        name={open ? "minus" : "plus"}
                        size={18}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: EASE,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[570px] pb-8 pr-10 text-[14px] leading-[2] text-[#7b8879]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-[#284831] px-6 py-28 text-center sm:py-36">
      <img
        src={IMAGES.closing}
        alt="Green countryside landscape"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[#102519]/80" />

      <div className="relative z-10 mx-auto max-w-[900px]">
        <Reveal>
          <SectionLabel light>
            Explore the Orchard
          </SectionLabel>

          <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[1.08] tracking-[-0.055em] text-white">
            Good things
            <br />
            <span className="italic text-[#e5c18a]">
              grow here.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[500px] text-[15px] leading-[1.95] text-white/75">
            Discover seasonal fruit and explore
            more of what Greenview Orchard has to offer.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop?category=fruit"
              className="group inline-flex items-center gap-6 bg-[#e5c18a] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
            >
              Shop Fresh Fruit

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border border-white/50 px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#284831]"
            >
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function FruitStall() {
  useEffect(() => {
    document.title = "Fruit Stall | Greenview Orchard";

    return () => {
      document.title = "Greenview Orchard";
    };
  }, []);

  return (
    <div className="overflow-x-clip bg-[#faf9f5]">
      <FruitStallHero />

      <IntroSection />

      <FruitCollection />

      <StallExperience />

      <GallerySection />

      <VisitorInfo />

      <FAQSection />

      <ClosingCTA />
    </div>
  );
}
