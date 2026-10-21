
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85",
  story:
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85",
  landscape:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
  cherries:
    "https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=1100&q=85",
  apples:
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1100&q=85",
  fruit:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1100&q=85",
  countryside:
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=85",
  gallery1:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1100&q=85",
  gallery2:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85",
  gallery3:
    "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=1100&q=85",
  gallery4:
    "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1100&q=85",
};

const VALUES = [
  {
    number: "01",
    icon: "leaf",
    title: "Connected to Nature",
    description:
      "An orchard is shaped by its environment, its growing cycles, and the changing seasons.",
  },
  {
    number: "02",
    icon: "sun",
    title: "Seasonal Appreciation",
    description:
      "Every harvest brings different colours, flavours, and opportunities to enjoy fresh produce.",
  },
  {
    number: "03",
    icon: "heart",
    title: "Simple Pleasures",
    description:
      "Good fruit, fresh air, and time spent enjoying the countryside are experiences worth sharing.",
  },
];

const OFFERINGS = [
  {
    number: "01",
    title: "Fresh Fruit",
    category: "Seasonal Produce",
    description:
      "Explore orchard fruit and seasonal favourites, with availability changing throughout the year.",
    image: IMAGES.cherries,
    link: "/shop?category=fruit",
    linkText: "Explore Fresh Fruit",
  },
  {
    number: "02",
    title: "Wines & Fruit Ports",
    category: "Orchard Collection",
    description:
      "Discover the wine and fruit port collection. Alcohol products are restricted to adults aged 18 and over.",
    image: IMAGES.fruit,
    link: "/shop?category=wine",
    linkText: "Explore the Collection",
  },
  {
    number: "03",
    title: "Visit & Stay",
    category: "Orchard Experience",
    description:
      "Find out more about visiting Greenview and enquire about accommodation arrangements.",
    image: IMAGES.countryside,
    link: "/accommodation",
    linkText: "Explore Accommodation",
  },
];

const GALLERY = [
  {
    image: IMAGES.gallery1,
    alt: "Scenic natural landscape",
  },
  {
    image: IMAGES.gallery2,
    alt: "Fresh produce display",
  },
  {
    image: IMAGES.gallery3,
    alt: "Fresh pears",
  },
  {
    image: IMAGES.gallery4,
    alt: "Rural farm landscape",
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
    close: <path d="M5 5 19 19M19 5 5 19" />,
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 15a5 5 0 0 0 5 5c8 0 11-6 10-16Z" />
        <path d="M4 21c3-7 7-10 13-13" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    camera: (
      <>
        <path d="M3 7h4l2-3h6l2 3h4v13H3V7Z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    map: (
      <>
        <path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13Z" />
        <circle cx="12" cy="9" r="2.5" />
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
        duration: reducedMotion ? 0 : 0.8,
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

function AboutHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[680px] items-center overflow-hidden bg-[#284831] sm:min-h-[780px] lg:min-h-[830px]">
      <motion.img
        src={IMAGES.hero}
        alt="Beautiful countryside landscape"
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
            <span className="text-[#e5c18a]">About Us</span>
          </div>

          <SectionLabel light>
            Welcome to Greenview Orchard
          </SectionLabel>

          <h1 className="mt-7 max-w-[1050px] font-serif text-[clamp(4rem,8vw,9rem)] leading-[0.99] tracking-[-0.06em] text-white">
            Rooted in
            <br />
            <span className="italic text-[#e5c18a]">
              the seasons.
            </span>
          </h1>

          <p className="mt-9 max-w-[560px] text-[15px] leading-[2] text-white/80 sm:text-[17px]">
            Discover the orchard, explore seasonal
            produce, and get to know the experiences
            that make Greenview worth exploring.
          </p>

          <div className="mt-11 flex flex-wrap gap-4">
            <a
              href="#our-story"
              className="group inline-flex items-center gap-5 bg-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
            >
              Our Story

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border border-white/55 px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#284831]"
            >
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section
      id="our-story"
      className="scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-14">
        <Reveal className="relative">
          <div className="relative aspect-[4/4.8] max-w-[570px] overflow-hidden bg-[#e7e9e0]">
            <motion.img
              src={IMAGES.story}
              alt="Natural countryside scenery"
              loading="lazy"
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1, ease: EASE }}
            />
          </div>

          <div className="absolute -bottom-7 -right-3 hidden h-44 w-44 items-center justify-center bg-[#284831] p-6 text-center sm:flex lg:-right-8">
            <div>
              <Icon
                name="leaf"
                size={30}
                className="mx-auto mb-3 text-[#e5c18a]"
              />

              <p className="font-serif text-[20px] leading-snug text-white">
                Inspired by
                <br />
                nature
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>Our Orchard Story</SectionLabel>

            <h2 className="mt-7 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.055em] text-[#284831]">
              A place shaped
              <br />
              <span className="italic">by nature.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 h-px w-16 bg-[#b28b51]" />

            <p className="mt-8 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              Greenview Orchard brings together
              seasonal fruit, orchard-inspired
              products, and opportunities to
              discover more about the countryside.
            </p>

            <p className="mt-5 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              From fresh produce to wines and fruit
              ports, the collection reflects the
              changing character of the seasons.
              Visitors can also explore information
              about the fruit stall, accommodation,
              and seasonal employment.
            </p>

            <p className="mt-5 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              We're preparing a more detailed
              introduction to the people, history,
              and everyday life of Greenview Orchard.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              to="/fruit-stall"
              className="group mt-10 inline-flex items-center gap-5 border-b border-[#284831] pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
            >
              Explore the Fruit Stall

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

function StatementSection() {
  return (
    <section className="bg-[#284831] px-6 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1100px] text-center">
        <Reveal>
          <SectionLabel light>
            The Greenview Experience
          </SectionLabel>

          <h2 className="mt-9 font-serif text-[clamp(2.8rem,5.4vw,6rem)] leading-[1.18] tracking-[-0.05em] text-white">
            “There's beauty in the
            <span className="italic text-[#e5c18a]">
              {" "}simple things{" "}
            </span>
            that every season brings.”
          </h2>

          <div className="mx-auto mt-10 h-px w-16 bg-[#e5c18a]" />

          <p className="mt-7 text-[11px] uppercase tracking-[0.22em] text-white/55">
            Greenview Orchard
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 text-center">
          <SectionLabel>What Inspires Us</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
            Inspired by
            <br />
            <span className="italic">the orchard.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {VALUES.map((value, index) => (
            <Reveal key={value.number} delay={index * 0.12}>
              <div className="h-full border border-[#e0e5db] px-8 py-10 transition-colors hover:bg-[#f0f2eb] sm:px-9 sm:py-12">
                <div className="mb-12 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center bg-[#edf0e9] text-[#284831]">
                    <Icon name={value.icon} size={27} />
                  </div>

                  <span className="text-[11px] tracking-[0.2em] text-[#b28b51]">
                    {value.number}
                  </span>
                </div>

                <h3 className="font-serif text-[29px] text-[#284831]">
                  {value.title}
                </h3>

                <p className="mt-5 text-[14px] leading-[1.95] text-[#7b887a]">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandscapeSection() {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-[#284831] sm:min-h-[630px]">
      <motion.img
        src={IMAGES.landscape}
        alt="Open natural landscape"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        whileInView={{ scale: [1.08, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />

      <div className="absolute inset-0 bg-[#102519]/60" />

      <div className="relative mx-auto flex min-h-[480px] max-w-[1440px] items-center justify-center px-6 py-20 text-center sm:min-h-[630px]">
        <Reveal>
          <SectionLabel light>
            The Beauty of the Seasons
          </SectionLabel>

          <h2 className="mt-7 font-serif text-[clamp(3.3rem,6.5vw,7rem)] leading-[1.05] tracking-[-0.055em] text-white">
            Naturally
            <br />
            <span className="italic text-[#e5c18a]">
              different.
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

function OfferingsSection() {
  return (
    <section className="bg-[#f0f2eb] py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>Explore Greenview</SectionLabel>

            <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.6rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
              More to
              <br />
              <span className="italic">discover.</span>
            </h2>
          </div>

          <p className="max-w-[390px] text-[14px] leading-[1.95] text-[#788575]">
            Explore the collections, seasonal produce,
            and visitor information across Greenview.
          </p>
        </Reveal>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {OFFERINGS.map((offering, index) => (
            <Reveal key={offering.number} delay={index * 0.1}>
              <Link
                to={offering.link}
                className="group block h-full bg-[#faf9f5]"
              >
                <div className="relative aspect-[4/4.1] overflow-hidden bg-[#e3e8df]">
                  <motion.img
                    src={offering.image}
                    alt={offering.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{
                      duration: 0.9,
                      ease: EASE,
                    }}
                  />

                  <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center bg-white text-[#284831] transition-colors group-hover:bg-[#e5c18a]">
                    <Icon name="diagonal" size={19} />
                  </span>
                </div>

                <div className="px-7 pb-9 pt-8 sm:px-9 sm:pb-10">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.2em] text-[#b28b51]">
                      {offering.number}
                    </span>

                    <span className="text-[10px] uppercase tracking-[0.12em] text-[#98a397]">
                      {offering.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] leading-tight text-[#284831]">
                    {offering.title}
                  </h3>

                  <p className="mt-5 min-h-[100px] text-[14px] leading-[1.95] text-[#7b8879]">
                    {offering.description}
                  </p>

                  <div className="mt-7 border-t border-[#e0e5dc] pt-7">
                    <span className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#284831]">
                      {offering.linkText}

                      <span className="transition-transform group-hover:translate-x-1">
                        <Icon name="arrow" size={18} />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const reducedMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }

      if (event.key === "ArrowRight") {
        setActiveImage(
          (current) => (current + 1) % GALLERY.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage(
          (current) =>
            (current - 1 + GALLERY.length) % GALLERY.length
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
    <section className="py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>A Visual Journey</SectionLabel>

            <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
              A closer
              <br />
              <span className="italic">look.</span>
            </h2>
          </div>

          <p className="max-w-[360px] text-[13px] leading-[1.9] text-[#7b8879]">
            Illustrative photographs of fruit,
            landscapes, and countryside life.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {GALLERY.map((image, index) => (
            <Reveal key={image.image} delay={index * 0.09}>
              <button
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Open gallery image ${index + 1}`}
                className="group relative block aspect-[3/4] w-full overflow-hidden bg-[#e6e9e0]"
              >
                <motion.img
                  src={image.image}
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
                  <Icon name="camera" size={18} />
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
            aria-label="Orchard image gallery"
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
                key={GALLERY[activeImage].image}
                src={GALLERY[activeImage].image}
                alt={GALLERY[activeImage].alt}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  reducedMotion
                    ? undefined
                    : { opacity: 0, scale: 1.02 }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.35,
                  ease: EASE,
                }}
                className="max-h-[78vh] max-w-full object-contain"
              />
            </AnimatePresence>

            <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-7 text-white">
              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (current) =>
                      (current - 1 + GALLERY.length) %
                      GALLERY.length
                  )
                }
                aria-label="Previous image"
                className="p-3"
              >
                <Icon name="left" size={22} />
              </button>

              <span className="text-xs tracking-[0.15em]">
                {activeImage + 1} / {GALLERY.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (current) =>
                      (current + 1) % GALLERY.length
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

function ClosingCTA() {
  return (
    <section className="bg-[#284831] px-6 py-24 text-center sm:py-32">
      <Reveal>
        <SectionLabel light>
          Connect With Greenview
        </SectionLabel>

        <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[1.08] tracking-[-0.055em] text-white">
          We'd love to
          <br />
          <span className="italic text-[#e5c18a]">
            hear from you.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-[500px] text-[15px] leading-[1.95] text-white/70">
          Have a question about the orchard, our
          products, or planning a visit? Get in touch.
        </p>

        <Link
          to="/contact"
          className="group mt-10 inline-flex items-center gap-6 bg-[#e5c18a] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
        >
          Contact Greenview

          <span className="transition-transform group-hover:translate-x-1">
            <Icon name="arrow" size={19} />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}

export default function About() {
  useEffect(() => {
    document.title = "About Us | Greenview Orchard";

    return () => {
      document.title = "Greenview Orchard";
    };
  }, []);

  return (
    <div className="overflow-x-clip bg-[#faf9f5]">
      <AboutHero />

      <StorySection />

      <StatementSection />

      <ValuesSection />

      <LandscapeSection />

      <OfferingsSection />

      <GallerySection />

      <ClosingCTA />
    </div>
  );
}
