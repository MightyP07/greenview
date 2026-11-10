
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkjjbdwg";

// Edit these details whenever the business information changes.
const CONTACT = {
  email: "info@greenvieworchards.co.nz",
  address: "259 Wright Road, Aongatete, Katikati 3181, New Zealand",
  hours: "8:00 AM – 6:00 PM",
  timezone: "New Zealand local time",
};

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=259+Wright+Road%2C+Aongatete%2C+Katikati+3181%2C+New+Zealand";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85",
  orchard:
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85",
  landscape:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",
};

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Fresh Fruit & Orders",
  "Wines & Fruit Ports",
  "Accommodation",
  "Employment",
  "Fruit Stall Visit",
  "Other",
];

const FAQS = [
  {
    question: "How do I contact Greenview Orchard?",
    answer:
      `You can send an enquiry using the form on this page or email ${CONTACT.email}. We'll respond as soon as possible.`,
  },
  {
    question: "How can I enquire about fruit and other products?",
    answer:
      "Browse our shop or select Fresh Fruit & Orders or Wines & Fruit Ports in the enquiry form. Tell us which products you're interested in, and we'll assist with your enquiry.",
  },
  {
    question: "How can I enquire about accommodation?",
    answer:
      "Select Accommodation as your enquiry type and include your preferred dates, number of guests, and any questions you may have.",
  },
  {
    question: "Can I enquire about seasonal employment?",
    answer:
      "Visit our Employment page for information about seasonal opportunities and how to submit an employment enquiry.",
  },
  {
    question: "Where is Greenview Orchard located?",
    answer:
      `Greenview Orchard is located at ${CONTACT.address}. Use the directions link on this page to find our location.`,
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
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 7 9-7" />
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
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 15a5 5 0 0 0 5 5c8 0 11-6 10-16Z" />
        <path d="M4 21c3-7 7-10 13-13" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
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

function ContactHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#284831] sm:min-h-[750px] lg:min-h-[800px]">
      <motion.img
        src={IMAGES.hero}
        alt="Green countryside landscape"
        initial={reducedMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.7,
          ease: EASE,
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#102519]/95 via-[#102519]/70 to-[#102519]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#102519]/55 via-transparent to-[#102519]/20" />

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
            <span className="text-[#e5c18a]">Contact</span>
          </div>

          <SectionLabel light>
            Get in Touch With Greenview
          </SectionLabel>

          <h1 className="mt-7 max-w-[1000px] font-serif text-[clamp(4rem,8vw,9rem)] leading-[0.99] tracking-[-0.06em] text-white">
            Let's get
            <br />
            <span className="italic text-[#e5c18a]">
              in touch.
            </span>
          </h1>

          <p className="mt-9 max-w-[570px] text-[15px] leading-[2] text-white/80 sm:text-[17px]">
            From fresh fruit and orchard products to
            accommodation, employment, and visits,
            we're here to answer your questions.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <a
              href="#contact-form"
              className="group inline-flex items-center gap-5 bg-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
            >
              Send an Enquiry

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="group inline-flex items-center gap-3 border border-white/45 px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#284831]"
            >
              <Icon name="mail" size={18} />
              Email Us
            </a>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-white/15" />
    </section>
  );
}

function ContactIntro() {
  return (
    <section className="overflow-hidden py-24 sm:py-32 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-14">
        <Reveal className="relative">
          <div className="relative aspect-[4/4.7] max-w-[570px] overflow-hidden bg-[#e7e9e0]">
            <motion.img
              src={IMAGES.orchard}
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
                Stay
                <br />
                connected
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>Connect With Greenview</SectionLabel>

            <h2 className="mt-7 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.055em] text-[#284831]">
              We're here
              <br />
              <span className="italic">to help.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 h-px w-16 bg-[#b28b51]" />

            <p className="mt-8 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              Whether you're interested in seasonal
              fruit, our wine and fruit port collection,
              or learning more about the orchard,
              this is the place to start.
            </p>

            <p className="mt-5 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              You can also enquire about accommodation,
              employment, and visiting the orchard.
              Simply choose the relevant enquiry type
              and tell us what you'd like to know.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href="#contact-form"
              className="group mt-10 inline-flex items-center gap-5 border-b border-[#284831] pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
            >
              Make an Enquiry

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactInformation() {
  const details = [
    {
      icon: "mail",
      label: "Email Enquiries",
      value: CONTACT.email,
      description: "Write to us directly for enquiries and information.",
      href: `mailto:${CONTACT.email}`,
      action: "Send an Email",
      external: false,
    },
    {
      icon: "map",
      label: "Our Location",
      value: CONTACT.address,
      description: "Find Greenview Orchard in Katikati, New Zealand.",
      href: MAP_URL,
      action: "Get Directions",
      external: true,
    },
    {
      icon: "clock",
      label: "Opening Hours",
      value: CONTACT.hours,
      description: CONTACT.timezone,
      href: null,
      action: null,
      external: false,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f0f2eb] py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#dce4d7]" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#dce4d7]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 text-center">
          <SectionLabel>Contact Details</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
            Find your way
            <span className="italic"> to us.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[560px] text-[14px] leading-[1.95] text-[#7b8879]">
            Reach us by email, find our orchard, or check
            our opening hours before planning your visit.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal
              key={detail.label}
              delay={index * 0.09}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -7 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group relative flex h-full flex-col overflow-hidden border border-[#e0e6da] bg-[#faf9f5] px-7 py-10 sm:px-8 sm:py-12"
              >
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#b28b51] transition-all duration-500 group-hover:w-full" />

                <div className="mb-9 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf0e9] text-[#284831] transition-colors duration-300 group-hover:bg-[#284831] group-hover:text-[#e5c18a]">
                  <Icon name={detail.icon} size={28} />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b28b51]">
                  {detail.label}
                </p>

                <h3 className="mt-4 break-words font-serif text-[clamp(1.35rem,2vw,1.8rem)] leading-[1.4] text-[#284831]">
                  {detail.value}
                </h3>

                <p className="mt-5 text-[13px] leading-[1.9] text-[#839080]">
                  {detail.description}
                </p>

                {detail.href && (
                  <a
                    href={detail.href}
                    target={detail.external ? "_blank" : undefined}
                    rel={detail.external ? "noopener noreferrer" : undefined}
                    className="mt-auto inline-flex items-center gap-3 pt-9 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#284831] transition-colors hover:text-[#b28b51]"
                  >
                    {detail.action}
                    <Icon
                      name="diagonal"
                      size={16}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                )}

                {!detail.href && (
                  <div className="mt-auto pt-9">
                    <div className="inline-flex items-center gap-3 border-t border-[#dfe6db] pt-5 text-[11px] text-[#788575]">
                      <span className="h-2 w-2 rounded-full bg-[#b28b51]" />
                      {CONTACT.timezone}
                    </div>
                  </div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (status) setStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          enquiry_type: form.subject,
          message: form.message.trim(),
          _subject: `Greenview Orchard - ${form.subject}`,
        }),
      });

      let result = null;

      try {
        result = await response.json();
      } catch {
        // Use the HTTP status if the response is not JSON.
      }

      if (!response.ok) {
        const formspreeError = result?.errors
          ?.map((error) => error.message)
          .filter(Boolean)
          .join(" ");

        throw new Error(
          formspreeError ||
            "We couldn't send your message. Please try again."
        );
      }

      setStatus({
        success: true,
        message:
          "Your enquiry has been sent successfully. Thank you for contacting Greenview Orchard. We'll respond as soon as possible.",
      });

      setForm({ ...INITIAL_FORM });
    } catch (error) {
      setStatus({
        success: false,
        message:
          error?.message ||
          "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-b border-[#d9e0d5] bg-transparent px-0 py-4 text-[14px] text-[#284831] outline-none transition-colors placeholder:text-[#a3ada0] focus:border-[#b28b51] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <section
      id="contact-form"
      className="scroll-mt-24 py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-14">
        <Reveal>
          <SectionLabel>Send a Message</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.05em] text-[#284831]">
            Start a
            <br />
            <span className="italic">conversation.</span>
          </h2>

          <p className="mt-7 max-w-[440px] text-[15px] leading-[1.95] text-[#788575]">
            Have a question or something you'd like
            to discuss? Send us an enquiry directly
            through the website, and we'll get back
            to you by email.
          </p>

          <div className="mt-10 flex gap-4 border-l-2 border-[#b28b51] bg-[#f0f2eb] px-6 py-6">
            <Icon
              name="info"
              size={22}
              className="mt-0.5 shrink-0 text-[#b28b51]"
            />

            <p className="text-[12px] leading-[1.9] text-[#788575]">
              Complete the form with your details and
              enquiry. Please use a valid email address
              so we can reply.
            </p>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-[#e0e5db] pt-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b28b51]">
                Or Email Us Directly
              </p>

              <a
                href={`mailto:${CONTACT.email}`}
                className="group mt-5 inline-flex max-w-full items-center gap-4 break-all font-serif text-[18px] text-[#284831] transition-colors hover:text-[#b28b51] sm:text-[23px]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#edf0e9] transition-colors group-hover:bg-[#e5c18a]">
                  <Icon name="mail" size={20} />
                </span>

                {CONTACT.email}
              </a>
            </div>
          </Reveal>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden border border-[#e0e5db] bg-[#f5f6f0] px-6 py-9 sm:px-10 sm:py-12"
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-[#284831]" />

            <div className="mb-10 flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b28b51]">
                  Contact Form
                </p>

                <h3 className="mt-4 font-serif text-[33px] text-[#284831]">
                  Your Enquiry
                </h3>
              </div>

              <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-[#e8ede4] text-[#284831] sm:flex">
                <Icon name="send" size={24} />
              </div>
            </div>

            <div className="grid gap-x-7 gap-y-7 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Full Name *
                </span>

                <input
                  type="text"
                  name="name"
                  required
                  maxLength={120}
                  autoComplete="name"
                  disabled={isSubmitting}
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="Your full name"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Email Address *
                </span>

                <input
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  disabled={isSubmitting}
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Enquiry Type *
                </span>

                <select
                  name="enquiry_type"
                  required
                  disabled={isSubmitting}
                  value={form.subject}
                  onChange={(event) =>
                    updateField("subject", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select enquiry type
                  </option>

                  {ENQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Your Message *
                </span>

                <textarea
                  name="message"
                  rows={6}
                  required
                  minLength={10}
                  maxLength={5000}
                  disabled={isSubmitting}
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Tell us how we can help..."
                  className={`${inputClass} resize-y`}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="group mt-10 flex w-full items-center justify-center gap-5 bg-[#284831] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#284831]"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending Your Message...
                </>
              ) : (
                <>
                  Send Enquiry

                  <span className="transition-transform group-hover:translate-x-1">
                    <Icon name="arrow" size={19} />
                  </span>
                </>
              )}
            </button>

            <AnimatePresence mode="wait">
              {status && (
                <motion.div
                  key={status.success ? "success" : "error"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role={status.success ? "status" : "alert"}
                  aria-live={status.success ? "polite" : "assertive"}
                  className={`mt-6 flex items-start gap-3 border px-5 py-4 text-[12px] leading-[1.85] ${
                    status.success
                      ? "border-[#d6e4d3] bg-[#edf4eb] text-[#55745a]"
                      : "border-[#ead6bd] bg-[#faf1e6] text-[#926b42]"
                  }`}
                >
                  <Icon
                    name={status.success ? "check" : "info"}
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{status.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-[11px] leading-[1.8] text-[#9aa698]">
              Your details will be used to respond
              to your enquiry.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function LandscapeBanner() {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-[#284831] sm:min-h-[600px]">
      <motion.img
        src={IMAGES.landscape}
        alt="Open countryside scenery"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        whileInView={{ scale: [1.08, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />

      <div className="absolute inset-0 bg-[#102519]/60" />

      <div className="relative mx-auto flex min-h-[480px] max-w-[1440px] items-center justify-center px-6 py-20 text-center sm:min-h-[600px]">
        <Reveal>
          <SectionLabel light>
            Discover Greenview
          </SectionLabel>

          <h2 className="mt-7 font-serif text-[clamp(3.3rem,6.5vw,7rem)] leading-[1.05] tracking-[-0.055em] text-white">
            Come a little
            <br />
            <span className="italic text-[#e5c18a]">
              closer.
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
    <section className="bg-[#f0f2eb] py-24 sm:py-32 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14">
        <Reveal>
          <SectionLabel>Frequently Asked</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,4.7vw,5rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
            Need a little
            <br />
            <span className="italic">more information?</span>
          </h2>

          <p className="mt-7 max-w-[350px] text-[14px] leading-[1.95] text-[#7b8879]">
            Answers to a few common questions
            about Greenview Orchard.
          </p>
        </Reveal>

        <div>
          {FAQS.map((faq, index) => {
            const open = openIndex === index;

            return (
              <Reveal key={faq.question} delay={index * 0.05}>
                <div className="border-b border-[#d9e0d5]">
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
                          : "bg-[#e4e9df] text-[#284831]"
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
    <section className="bg-[#284831] px-6 py-24 text-center sm:py-32">
      <Reveal>
        <SectionLabel light>
          Explore More
        </SectionLabel>

        <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[1.08] tracking-[-0.055em] text-white">
          There's more
          <br />
          <span className="italic text-[#e5c18a]">
            to discover.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-[500px] text-[15px] leading-[1.95] text-white/70">
          Explore seasonal fruit, orchard-inspired
          products, and everything Greenview has
          to offer.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-6 bg-[#e5c18a] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
          >
            Explore the Shop

            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={19} />
            </span>
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center gap-4 border border-white/50 px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#284831]"
          >
            Our Story
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Greenview Orchard";

    return () => {
      document.title = "Greenview Orchard";
    };
  }, []);

  return (
    <div className="overflow-x-clip bg-[#faf9f5]">
      <ContactHero />
      <ContactIntro />
      <ContactInformation />
      <ContactForm />
      <LandscapeBanner />
      <FAQSection />
      <ClosingCTA />
    </div>
  );
}
