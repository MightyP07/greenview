import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";

import heroImage from "../assets/hero.png";

const images = {
  hero: heroImage,
  orchard:
    "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1600&q=85",
  cherries:
    "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=85",
  fruitStall:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",
  vineyard:
    "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?auto=format&fit=crop&w=1200&q=85",
  accommodation:
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85",
  fruit:
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85",
  wine:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
  gift:
    "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85",
};

const offerings = [
  {
    number: "01",
    eyebrow: "From the Orchard",
    title: "Fresh Seasonal Fruit",
    description:
      "Discover the simple pleasure of fruit grown with care, selected at its best, and enjoyed in season.",
    image: images.cherries,
    link: "/shop?category=fruit",
    linkText: "Shop Fresh Fruit",
  },
  {
    number: "02",
    eyebrow: "A Taste of the Region",
    title: "Our Fruit Stall",
    description:
      "Explore a welcoming destination for fresh produce, local favourites, and delicious orchard-inspired treats.",
    image: images.fruitStall,
    link: "/fruit-stall",
    linkText: "Discover the Fruit Stall",
  },
  {
    number: "03",
    eyebrow: "Crafted with Character",
    title: "Wines & Fruit Ports",
    description:
      "Explore a collection inspired by the character of the land and the richness of its fruit.",
    image: images.vineyard,
    link: "/shop?category=wine",
    linkText: "Explore the Collection",
  },
  {
    number: "04",
    eyebrow: "Stay a Little Longer",
    title: "Orchard Accommodation",
    description:
      "Slow down, unwind, and enjoy a peaceful stay surrounded by the beauty of orchard country.",
    image: images.accommodation,
    link: "/accommodation",
    linkText: "Explore Accommodation",
  },
];

const featured = [
  {
    title: "Seasonal Fruit",
    category: "Fresh from the Orchard",
    image: images.fruit,
    link: "/shop?category=fruit",
  },
  {
    title: "Wines & Fruit Ports",
    category: "Orchard Collection",
    image: images.wine,
    link: "/shop?category=wine",
  },
  {
    title: "Gifts & Special Treats",
    category: "Thoughtfully Selected",
    image: images.gift,
    link: "/shop?category=gifts",
  },
];

const ease = [0.22, 1, 0.36, 1];

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 55,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.85,
        delay: reduceMotion ? 0 : delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}) {
  return (
    <div
      className={`${
        centered ? "mx-auto text-center" : ""
      } max-w-[720px]`}
    >
      <Reveal>
        <p
          className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] ${
            light ? "text-[#e5c18a]" : "text-[#b28b51]"
          }`}
        >
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className={`font-serif text-[clamp(2.6rem,5.5vw,5.7rem)] leading-[1.06] tracking-[-0.045em] ${
            light ? "text-white" : "text-[#284831]"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.18}>
          <p
            className={`mt-7 max-w-[590px] text-[15px] leading-[1.95] sm:text-base ${
              light ? "text-white/75" : "text-[#69746a]"
            } ${centered ? "mx-auto" : ""}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {diagonal ? (
        <>
          <path d="M5 19 19 5" />
          <path d="M9 5h10v10" />
        </>
      ) : (
        <>
          <path d="M4 12h16" />
          <path d="m13 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
}

function AnimatedLink({
  to,
  children,
  light = false,
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex w-fit items-center gap-5 border-b pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
        light
          ? "border-white/60 text-white hover:border-[#e5c18a] hover:text-[#e5c18a]"
          : "border-[#284831] text-[#284831] hover:border-[#b28b51] hover:text-[#b28b51]"
      } ${className}`}
    >
      {children}

      <motion.span
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <ArrowIcon />
      </motion.span>
    </Link>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = images.hero;

    if (img.complete) {
      setLoaded(true);
    } else {
      img.onload = () => setLoaded(true);
      img.onerror = () => setLoaded(true);
    }
  }, []);

  return (
    <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-[#17291c] sm:min-h-[760px] lg:min-h-[calc(100svh-124px)]">
      <motion.div
        initial={reduceMotion ? false : { scale: 1.12, opacity: 0.4 }}
        animate={{
          scale: 1,
          opacity: loaded ? 1 : 0.6,
        }}
        transition={{
          duration: reduceMotion ? 0 : 2.2,
          ease,
        }}
        className="absolute inset-0"
      >
        <img
          src={images.hero}
          alt="Greenview orchard landscape"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#102319]/85 via-[#102319]/55 to-[#102319]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#102319]/55 via-transparent to-[#102319]/15" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-10 lg:px-14">
        <div className="max-w-[820px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-11 bg-[#e5c18a]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e5c18a] sm:text-xs">
              Welcome to Greenview Orchard
            </p>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 100, rotateX: 8 }
              }
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 1.15,
                delay: 0.3,
                ease,
              }}
              className="font-serif text-[clamp(3.7rem,8.2vw,8.8rem)] leading-[0.96] tracking-[-0.055em] text-white"
            >
              Rooted in
              <br />
              <span className="italic text-[#e5c18a]">nature.</span>
              <br />
              Grown with care.
            </motion.h1>
          </div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: 0.7,
              ease,
            }}
            className="mt-9 max-w-[540px] text-[15px] leading-[1.9] text-white/85 sm:text-[17px]"
          >
            Discover the beauty of orchard life, the richness of
            seasonal harvests, and experiences worth sharing.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: 0.95,
              ease,
            }}
            className="mt-11 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-8 bg-[#e5c18a] px-7 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#203a29] transition-all duration-300 hover:bg-white sm:px-9"
            >
              Explore Our Shop
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>

            <Link
              to="/about"
              className="group inline-flex items-center gap-4 border-b border-white/70 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-[#e5c18a]"
            >
              Discover Our Story
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-9 left-6 z-10 hidden items-center gap-4 sm:left-10 md:flex lg:left-14">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
          Scroll to explore
        </span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white/70"
        >
          ↓
        </motion.span>
      </div>

      <div className="absolute bottom-0 right-0 z-10 hidden bg-[#faf9f5] px-10 py-7 lg:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b28b51]">
          Orchard Living
        </p>
        <p className="mt-2 font-serif text-2xl italic text-[#284831]">
          Naturally beautiful.
        </p>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f5] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 lg:px-14">
        <div className="relative">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e7e9df]">
              <motion.img
                src={images.orchard}
                alt="Orchard growing landscape"
                loading="lazy"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 1.1, ease }}
              />
            </div>
          </Reveal>

          <Reveal
            delay={0.25}
            className="absolute -bottom-8 -right-3 z-10 w-[58%] border-[8px] border-[#faf9f5] bg-[#284831] px-6 py-8 text-white sm:-right-8 sm:px-9 sm:py-10"
          >
            <span className="font-serif text-[clamp(2rem,4vw,4rem)] leading-none text-[#e5c18a]">
              Nature
            </span>

            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.23em] text-white/80">
              At the heart of everything
            </p>
          </Reveal>
        </div>

        <div className="pt-12 lg:pl-4 lg:pt-0">
          <SectionHeading
            eyebrow="Our Story"
            title={
              <>
                A place where
                <br />
                <span className="italic text-[#b28b51]">
                  nature thrives.
                </span>
              </>
            }
            description="There is something special about the rhythm of orchard life. From the first blossoms to the harvest season, every moment is shaped by the land and the care given to it."
          />

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[550px] text-[15px] leading-[1.95] text-[#69746a]">
              Greenview brings together fresh produce, thoughtfully
              selected products, and memorable experiences inspired by
              the natural beauty of the orchard.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <AnimatedLink to="/about">
              Learn More About Us
            </AnimatedLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const reduceMotion = useReducedMotion();

  const items = [
    "Fresh from the Orchard",
    "Naturally Grown",
    "Seasonal Goodness",
    "Orchard Experiences",
  ];

  return (
    <div className="overflow-hidden border-y border-[#dcded3] bg-[#f0f0e8] py-6">
      <motion.div
        animate={reduceMotion ? {} : { x: ["0%", "-50%"] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max items-center"
      >
        {[...items, ...items, ...items, ...items].map(
          (item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-9 px-5"
            >
              <span className="font-serif text-xl italic text-[#49624d] sm:text-2xl">
                {item}
              </span>

              <span className="text-xl text-[#b28b51]">✳</span>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
}

function Offerings() {
  return (
    <section className="bg-[#faf9f5] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Explore Greenview"
            title={
              <>
                More than
                <br />
                <span className="italic text-[#b28b51]">
                  an orchard.
                </span>
              </>
            }
            description="Discover everything that makes Greenview a destination to explore, enjoy, and return to."
          />

          <Reveal className="lg:pb-3">
            <AnimatedLink to="/shop">
              Explore All Products
            </AnimatedLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:gap-x-9 lg:gap-y-20">
          {offerings.map((item, index) => (
            <Reveal
              key={item.number}
              delay={(index % 2) * 0.12}
              className={index % 2 === 1 ? "lg:translate-y-14" : ""}
            >
              <Link to={item.link} className="group block">
                <div className="relative aspect-[4/4.4] overflow-hidden bg-[#e6e7df] sm:aspect-[4/4.7]">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1.1, ease }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center border border-white/70 text-xs font-semibold tracking-[0.1em] text-white">
                    {item.number}
                  </span>

                  <span className="absolute bottom-7 right-7 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#284831] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-[#e5c18a]">
                    <ArrowIcon diagonal />
                  </span>
                </div>

                <div className="pt-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#b28b51]">
                    {item.eyebrow}
                  </p>

                  <h3 className="mt-3 font-serif text-[clamp(1.9rem,3vw,3rem)] leading-tight tracking-[-0.035em] text-[#284831] transition-colors duration-300 group-hover:text-[#a47b42]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[490px] text-[14px] leading-[1.9] text-[#69746a]">
                    {item.description}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-3 border-b border-[#284831] pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#284831] transition-colors group-hover:border-[#b28b51] group-hover:text-[#b28b51]">
                    {item.linkText}
                    <ArrowIcon />
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

function FullWidthStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#213b2a] py-28 lg:min-h-[760px]">
      <motion.div
        initial={reduceMotion ? false : { scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reduceMotion ? 0 : 1.8,
          ease,
        }}
        className="absolute inset-0"
      >
        <img
          src={images.orchard}
          alt="Landscape of the orchard"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[#102319]/75" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5c18a]">
              The Greenview Experience
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="font-serif text-[clamp(3rem,7vw,7.5rem)] leading-[1.04] tracking-[-0.05em] text-white">
              The best things
              <br />
              take <span className="italic text-[#e5c18a]">time.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mx-auto mt-9 max-w-[590px] text-[15px] leading-[1.95] text-white/80 sm:text-base">
              Good things grow from patience, dedication, and an
              appreciation for the seasons. Experience the charm of
              orchard life and everything it has to offer.
            </p>
          </Reveal>

          <Reveal delay={0.34} className="mt-11">
            <AnimatedLink to="/about" light>
              Discover Our Story
            </AnimatedLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollection() {
  return (
    <section className="bg-[#f4f3ec] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <SectionHeading
          eyebrow="From Greenview"
          title={
            <>
              Discover the
              <br />
              <span className="italic text-[#b28b51]">
                collection.
              </span>
            </>
          }
          description="Explore seasonal favourites and carefully selected products inspired by the orchard."
          centered
        />

        <div className="mt-16 grid gap-9 md:grid-cols-3 lg:mt-20">
          {featured.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.12}>
              <Link to={item.link} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e3e4da]">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1, ease }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7 text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                      {item.category}
                    </p>

                    <div className="mt-3 flex items-end justify-between gap-4">
                      <h3 className="font-serif text-[clamp(1.8rem,2.7vw,2.7rem)] leading-tight">
                        {item.title}
                      </h3>

                      <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowIcon diagonal />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-8 bg-[#284831] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-white transition-colors duration-300 hover:bg-[#b28b51]"
          >
            Shop The Collection
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function AccommodationHighlight() {
  return (
    <section className="overflow-hidden bg-[#faf9f5]">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[450px] overflow-hidden bg-[#e6e7df] lg:min-h-[740px]">
          <motion.img
            src={images.accommodation}
            alt="Peaceful accommodation surrounded by nature"
            loading="lazy"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center bg-[#e9ede5] px-6 py-20 sm:px-12 lg:px-[clamp(3rem,6vw,8rem)] lg:py-28">
          <div className="max-w-[590px]">
            <SectionHeading
              eyebrow="Stay With Us"
              title={
                <>
                  Escape to
                  <br />
                  somewhere
                  <br />
                  <span className="italic text-[#b28b51]">
                    beautiful.
                  </span>
                </>
              }
              description="Make yourself at home in a peaceful setting where comfort meets the beauty of the surrounding landscape."
            />

            <Reveal delay={0.2}>
              <p className="mt-6 text-[15px] leading-[1.95] text-[#69746a]">
                Whether you're visiting for a quiet getaway or exploring
                the region, discover accommodation designed for a
                memorable stay.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-11">
              <AnimatedLink to="/accommodation">
                Explore Accommodation
              </AnimatedLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#284831] px-6 py-28 text-center sm:px-10 sm:py-36 lg:py-44">
      <div className="pointer-events-none absolute -left-16 top-0 font-serif text-[260px] leading-none text-white/[0.035] sm:text-[420px]">
        G
      </div>

      <div className="pointer-events-none absolute -bottom-32 -right-12 font-serif text-[300px] leading-none text-white/[0.035] sm:text-[500px]">
        V
      </div>

      <div className="relative z-10 mx-auto max-w-[900px]">
        <Reveal>
          <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5c18a]">
            We'd Love to Hear From You
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-[clamp(3.1rem,7vw,7rem)] leading-[1.07] tracking-[-0.05em] text-white">
            Come experience
            <br />
            <span className="italic text-[#e5c18a]">
              Greenview.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-[520px] text-[15px] leading-[1.9] text-white/75">
            Discover our products, explore the orchard experience,
            or get in touch to find out more.
          </p>
        </Reveal>

        <Reveal
          delay={0.3}
          className="mt-11 flex flex-wrap justify-center gap-5"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-8 bg-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#284831] transition-colors hover:bg-white"
          >
            Get In Touch
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-8 border border-white/70 px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:border-[#e5c18a] hover:text-[#e5c18a]"
          >
            Explore Our Shop
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Introduction />
      <Marquee />
      <Offerings />
      <FullWidthStory />
      <FeaturedCollection />
      <AccommodationHighlight />
      <FinalCTA />
    </div>
  );
}