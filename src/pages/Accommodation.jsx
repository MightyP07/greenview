
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d?auto=format&fit=crop&w=2200&q=85",
  orchard:
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85",
  cottage:
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=85",
  interior:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
  living:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  landscape:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
  outdoor:
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
};

const STAY_OPTIONS = [
  {
    id: "orchard-stays",
    number: "01",
    label: "Accommodation Enquiries",
    name: "Orchard Stays",
    description:
      "Interested in staying close to the orchard? Contact Greenview to learn about available accommodation, property features, and booking arrangements.",
    image: IMAGES.cottage,
    gallery: [IMAGES.cottage, IMAGES.interior, IMAGES.living],
    availability: "Details to be confirmed",
  },
  {
    id: "seasonal-stays",
    number: "02",
    label: "Availability Enquiries",
    name: "Seasonal Stays",
    description:
      "Planning a visit during the fruit season? Ask our team about accommodation availability and options suited to your travel dates.",
    image: IMAGES.outdoor,
    gallery: [IMAGES.outdoor, IMAGES.landscape, IMAGES.orchard],
    availability: "Enquire for information",
  },
];

const FAQS = [
  {
    question: "How can I enquire about accommodation?",
    answer:
      "Use the contact page to send Greenview Orchard your preferred dates, number of guests, and any specific requirements. The team can then confirm available options.",
  },
  {
    question: "Are accommodation prices available online?",
    answer:
      "Rates have not yet been published on this website. Please contact the orchard for current pricing and availability.",
  },
  {
    question: "Can I make a booking directly through the website?",
    answer:
      "Online accommodation booking is not currently configured. Enquiries can be made through the contact page.",
  },
  {
    question: "What facilities are included?",
    answer:
      "Facilities depend on the accommodation offered. Please confirm the property details, amenities, and booking conditions with Greenview before making arrangements.",
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
    camera: (
      <>
        <path d="M3 7h4l2-3h6l2 3h4v13H3V7Z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2H3Z" />
        <path d="M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 15a5 5 0 0 0 5 5c8 0 11-6 10-16Z" />
        <path d="M4 21c3-7 7-10 13-13" />
      </>
    ),
    map: (
      <>
        <path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 7 9-7" />
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
  y = 40,
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

function AccommodationHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#203c2a] sm:min-h-[760px] lg:min-h-[820px]">
      <motion.div
        initial={reducedMotion ? false : { scale: 1.13 }}
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.8,
          ease: EASE,
        }}
        className="absolute inset-0"
      >
        <img
          src={IMAGES.hero}
          alt="Scenic countryside accommodation inspiration"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#10251a]/85 via-[#14271b]/60 to-[#10251a]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#10251a]/50 via-transparent to-[#10251a]/20" />

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
            <span className="text-[#e5c18a]">Accommodation</span>
          </div>

          <SectionLabel light>
            Your Stay at Greenview
          </SectionLabel>

          <h1 className="mt-7 max-w-[950px] font-serif text-[clamp(4rem,8vw,8.8rem)] leading-[0.99] tracking-[-0.06em] text-white">
            Stay a little
            <br />
            <span className="italic text-[#e5c18a]">
              longer.
            </span>
          </h1>

          <p className="mt-9 max-w-[530px] text-[15px] leading-[2] text-white/80 sm:text-[17px]">
            Make more time for the countryside. Explore
            accommodation enquiries and plan your visit
            to Greenview Orchard.
          </p>

          <div className="mt-11 flex flex-wrap gap-4">
            <a
              href="#stays"
              className="group inline-flex items-center gap-5 bg-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
            >
              Explore Stays
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border border-white/55 px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#284831]"
            >
              Enquire Now
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 right-6 hidden items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white/70 sm:flex sm:right-10 lg:right-14">
        <span className="h-px w-12 bg-white/60" />
        Discover the Orchard
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
              alt="Natural landscape and countryside scenery"
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
                size={29}
                className="mx-auto mb-3 text-[#e5c18a]"
              />

              <p className="font-serif text-[20px] leading-snug text-white">
                A slower
                <br />
                kind of stay
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>Discover the Experience</SectionLabel>

            <h2 className="mt-7 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.055em] text-[#284831]">
              A change of
              <br />
              <span className="italic">scenery.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 h-px w-16 bg-[#b28b51]" />

            <p className="mt-8 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              An orchard visit is an opportunity to enjoy
              the landscape, discover seasonal produce,
              and experience a different pace.
            </p>

            <p className="mt-5 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              If you're considering an overnight stay,
              get in touch with Greenview to confirm
              accommodation arrangements, facilities,
              availability, and rates.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-5 border-b border-[#284831] pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
            >
              Discover Our Orchard

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

function PhotoViewer({ images, initialIndex, onClose }) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();

      if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setIndex(
          (current) =>
            (current - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Accommodation image gallery"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b1910]/95 px-5 py-16 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white hover:text-[#284831] sm:right-10 sm:top-9"
      >
        <Icon name="close" size={23} />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Accommodation gallery image ${index + 1}`}
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
            setIndex(
              (current) =>
                (current - 1 + images.length) % images.length
            )
          }
          aria-label="Previous image"
          className="p-3"
        >
          <Icon name="left" size={22} />
        </button>

        <span className="text-xs tracking-[0.15em]">
          {index + 1} / {images.length}
        </span>

        <button
          type="button"
          onClick={() =>
            setIndex((current) => (current + 1) % images.length)
          }
          aria-label="Next image"
          className="p-3"
        >
          <Icon name="right" size={22} />
        </button>
      </div>
    </motion.div>
  );
}

function StayCard({ stay, index, onOpenGallery }) {
  return (
    <Reveal delay={index * 0.12}>
      <article className="group bg-[#faf9f5]">
        <div className="relative aspect-[4/3.5] overflow-hidden bg-[#e4e8df]">
          <motion.img
            src={stay.image}
            alt={`${stay.name} accommodation inspiration`}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.065 }}
            transition={{ duration: 0.95, ease: EASE }}
          />

          <div className="absolute left-5 top-5 bg-[#faf9f5] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#284831]">
            {stay.label}
          </div>

          <button
            type="button"
            onClick={() => onOpenGallery(stay.gallery, 0)}
            className="absolute bottom-5 right-5 flex items-center gap-3 bg-white px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#284831] transition-colors hover:bg-[#e5c18a]"
          >
            <Icon name="camera" size={17} />
            View Gallery
          </button>
        </div>

        <div className="px-6 pb-9 pt-8 sm:px-9 sm:pb-10 sm:pt-9">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#b28b51]">
              {stay.number}
            </span>

            <span className="text-[11px] text-[#879487]">
              {stay.availability}
            </span>
          </div>

          <h3 className="font-serif text-[clamp(2.2rem,3vw,3.2rem)] leading-tight tracking-[-0.04em] text-[#284831]">
            {stay.name}
          </h3>

          <p className="mt-5 min-h-[100px] text-[14px] leading-[1.95] text-[#7a8778]">
            {stay.description}
          </p>

          <div className="mt-8 border-t border-[#e0e5dc] pt-7">
            <Link
              to="/contact"
              className="group/link inline-flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
            >
              Enquire About This Stay

              <span className="transition-transform group-hover/link:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function StaysSection({ onOpenGallery }) {
  return (
    <section
      id="stays"
      className="scroll-mt-24 bg-[#f0f2eb] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>Plan Your Visit</SectionLabel>

            <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.6rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
              Make yourself
              <br />
              <span className="italic">at home.</span>
            </h2>
          </div>

          <p className="max-w-[390px] text-[14px] leading-[1.95] text-[#788575]">
            Accommodation options and booking details
            are being finalised. Contact our team for
            the latest information.
          </p>
        </Reveal>

        <div className="grid gap-7 lg:grid-cols-2">
          {STAY_OPTIONS.map((stay, index) => (
            <StayCard
              key={stay.id}
              stay={stay}
              index={index}
              onOpenGallery={onOpenGallery}
            />
          ))}
        </div>

        <Reveal>
          <div className="mt-9 border-l-2 border-[#b28b51] bg-[#faf9f5] px-6 py-5">
            <p className="text-[12px] leading-[1.9] text-[#798677]">
              Images are illustrative and do not represent
              confirmed Greenview accommodation properties.
              Accommodation types, facilities, and availability
              will be updated when verified.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const experiences = [
    {
      icon: "leaf",
      number: "01",
      title: "The Orchard",
      description:
        "Discover Greenview's orchard story and the seasonal produce behind the brand.",
    },
    {
      icon: "map",
      number: "02",
      title: "Explore the Area",
      description:
        "Plan time to explore the surrounding region during your visit.",
    },
    {
      icon: "calendar",
      number: "03",
      title: "Plan Ahead",
      description:
        "Check availability, property details, and arrangements before travelling.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 text-center">
          <SectionLabel>Beyond the Stay</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
            More than a place
            <br />
            <span className="italic">to rest.</span>
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

function LandscapeSection() {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-[#284831] sm:min-h-[600px]">
      <motion.img
        src={IMAGES.landscape}
        alt="Wide countryside landscape"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        whileInView={{ scale: [1.08, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />

      <div className="absolute inset-0 bg-[#10251a]/55" />

      <div className="relative mx-auto flex min-h-[480px] max-w-[1440px] items-center justify-center px-6 py-20 text-center sm:min-h-[600px]">
        <Reveal>
          <SectionLabel light>
            A Different Perspective
          </SectionLabel>

          <h2 className="mt-7 font-serif text-[clamp(3.3rem,6.5vw,7rem)] leading-[1.05] tracking-[-0.055em] text-white">
            Room to
            <br />
            <span className="italic text-[#e5c18a]">
              unwind.
            </span>
          </h2>
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
            Your questions,
            <br />
            <span className="italic">answered.</span>
          </h2>

          <p className="mt-7 max-w-[350px] text-[14px] leading-[1.95] text-[#7b8879]">
            A few useful details to help you plan
            an accommodation enquiry.
          </p>

          <Link
            to="/contact"
            className="group mt-9 inline-flex items-center gap-4 border-b border-[#284831] pb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#284831]"
          >
            Ask a Question

            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={18} />
            </span>
          </Link>
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

function BookingCTA() {
  return (
    <section className="bg-[#284831] px-6 py-24 text-center sm:py-32">
      <Reveal>
        <SectionLabel light>Start Planning</SectionLabel>

        <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[1.08] tracking-[-0.055em] text-white">
          Your next escape
          <br />
          <span className="italic text-[#e5c18a]">
            starts here.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-[500px] text-[15px] leading-[1.95] text-white/70">
          Tell us when you're hoping to visit and
          we'll help you find out what's available.
        </p>

        <Link
          to="/contact"
          className="group mt-10 inline-flex items-center gap-6 bg-[#e5c18a] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
        >
          Make an Enquiry

          <span className="transition-transform group-hover:translate-x-1">
            <Icon name="arrow" size={19} />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}

export default function Accommodation() {
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    document.title = "Accommodation | Greenview Orchard";

    return () => {
      document.title = "Greenview Orchard";
    };
  }, []);

  return (
    <div className="overflow-x-clip bg-[#faf9f5]">
      <AccommodationHero />

      <IntroSection />

      <StaysSection
        onOpenGallery={(images, index = 0) => {
          setGallery({ images, index });
        }}
      />

      <ExperienceSection />

      <LandscapeSection />

      <FAQSection />

      <BookingCTA />

      <AnimatePresence>
        {gallery && (
          <PhotoViewer
            key="accommodation-photo-viewer"
            images={gallery.images}
            initialIndex={gallery.index}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
