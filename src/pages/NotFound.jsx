
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85";

export default function NotFound() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Page Not Found | Greenview Orchard";

    return () => {
      document.title = "Greenview Orchard";
    };
  }, []);

  return (
    <main className="relative flex min-h-[calc(100svh-80px)] items-center justify-center overflow-hidden bg-[#203c2a] px-6 py-28 text-center sm:px-10">
      <motion.img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        initial={reducedMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 1.7,
          ease: EASE,
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[#102519]/80" />

      <div className="relative z-10 mx-auto w-full max-w-[900px]">
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 35 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: EASE,
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5c18a]">
            Lost in the Orchard
          </p>

          <div className="relative mt-8">
            <h1 className="font-serif text-[clamp(9rem,24vw,20rem)] leading-none tracking-[-0.09em] text-white/15">
              404
            </h1>

            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif text-[clamp(2.6rem,6vw,5.8rem)] leading-[1.08] tracking-[-0.055em] text-white">
                Wrong turn,
                <br />
                <span className="italic text-[#e5c18a]">
                  lovely view.
                </span>
              </p>
            </div>
          </div>

          <p className="mx-auto mt-9 max-w-[490px] text-[15px] leading-[1.95] text-white/70">
            Looks like this path doesn't lead anywhere.
            Let's get you back to the orchard.
          </p>

          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-5 bg-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831] transition-colors hover:bg-white"
            >
              Back to Home

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M4 12h16" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center border border-white/50 px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#284831]"
            >
              Explore the Shop
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/45 sm:flex">
        <span className="h-px w-10 bg-white/30" />
        Greenview Orchard
        <span className="h-px w-10 bg-white/30" />
      </div>
    </main>
  );
}
