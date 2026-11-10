
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkjjbdwg";
const CONTACT_EMAIL = "info@greenvieworchards.co.nz";

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
      "Fruit picking involves selecting ripe fruit, handling produce carefully, and working outdoors during the harvest season.",
    image: IMAGES.fruit,
    tasks: [
      "Harvesting fruit according to instructions",
      "Handling and collecting produce carefully",
      "Working outdoors in changing conditions",
      "Following orchard health and safety procedures",
    ],
    details:
      "Harvest work can be physically demanding and may involve standing, walking, reaching, and repetitive movements.",
  },
  {
    id: "packing",
    number: "02",
    category: "Packhouse",
    title: "Fruit Packing",
    description:
      "Fruit packing involves preparing harvested produce through sorting, quality checks, packing, and maintaining organised work areas.",
    image: IMAGES.work,
    tasks: [
      "Sorting and checking fruit",
      "Packing produce according to instructions",
      "Maintaining clean and organised work areas",
      "Following quality and safety procedures",
    ],
    details:
      "Packing work may require prolonged standing and attention to detail. Duties depend on the position and facilities involved.",
  },
  {
    id: "orchard",
    number: "03",
    category: "Orchard",
    title: "Orchard Support",
    description:
      "Orchard support work can include seasonal maintenance, assisting teams, and helping with activities throughout the growing cycle.",
    image: IMAGES.orchard,
    tasks: [
      "Assisting with general orchard activities",
      "Supporting seasonal maintenance work",
      "Following supervisor instructions",
      "Maintaining safe working practices",
    ],
    details:
      "Specific responsibilities and experience requirements depend on the position and current operational needs.",
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
      "Learn about the different types of orchard work and identify the areas that interest you.",
  },
  {
    number: "02",
    title: "Enquire",
    description:
      "Share your details, preferred role, availability, and relevant experience through our employment enquiry form.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "The Greenview team can review your enquiry and contact you by email if there is a suitable opportunity.",
  },
  {
    number: "04",
    title: "Prepare",
    description:
      "If offered a position, confirm your work eligibility, employment terms, and practical arrangements before starting.",
  },
];

const FAQS = [
  {
    question: "How can I enquire about working at Greenview?",
    answer:
      "Complete the employment enquiry form on this page or email info@greenvieworchards.co.nz. Include your preferred role, availability, and relevant experience.",
  },
  {
    question: "What types of orchard work can I enquire about?",
    answer:
      "You can express interest in fruit picking, fruit packing, and general orchard support. The availability of specific positions depends on recruitment requirements.",
  },
  {
    question: "Do I need previous orchard experience?",
    answer:
      "Experience requirements depend on the position. Include any relevant agricultural, horticultural, packing, or outdoor work experience in your enquiry.",
  },
  {
    question: "Can international applicants enquire?",
    answer:
      "You can submit an enquiry, but employment requires appropriate legal permission to work in New Zealand. Visa sponsorship or immigration assistance should not be assumed. Check Immigration New Zealand for official requirements.",
  },
  {
    question: "Is accommodation available for workers?",
    answer:
      "Accommodation arrangements depend on availability and must be confirmed directly with Greenview. You can indicate whether you require accommodation in your enquiry.",
  },
  {
    question: "What are the working hours and pay rates?",
    answer:
      "Working hours, pay rates, contract duration, and employment conditions depend on the position and will need to be confirmed before accepting an offer.",
  },
  {
    question: "Can I enquire with a friend or partner?",
    answer:
      "Yes. Each person should submit an individual enquiry and may mention a preference to work during the same period. Placement together cannot be guaranteed.",
  },
  {
    question: "What happens after submitting my enquiry?",
    answer:
      "Your enquiry is submitted to Greenview Orchard through the website's contact service. The team may contact you by email if a suitable opportunity becomes available. Submitting an enquiry does not guarantee employment.",
  },
];

const INITIAL_FORM = {
  fullName: "",
  email: "",
  role: "",
  availability: "",
  workRights: "",
  accommodation: "",
  experience: "",
  message: "",
  consent: false,
};

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
    map: (
      <>
        <path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
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
            <span className="text-[#e5c18a]">
              Employment
            </span>
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

          <p className="mt-9 max-w-[590px] text-[15px] leading-[2] text-white/80 sm:text-[17px]">
            Explore seasonal orchard work, learn about
            different roles, and express your interest
            in opportunities with Greenview Orchard
            in New Zealand.
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
              Register Your Interest
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/20 pt-7 text-[11px] uppercase tracking-[0.13em] text-white/65">
            <span className="flex items-center gap-2">
              <Icon name="map" size={16} />
              Aongatete, New Zealand
            </span>
            <span className="flex items-center gap-2">
              <Icon name="leaf" size={16} />
              Seasonal Orchard Work
            </span>
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
              Orchard work follows the rhythm of nature.
              From growing and maintaining fruit trees
              to harvesting and preparing produce,
              each season brings different activities.
            </p>

            <p className="mt-5 max-w-[530px] text-[15px] leading-[2] text-[#778574]">
              Greenview Orchard welcomes enquiries from
              people interested in seasonal work.
              Whether you have previous horticultural
              experience or are exploring orchard work
              for the first time, you can register
              your interest with our team.
            </p>

            <p className="mt-5 max-w-[530px] text-[13px] leading-[1.9] text-[#879184]">
              Available positions and their requirements
              depend on the orchard's recruitment needs.
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
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reducedMotion ? false : { opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : index * 0.06,
        ease: EASE,
      }}
      className="group flex h-full flex-col bg-[#faf9f5]"
    >
      <div className="relative aspect-[4/3.3] overflow-hidden bg-[#e3e8df]">
        <motion.img
          src={role.image}
          alt={`${role.title} role illustration`}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={reducedMotion ? undefined : { scale: 1.07 }}
          transition={{ duration: 0.9, ease: EASE }}
        />

        <span className="absolute left-5 top-5 bg-[#faf9f5] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#284831]">
          {role.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-7 pb-9 pt-8 sm:px-9 sm:pb-10">
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

        <p className="mt-6 text-[12px] leading-[1.85] text-[#879184]">
          {role.details}
        </p>

        <div className="mt-auto pt-9">
          <a
            href="#apply"
            className="group/link inline-flex items-center gap-4 border-b border-[#284831] pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#284831]"
          >
            Enquire About This Role
            <span className="transition-transform group-hover/link:translate-x-1">
              <Icon name="arrow" size={18} />
            </span>
          </a>
        </div>
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
            Discover the types of work commonly
            associated with orchards and learn
            what different seasonal roles involve.
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
              The role descriptions above are provided
              to help you understand different areas
              of orchard work. Specific opportunities,
              requirements, and employment conditions
              are subject to confirmation by Greenview.
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
        "Good communication and cooperation help seasonal teams work effectively throughout the orchard.",
    },
    {
      number: "02",
      icon: "shield",
      title: "Safety",
      description:
        "Understanding instructions and following safe working practices are important in agricultural workplaces.",
    },
    {
      number: "03",
      icon: "clock",
      title: "Reliability",
      description:
        "Being punctual, prepared, and attentive to responsibilities contributes to a productive working environment.",
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

function PracticalInformation() {
  const information = [
    {
      icon: "calendar",
      title: "Seasonal Availability",
      description:
        "Orchard work varies with the growing and harvest cycle. Include your preferred start date and how long you would be available when making an enquiry.",
    },
    {
      icon: "globe",
      title: "Right to Work",
      description:
        "Applicants must have appropriate permission to work in New Zealand. Visa and eligibility requirements should be checked before accepting employment.",
    },
    {
      icon: "map",
      title: "Location & Transport",
      description:
        "Greenview Orchard is located at 259 Wright Road, Aongatete, Katikati 3181, New Zealand. Ask about transport and access arrangements before travelling.",
    },
    {
      icon: "briefcase",
      title: "Employment Conditions",
      description:
        "Working hours, remuneration, duties, and contract terms must be confirmed for each position. Do not assume that all seasonal roles have the same arrangements.",
    },
  ];

  return (
    <section className="bg-[#f0f2eb] py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-14">
          <SectionLabel>Before You Enquire</SectionLabel>

          <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.05em] text-[#284831]">
            A few things
            <br />
            <span className="italic">worth knowing.</span>
          </h2>

          <p className="mt-7 max-w-[650px] text-[14px] leading-[1.95] text-[#788575]">
            Preparing the right information can make
            an employment enquiry more useful for
            both you and the orchard team.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {information.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="group h-full bg-[#faf9f5] px-7 py-9 transition-colors hover:bg-white sm:px-10 sm:py-11">
                <div className="mb-8 flex h-14 w-14 items-center justify-center bg-[#edf0e9] text-[#284831] transition-colors group-hover:bg-[#284831] group-hover:text-white">
                  <Icon name={item.icon} size={26} />
                </div>

                <h3 className="font-serif text-[28px] text-[#284831]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[520px] text-[13px] leading-[2] text-[#7b887a]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border border-[#d9e0d5] px-7 py-7 sm:px-9">
            <div>
              <h3 className="font-serif text-[23px] text-[#284831]">
                Working in New Zealand
              </h3>
              <p className="mt-2 max-w-[580px] text-[12px] leading-[1.9] text-[#7b887a]">
                For official information about work
                visas and immigration requirements,
                consult Immigration New Zealand.
              </p>
            </div>

            <a
              href="https://www.immigration.govt.nz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-b border-[#284831] pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#284831]"
            >
              Official Immigration Website
              <Icon name="diagonal" size={17} />
            </a>
          </div>
        </Reveal>
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
            Interested in seasonal work? Here's how
            to make an enquiry and prepare for
            potential opportunities.
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

        <Reveal>
          <p className="mt-8 text-[12px] leading-[1.9] text-[#879184]">
            Registering your interest does not guarantee
            a position or employment offer. The Greenview
            team will confirm recruitment arrangements
            where applicable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ApplicationEnquiry() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (feedback) setFeedback(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || !form.consent) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim(),
          enquiry_type: "Employment",
          interested_role: form.role,
          availability:
            form.availability.trim() || "Not specified",
          work_rights: form.workRights,
          accommodation_required:
            form.accommodation || "Not specified",
          experience:
            form.experience.trim() || "Not provided",
          message:
            form.message.trim() || "Not provided",
          consent_to_contact: "Yes",
          _subject: `Greenview Orchard Employment Enquiry - ${form.role}`,
        }),
      });

      let result = null;

      try {
        result = await response.json();
      } catch {
        // HTTP status remains the source of truth.
      }

      if (!response.ok) {
        const serviceError = Array.isArray(result?.errors)
          ? result.errors
              .map((error) => error.message)
              .filter(Boolean)
              .join(" ")
          : null;

        throw new Error(
          serviceError ||
            "Your enquiry could not be submitted. Please try again."
        );
      }

      setFeedback({
        success: true,
        message:
          "Your employment enquiry has been submitted successfully. Thank you for your interest in Greenview Orchard. Our team may contact you by email if a suitable opportunity becomes available.",
      });

      setForm({ ...INITIAL_FORM });
    } catch (error) {
      setFeedback({
        success: false,
        message:
          error?.message ||
          "Something went wrong. Please try again or contact us by email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-none border-b border-[#d9e0d5] bg-transparent px-0 py-4 text-[14px] text-[#284831] outline-none transition-colors duration-300 placeholder:text-[#a3ada0] focus:border-[#b28b51] focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClass =
    "text-[11px] font-semibold uppercase tracking-[0.13em] text-[#617260]";

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
            Tell us about yourself, your preferred
            type of work, and when you're available.
            Complete the form to register your
            interest with Greenview Orchard.
          </p>

          <div className="mt-10 flex gap-4 border-l-2 border-[#b28b51] bg-[#f0f2eb] px-6 py-6">
            <Icon
              name="info"
              size={22}
              className="mt-0.5 shrink-0 text-[#b28b51]"
            />

            <p className="text-[12px] leading-[1.9] text-[#788575]">
              Employment enquiries are reviewed according
              to recruitment needs. Submitting your details
              does not guarantee a vacancy, interview,
              or employment offer.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b28b51]">
              Prefer to Send an Email?
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "Greenview Orchard - Employment Enquiry"
              )}`}
              className="group mt-4 inline-flex max-w-full items-center gap-3 break-all border-b border-[#d9e0d5] pb-3 font-serif text-[18px] text-[#284831] transition-colors hover:border-[#b28b51] hover:text-[#b28b51] sm:text-[23px]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf0e9] transition-colors group-hover:bg-[#e5c18a]">
                <Icon name="mail" size={21} />
              </span>
              {CONTACT_EMAIL}
              <Icon
                name="diagonal"
                size={16}
                className="shrink-0"
              />
            </a>

            <p className="mt-3 text-[12px] leading-[1.8] text-[#879184]">
              Opens your email application with the
              employment enquiry subject ready.
            </p>
          </div>

          <div className="mt-12 border-t border-[#e0e5db] pt-8">
            <h3 className="font-serif text-[25px] text-[#284831]">
              What should I include?
            </h3>

            <div className="mt-6 space-y-4">
              {[
                "Your name and email address",
                "The role you're interested in",
                "Your preferred starting date",
                "Relevant work experience",
                "Your New Zealand work eligibility",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <Icon
                    name="check"
                    size={18}
                    className="mt-0.5 shrink-0 text-[#b28b51]"
                  />
                  <span className="text-[13px] leading-[1.8] text-[#788575]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden border border-[#e0e5db] bg-[#f5f6f0] px-6 py-9 shadow-[0_24px_80px_-50px_rgba(40,72,49,0.35)] sm:px-10 sm:py-12"
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-[#284831]" />

            <div className="mb-10 flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b28b51]">
                  Your Details
                </p>

                <h3 className="mt-4 font-serif text-[33px] leading-tight text-[#284831]">
                  Employment Enquiry
                </h3>

                <p className="mt-3 text-[12px] leading-[1.8] text-[#879184]">
                  Fields marked * are required.
                </p>
              </div>

              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e8eee5] text-[#284831] sm:flex">
                <Icon name="briefcase" size={27} />
              </div>
            </div>

            <div className="grid gap-x-7 gap-y-7 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>
                  Full Name *
                </span>

                <input
                  type="text"
                  name="name"
                  required
                  maxLength={120}
                  autoComplete="name"
                  disabled={isSubmitting}
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  placeholder="Your full name"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>
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
                <span className={labelClass}>
                  Interested Role *
                </span>

                <select
                  name="interested_role"
                  required
                  disabled={isSubmitting}
                  value={form.role}
                  onChange={(event) =>
                    updateField("role", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select a role type
                  </option>
                  {ROLE_TYPES.map((role) => (
                    <option key={role.id} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                  <option value="Other">
                    Other / General Employment Enquiry
                  </option>
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className={labelClass}>
                  Availability
                </span>

                <input
                  type="text"
                  name="availability"
                  maxLength={150}
                  disabled={isSubmitting}
                  value={form.availability}
                  onChange={(event) =>
                    updateField("availability", event.target.value)
                  }
                  placeholder="When can you start, and for how long?"
                  className={inputClass}
                />
              </label>

              <label className="block sm:col-span-2">
                <span className={labelClass}>
                  Right to Work in New Zealand *
                </span>

                <select
                  name="work_rights"
                  required
                  disabled={isSubmitting}
                  value={form.workRights}
                  onChange={(event) =>
                    updateField("workRights", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select your current status
                  </option>
                  <option value="NZ Citizen or Resident">
                    New Zealand Citizen / Resident
                  </option>
                  <option value="Valid Work Visa">
                    I hold a valid work visa
                  </option>
                  <option value="Other Work Permission">
                    I have other work permission
                  </option>
                  <option value="Need Visa">
                    I would need a work visa
                  </option>
                  <option value="Unsure">
                    I'm not sure
                  </option>
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className={labelClass}>
                  Would You Require Accommodation?
                </span>

                <select
                  name="accommodation_required"
                  disabled={isSubmitting}
                  value={form.accommodation}
                  onChange={(event) =>
                    updateField(
                      "accommodation",
                      event.target.value
                    )
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select an option
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Maybe">
                    Maybe / I'd like more information
                  </option>
                </select>

                <p className="mt-2 text-[11px] leading-[1.7] text-[#9aa698]">
                  Accommodation arrangements are subject
                  to confirmation.
                </p>
              </label>

              <label className="block sm:col-span-2">
                <span className={labelClass}>
                  Relevant Experience
                </span>

                <textarea
                  name="experience"
                  rows={3}
                  maxLength={2000}
                  disabled={isSubmitting}
                  value={form.experience}
                  onChange={(event) =>
                    updateField(
                      "experience",
                      event.target.value
                    )
                  }
                  placeholder="Tell us about any previous orchard, agricultural, packing, or related work..."
                  className={`${inputClass} resize-y`}
                />
              </label>

              <label className="block sm:col-span-2">
                <span className={labelClass}>
                  Additional Information
                </span>

                <textarea
                  name="message"
                  rows={4}
                  maxLength={3000}
                  disabled={isSubmitting}
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Is there anything else you'd like us to know?"
                  className={`${inputClass} resize-y`}
                />
              </label>
            </div>

            <label className="mt-9 flex cursor-pointer items-start gap-3 rounded-sm border border-[#e0e5db] bg-white/60 px-4 py-4 transition-colors hover:border-[#b28b51]">
              <input
                type="checkbox"
                required
                checked={form.consent}
                disabled={isSubmitting}
                onChange={(event) =>
                  updateField("consent", event.target.checked)
                }
                className="mt-1 h-4 w-4 shrink-0 accent-[#284831]"
              />

              <span className="text-[12px] leading-[1.9] text-[#788575]">
                I agree to Greenview Orchard receiving
                and using the information provided
                to respond to my employment enquiry. *
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="group mt-10 flex w-full items-center justify-center gap-5 bg-[#284831] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#b28b51] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#284831]"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending Your Enquiry...
                </>
              ) : (
                <>
                  Submit Employment Enquiry
                  <span className="transition-transform group-hover:translate-x-1">
                    <Icon name="arrow" size={19} />
                  </span>
                </>
              )}
            </button>

            <AnimatePresence mode="wait">
              {feedback && (
                <motion.div
                  key={feedback.success ? "success" : "error"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role={feedback.success ? "status" : "alert"}
                  aria-live={
                    feedback.success ? "polite" : "assertive"
                  }
                  className={`mt-6 flex items-start gap-3 border px-5 py-4 text-[12px] leading-[1.85] ${
                    feedback.success
                      ? "border-[#d6e4d3] bg-[#edf4eb] text-[#55745a]"
                      : "border-[#ead6bd] bg-[#faf1e6] text-[#926b42]"
                  }`}
                >
                  <Icon
                    name={feedback.success ? "check" : "info"}
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{feedback.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-[11px] leading-[1.8] text-[#9aa698]">
              Your information is submitted through
              our contact service for enquiry handling.
              Please do not include passport numbers,
              identity documents, or sensitive personal
              information in this form.
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
            Useful information about seasonal work,
            employment enquiries, and preparing
            for possible opportunities.
          </p>

          <a
            href="#apply"
            className="group mt-9 inline-flex items-center gap-4 border-b border-[#284831] pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#284831]"
          >
            Register Your Interest
            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={18} />
            </span>
          </a>
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
          Learn more about the orchard, discover
          our story, and explore everything
          Greenview has to offer.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/about"
            className="group inline-flex items-center gap-6 bg-[#e5c18a] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
          >
            Our Orchard Story
            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={19} />
            </span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-4 border border-white/50 px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#284831]"
          >
            Contact Us
          </Link>
        </div>
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
      <PracticalInformation />
      <LandscapeBanner />
      <RecruitmentProcess />
      <ApplicationEnquiry />
      <FAQSection />
      <ClosingCTA />
    </div>
  );
}
