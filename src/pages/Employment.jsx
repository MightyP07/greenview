
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85",
  orchard:
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85",
  fruit:
    "https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=1200&q=85",
  work:
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=85",
  landscape:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",
};

const ROLE_TYPES = [
  {
    id: "picking",
    number: "01",
    category: "Harvest",
    title: "Fruit Picking",
    description:
      "Seasonal orchard picking work may involve harvesting ripe fruit, handling produce carefully, and working as part of a harvest team.",
    image: IMAGES.fruit,
    tasks: [
      "Harvesting seasonal fruit",
      "Careful fruit handling",
      "Working with orchard teams",
    ],
  },
  {
    id: "packing",
    number: "02",
    category: "Packhouse",
    title: "Fruit Packing",
    description:
      "Packhouse work may include sorting, checking, and preparing harvested fruit for packing and distribution.",
    image: IMAGES.work,
    tasks: [
      "Sorting and checking produce",
      "Packing fruit",
      "Maintaining workspace standards",
    ],
  },
  {
    id: "orchard",
    number: "03",
    category: "Orchard",
    title: "Orchard Support",
    description:
      "General orchard support roles may involve helping with seasonal activities and other tasks required during the growing cycle.",
    image: IMAGES.orchard,
    tasks: [
      "Supporting orchard operations",
      "Assisting seasonal teams",
      "Following site safety procedures",
    ],
  },
];

const FILTERS = [
  { id: "all", label: "All Roles" },
  { id: "Harvest", label: "Harvest" },
  { id: "Packhouse", label: "Packhouse" },
  { id: "Orchard", label: "Orchard" },
];

const PROCESS = [
  {
    number: "01",
    title: "Explore",
    description:
      "Review the types of seasonal work that may be available at the orchard.",
  },
  {
    number: "02",
    title: "Enquire",
    description:
      "Contact Greenview with your experience, availability, and preferred type of work.",
  },
  {
    number: "03",
    title: "Discuss",
    description:
      "The orchard team can advise whether there are suitable vacancies and explain the next steps.",
  },
  {
    number: "04",
    title: "Prepare",
    description:
      "If offered a role, confirm the employment conditions, required documents, and arrangements before starting.",
  },
];

const FAQS = [
  {
    question: "Is Greenview currently hiring?",
    answer:
      "Current vacancies have not yet been confirmed for this website. Please contact Greenview Orchard directly to ask about recruitment.",
  },
  {
    question: "Do I need previous orchard experience?",
    answer:
      "Requirements vary by role. Greenview will need to confirm whether experience is required for any available positions.",
  },
  {
    question: "Can international applicants apply?",
    answer:
      "Applicants must have the appropriate legal right to work in New Zealand. Greenview has not confirmed whether it offers visa sponsorship or recruitment support.",
  },
  {
    question: "Is staff accommodation provided?",
    answer:
      "Staff accommodation arrangements have not been confirmed. Ask the orchard directly before making travel or employment plans.",
  },
  {
    question: "What are the working hours and pay rates?",
    answer:
      "Working hours, pay rates, contract duration, and employment conditions depend on the position and must be confirmed by Greenview before accepting any offer.",
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
    check: <path d="m5 12 4 4L19 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 15a5 5 0 0 0 5 5c8 0 11-6 10-16Z" />
        <path d="M4 21c3-7 7-10 13-13" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2H3Z" />
        <path d="M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 7 9-7" />
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

function EmploymentHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[680px] items-center overflow-hidden bg-[#284831] sm:min-h-[780px] lg:min-h-[830px]">
      <motion.img
        src={IMAGES.hero}
        alt="Countryside and agricultural landscape"
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
            <span className="text-[#e5c18a]">Employment</span>
          </div>

          <SectionLabel light>
            Opportunities at Greenview
          </SectionLabel>

          <h1 className="mt-7 max-w-[980px] font-serif text-[clamp(4rem,8vw,9rem)] leading-[0.99] tracking-[-0.06em] text-white">
            Grow with
            <br />
            <span className="italic text-[#e5c18a]">
              the season.
            </span>
          </h1>

          <p className="mt-9 max-w-[560px] text-[15px] leading-[2] text-white/80 sm:text-[17px]">
            Explore the world of seasonal orchard work
            and enquire about employment opportunities
            with Greenview Orchard.
          </p>

          <div className="mt-11 flex flex-wrap gap-4">
            <a
              href="#opportunities"
              className="group inline-flex items-center gap-5 bg-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
            >
              Explore Opportunities

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </a>

            <a
              href="#apply"
              className="inline-flex items-center gap-4 border border-white/55 px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#284831]"
            >
              Make an Enquiry
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-14">
        <Reveal className="relative">
          <div className="relative aspect-[4/4.8] max-w-[570px] overflow-hidden bg-[#e7e9e0]">
            <motion.img
              src={IMAGES.orchard}
              alt="Natural countryside landscape"
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
                Work with
                <br />
                the seasons
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>Life at the Orchard</SectionLabel>

            <h2 className="mt-7 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.055em] text-[#284831]">
              Good work
              <br />
              <span className="italic">
                grows together.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 h-px w-16 bg-[#b28b51]" />

            <p className="mt-8 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              Orchard work changes throughout the year.
              Harvest periods can bring opportunities
              for fruit picking, packing, and other
              seasonal activities.
            </p>

            <p className="mt-5 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              If you're interested in working at Greenview,
              contact the team to ask about current
              recruitment, requirements, and the
              application process.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href="#opportunities"
              className="group mt-10 inline-flex items-center gap-5 border-b border-[#284831] pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
            >
              Explore Role Types

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

function RoleCard({ role, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: EASE,
      }}
      className="group bg-[#faf9f5]"
    >
      <div className="relative aspect-[4/3.3] overflow-hidden bg-[#e3e8df]">
        <motion.img
          src={role.image}
          alt={`${role.title} role illustration`}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.9, ease: EASE }}
        />

        <span className="absolute left-5 top-5 bg-[#faf9f5] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#284831]">
          {role.category}
        </span>
      </div>

      <div className="px-7 pb-9 pt-8 sm:px-9 sm:pb-10">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.2em] text-[#b28b51]">
            {role.number}
          </span>

          <span className="text-[10px] uppercase tracking-[0.1em] text-[#9aa598]">
            Role Information
          </span>
        </div>

        <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] leading-tight text-[#284831]">
          {role.title}
        </h3>

        <p className="mt-5 text-[14px] leading-[1.95] text-[#7b8879]">
          {role.description}
        </p>

        <div className="mt-7 space-y-3 border-t border-[#e2e6dd] pt-6">
          {role.tasks.map((task) => (
            <div
              key={task}
              className="flex items-start gap-3"
            >
              <Icon
                name="check"
                size={17}
                className="mt-0.5 shrink-0 text-[#b28b51]"
              />

              <span className="text-[12px] leading-[1.7] text-[#758373]">
                {task}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#apply"
          className="group/link mt-9 inline-flex items-center gap-4 border-b border-[#284831] pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#284831]"
        >
          Enquire About This Role

          <span className="transition-transform group-hover/link:translate-x-1">
            <Icon name="arrow" size={18} />
          </span>
        </a>
      </div>
    </motion.article>
  );
}

function Opportunities() {
  const [filter, setFilter] = useState("all");

  const visibleRoles = useMemo(() => {
    if (filter === "all") return ROLE_TYPES;

    return ROLE_TYPES.filter(
      (role) => role.category === filter
    );
  }, [filter]);

  return (
    <section
      id="opportunities"
      className="scroll-mt-24 bg-[#f0f2eb] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>Seasonal Work</SectionLabel>

            <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.6rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
              Find your
              <br />
              <span className="italic">place here.</span>
            </h2>
          </div>

          <p className="max-w-[400px] text-[14px] leading-[1.95] text-[#788575]">
            Learn about common orchard work categories.
            These are examples, not advertised vacancies.
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
                className={`px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors ${
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
          className="grid gap-7 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleRoles.map((role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal>
          <div className="mt-10 flex gap-4 border-l-2 border-[#b28b51] bg-[#faf9f5] px-6 py-6">
            <Icon
              name="info"
              size={22}
              className="mt-0.5 shrink-0 text-[#b28b51]"
            />

            <p className="text-[12px] leading-[1.95] text-[#788575]">
              No current vacancies, pay rates, start dates,
              or employment conditions have been confirmed.
              Please enquire directly before making
              employment or travel arrangements.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      number: "01",
      icon: "users",
      title: "Teamwork",
      description:
        "Seasonal orchard work depends on people working together and communicating clearly.",
    },
    {
      number: "02",
      icon: "shield",
      title: "Safety",
      description:
        "Understanding instructions and following safe work practices are essential in agricultural workplaces.",
    },
    {
      number: "03",
      icon: "clock",
      title: "Reliability",
      description:
        "Arriving prepared, being punctual, and handling responsibilities carefully make a difference.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14 text-center">
          <SectionLabel>Working Well Together</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
            The things that
            <br />
            <span className="italic">matter at work.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map((item, index) => (
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

function LandscapeBanner() {
  return (
    <section className="relative min-h-[490px] overflow-hidden bg-[#284831] sm:min-h-[620px]">
      <motion.img
        src={IMAGES.landscape}
        alt="Open countryside landscape"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        whileInView={{ scale: [1.08, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />

      <div className="absolute inset-0 bg-[#102519]/60" />

      <div className="relative mx-auto flex min-h-[490px] max-w-[1440px] items-center justify-center px-6 py-20 text-center sm:min-h-[620px]">
        <Reveal>
          <SectionLabel light>
            A Different Kind of Workplace
          </SectionLabel>

          <h2 className="mt-7 font-serif text-[clamp(3.3rem,6.5vw,7rem)] leading-[1.05] tracking-[-0.055em] text-white">
            Work with
            <br />
            <span className="italic text-[#e5c18a]">
              the seasons.
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

function RecruitmentProcess() {
  return (
    <section className="bg-[#f0f2eb] py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-16">
          <SectionLabel>Getting Started</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.6rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
            Your next
            <span className="italic"> step.</span>
          </h2>

          <p className="mt-6 max-w-[550px] text-[14px] leading-[1.95] text-[#788575]">
            An outline of how to approach an employment
            enquiry. Greenview's formal recruitment
            process will be confirmed separately.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1}>
              <div className="h-full bg-[#faf9f5] px-7 py-9 sm:px-8 sm:py-11">
                <span className="font-serif text-[56px] leading-none text-[#b28b51]/45">
                  {step.number}
                </span>

                <div className="mt-8 h-px w-12 bg-[#b28b51]" />

                <h3 className="mt-7 font-serif text-[29px] text-[#284831]">
                  {step.title}
                </h3>

                <p className="mt-4 text-[13px] leading-[1.95] text-[#7b887a]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationEnquiry() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    availability: "",
    message: "",
  });

  const [feedback, setFeedback] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFeedback(
      "Your enquiry details are ready. Please use the contact page to send them to Greenview Orchard once the official recruitment email is confirmed."
    );
  };

  const inputClass =
    "w-full border-b border-[#d9e0d5] bg-transparent px-0 py-4 text-[14px] text-[#284831] outline-none transition-colors placeholder:text-[#a3ada0] focus:border-[#b28b51]";

  return (
    <section
      id="apply"
      className="scroll-mt-24 py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-14">
        <Reveal>
          <SectionLabel>Employment Enquiries</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.05em] text-[#284831]">
            Interested in
            <br />
            <span className="italic">joining us?</span>
          </h2>

          <p className="mt-7 max-w-[440px] text-[15px] leading-[1.95] text-[#788575]">
            Tell us a little about yourself and the type
            of work you're interested in. Once Greenview's
            recruitment contact details are confirmed,
            this form can be connected to the official
            application channel.
          </p>

          <div className="mt-10 flex gap-4 border-l-2 border-[#b28b51] bg-[#f0f2eb] px-6 py-6">
            <Icon
              name="info"
              size={22}
              className="mt-0.5 shrink-0 text-[#b28b51]"
            />

            <p className="text-[12px] leading-[1.9] text-[#788575]">
              This is currently a frontend enquiry form.
              It does not submit an application or store
              personal information on a server.
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
                Your Details
              </p>

              <h3 className="mt-4 font-serif text-[33px] text-[#284831]">
                Employment Enquiry
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
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
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
                  Interested Role *
                </span>

                <select
                  required
                  value={form.role}
                  onChange={(event) =>
                    updateField("role", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">Select a role type</option>
                  <option value="Fruit Picking">
                    Fruit Picking
                  </option>
                  <option value="Fruit Packing">
                    Fruit Packing
                  </option>
                  <option value="Orchard Support">
                    Orchard Support
                  </option>
                  <option value="Other">
                    Other / General Enquiry
                  </option>
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Availability
                </span>

                <input
                  type="text"
                  value={form.availability}
                  onChange={(event) =>
                    updateField(
                      "availability",
                      event.target.value
                    )
                  }
                  placeholder="When would you be available to start?"
                  className={inputClass}
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]">
                  Your Message
                </span>

                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Tell us about your experience and interest..."
                  className={`${inputClass} resize-y`}
                />
              </label>
            </div>

            <button
              type="submit"
              className="group mt-10 flex w-full items-center justify-center gap-5 bg-[#284831] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
            >
              Prepare Enquiry

              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </button>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className="mt-6 border border-[#d6e4d3] bg-[#edf4eb] px-5 py-4 text-[12px] leading-[1.85] text-[#55745a]"
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-[11px] leading-[1.8] text-[#9aa698]">
              No application is sent when this button is pressed.
            </p>
          </form>
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
          <SectionLabel>Good to Know</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(2.8rem,4.7vw,5rem)] leading-[1.1] tracking-[-0.05em] text-[#284831]">
            Your questions,
            <br />
            <span className="italic">answered.</span>
          </h2>

          <p className="mt-7 max-w-[350px] text-[14px] leading-[1.95] text-[#7b8879]">
            Useful information to consider before
            making an employment enquiry.
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
          Discover Greenview
        </SectionLabel>

        <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[1.08] tracking-[-0.055em] text-white">
          Every season brings
          <br />
          <span className="italic text-[#e5c18a]">
            something new.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-[500px] text-[15px] leading-[1.95] text-white/70">
          Learn more about the orchard and explore
          everything Greenview has to offer.
        </p>

        <Link
          to="/about"
          className="group mt-10 inline-flex items-center gap-6 bg-[#e5c18a] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
        >
          Our Orchard Story

          <span className="transition-transform group-hover:translate-x-1">
            <Icon name="arrow" size={19} />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}

export default function Employment() {
  useEffect(() => {
    document.title = "Employment | Greenview Orchard";

    return () => {
      document.title = "Greenview Orchard";
    };
  }, []);

  return (
    <div className="overflow-x-clip bg-[#faf9f5]">
      <EmploymentHero />

      <Introduction />

      <Opportunities />

      <ValuesSection />

      <LandscapeBanner />

      <RecruitmentProcess />

      <ApplicationEnquiry />

      <FAQSection />

      <ClosingCTA />
    </div>
  );
}
