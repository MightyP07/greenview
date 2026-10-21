
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// Replace these values once the client confirms them.
const CONTACT = {
  email: "",
  phone: "",
  address: "",
  hours: "",
};

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
      "Use the enquiry form to prepare your message. The official email address and telephone number will be published once confirmed.",
  },
  {
    question: "Can I order fruit online?",
    answer:
      "The online shop is being prepared. Products will become available to purchase once pricing, stock, delivery, and payment arrangements are configured.",
  },
  {
    question: "How can I enquire about accommodation?",
    answer:
      "Choose Accommodation as your enquiry type and include your preferred dates, number of guests, and any questions about facilities.",
  },
  {
    question: "Can I apply for seasonal work?",
    answer:
      "Visit the Employment page to learn about potential role categories. Current vacancies and recruitment arrangements must be confirmed directly with Greenview.",
  },
  {
    question: "Where is Greenview Orchard located?",
    answer:
      "The verified visitor address and directions will be added to this page once confirmed by the orchard.",
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
    phone: (
      <path d="M6.6 2.5h3.1l1.2 5-2.1 1.8a15 15 0 0 0 5.9 5.9l1.8-2.1 5 1.2v3.1a3 3 0 0 1-3.3 3A18 18 0 0 1 3.6 5.8a3 3 0 0 1 3-3.3Z" />
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
            <span className="text-[#e5c18a]">Contact</span>
          </div>

          <SectionLabel light>
            We'd Love to Hear From You
          </SectionLabel>

          <h1 className="mt-7 max-w-[1000px] font-serif text-[clamp(4rem,8vw,9rem)] leading-[0.99] tracking-[-0.06em] text-white">
            Let's get
            <br />
            <span className="italic text-[#e5c18a]">
              in touch.
            </span>
          </h1>

          <p className="mt-9 max-w-[560px] text-[15px] leading-[2] text-white/80 sm:text-[17px]">
            Questions about our fruit, products,
            accommodation, employment, or visiting?
            We'd be happy to hear from you.
          </p>

          <a
            href="#contact-form"
            className="group mt-11 inline-flex items-center gap-5 bg-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
          >
            Send an Enquiry

            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={19} />
            </span>
          </a>
        </Reveal>
      </div>
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
              employment, and visitor arrangements.
              Select the relevant enquiry type so your
              message is easy to direct.
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
      label: "Email",
      value: CONTACT.email || "To be confirmed",
      description: "For general enquiries and information.",
      href: CONTACT.email
        ? `mailto:${CONTACT.email}`
        : null,
    },
    {
      icon: "phone",
      label: "Phone",
      value: CONTACT.phone || "To be confirmed",
      description: "Telephone contact details.",
      href: CONTACT.phone
        ? `tel:${CONTACT.phone.replace(/\s/g, "")}`
        : null,
    },
    {
      icon: "map",
      label: "Location",
      value: CONTACT.address || "To be confirmed",
      description: "Orchard address and visitor directions.",
      href: null,
    },
    {
      icon: "clock",
      label: "Opening Hours",
      value: CONTACT.hours || "To be confirmed",
      description: "Please confirm hours before visiting.",
      href: null,
    },
  ];

  return (
    <section className="bg-[#f0f2eb] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 text-center">
          <SectionLabel>Contact Details</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
            Find your way
            <span className="italic"> to us.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {details.map((detail, index) => (
            <Reveal key={detail.label} delay={index * 0.09}>
              <div className="h-full bg-[#faf9f5] px-7 py-10 text-center sm:px-8 sm:py-12">
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf0e9] text-[#284831]">
                  <Icon name={detail.icon} size={28} />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b28b51]">
                  {detail.label}
                </p>

                {detail.href ? (
                  <a
                    href={detail.href}
                    className="mt-4 block break-words font-serif text-[23px] text-[#284831] transition-colors hover:text-[#b28b51]"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <h3 className="mt-4 break-words font-serif text-[23px] text-[#284831]">
                    {detail.value}
                  </h3>
                )}

                <p className="mt-4 text-[12px] leading-[1.85] text-[#839080]">
                  {detail.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (status) setStatus(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!CONTACT.email) {
      setStatus({
        success: false,
        message:
          "The official Greenview email address has not yet been configured. Your message has not been sent. Please try again once contact details are available.",
      });

      return;
    }

    const subject = encodeURIComponent(
      `Greenview Orchard - ${form.subject}`
    );

    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "Not provided"}`,
        `Enquiry Type: ${form.subject}`,
        "",
        "Message:",
        form.message,
      ].join("\n")
    );

    window.location.href =
      `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

    setStatus({
      success: true,
      message:
        "Your email application should open with the enquiry prepared. Please send the email from there. No message has been submitted through this website.",
    });
  };

  const inputClass =
    "w-full border-b border-[#d9e0d5] bg-transparent px-0 py-4 text-[14px] text-[#284831] outline-none transition-colors placeholder:text-[#a3ada0] focus:border-[#b28b51]";

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
            to discuss? Complete the form with your
            details and the nature of your enquiry.
          </p>

          <div className="mt-10 flex gap-4 border-l-2 border-[#b28b51] bg-[#f0f2eb] px-6 py-6">
            <Icon
              name="info"
              size={22}
              className="mt-0.5 shrink-0 text-[#b28b51]"
            />

            <p className="text-[12px] leading-[1.9] text-[#788575]">
              The form currently uses your email
              application rather than an online
              messaging backend. No information is
              stored on the website.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="border border-[#e0e5db] bg-[#f5f6f0] px-6 py-9 sm:px-10 sm:py-12"
          >
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b28b51]">
                Contact Form
              </p>

              <h3 className="mt-4 font-serif text-[33px] text-[#284831]">
                Your Enquiry
              </h3>
            </div>

            <div className="grid gap-x-7 gap-y-7 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Full Name *
                </span>

                <input
                  type="text"
                  required
                  autoComplete="name"
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
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Phone Number
                </span>

                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  placeholder="Your phone number"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Enquiry Type *
                </span>

                <select
                  required
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
                  rows={5}
                  required
                  minLength={10}
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
              className="group mt-10 flex w-full items-center justify-center gap-5 bg-[#284831] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
            >
              Prepare Email Enquiry

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </button>

            <AnimatePresence>
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className={`mt-6 border px-5 py-4 text-[12px] leading-[1.85] ${
                    status.success
                      ? "border-[#d6e4d3] bg-[#edf4eb] text-[#55745a]"
                      : "border-[#ead6bd] bg-[#faf1e6] text-[#926b42]"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-[11px] leading-[1.8] text-[#9aa698]">
              Your message is not automatically sent
              by this form.
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
