
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const STORAGE_KEY = "greenview-age-confirmed";
const EASE = [0.22, 1, 0.36, 1];

function hasConfirmedAge() {
  try {
    return (
      window.sessionStorage.getItem(STORAGE_KEY) === "true"
    );
  } catch {
    return false;
  }
}

function Icon({ name, size = 20, className = "" }) {
  const paths = {
    shield: (
      <>
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    arrow: (
      <>
        <path d="M4 12h16" />
        <path d="m13 5 7 7-7 7" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 15a5 5 0 0 0 5 5c8 0 11-6 10-16Z" />
        <path d="M4 21c3-7 7-10 13-13" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
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

export default function AgeVerification({
  required = true,
  onVerified,
}) {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const [verified, setVerified] = useState(() =>
    hasConfirmedAge()
  );

  const open = required && !verified;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (verified && required) {
      onVerified?.();
    }
  }, [verified, required, onVerified]);

  const handleConfirm = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Verification still applies to the current component instance.
    }

    setVerified(true);
  };

  const handleDecline = () => {
    navigate("/shop?category=fruit", { replace: true });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="greenview-age-verification"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.35,
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#0b1b11]/90 px-5 py-8 backdrop-blur-md sm:px-8"
        >
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 45, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? undefined
                : { opacity: 0, y: 20, scale: 0.98 }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              ease: EASE,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-verification-title"
            aria-describedby="age-verification-description"
            className="relative my-auto w-full max-w-[530px] overflow-hidden bg-[#faf9f5] shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
          >
            <div className="h-[5px] w-full bg-[#b28b51]" />

            <div className="relative px-7 pb-9 pt-11 text-center sm:px-12 sm:pb-12 sm:pt-14">
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#284831]/10" />
              <div className="pointer-events-none absolute -right-5 -top-5 h-32 w-32 rounded-full border border-[#284831]/10" />

              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, scale: 0.75 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.2,
                  duration: reducedMotion ? 0 : 0.6,
                  ease: EASE,
                }}
                className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#edf0e9] text-[#284831]"
              >
                <Icon name="shield" size={38} />

                <span className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#b28b51] text-sm font-bold text-white">
                  18+
                </span>
              </motion.div>

              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.27em] text-[#b28b51]">
                Greenview Orchard
              </p>

              <h2
                id="age-verification-title"
                className="font-serif text-[clamp(2.5rem,5vw,3.6rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]"
              >
                A little check
                <br />
                <span className="italic">before you enter.</span>
              </h2>

              <p
                id="age-verification-description"
                className="mx-auto mt-6 max-w-[370px] text-[14px] leading-[1.95] text-[#778574]"
              >
                You're viewing a product containing alcohol.
                Please confirm that you are at least 18 years
                old to continue browsing this collection.
              </p>

              <div className="mt-8 border-y border-[#e2e6dc] py-5">
                <div className="flex items-center justify-center gap-3">
                  <Icon
                    name="leaf"
                    size={20}
                    className="text-[#b28b51]"
                  />

                  <span className="text-[12px] font-medium text-[#61725f]">
                    Responsible enjoyment starts here.
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="group flex min-h-[58px] w-full items-center justify-center gap-4 bg-[#284831] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
                >
                  <Icon name="check" size={18} />

                  Yes, I'm 18 or Older

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <Icon name="arrow" size={18} />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDecline}
                  className="flex min-h-[55px] w-full items-center justify-center border border-[#dce2d7] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#61725f] transition-colors hover:border-[#284831] hover:text-[#284831]"
                >
                  No, I'm Under 18
                </button>
              </div>

              <p className="mx-auto mt-7 max-w-[380px] text-[11px] leading-[1.8] text-[#9ba59a]">
                This confirmation is for browsing only. Age
                verification may also be required when placing
                an order or receiving an alcohol delivery.
              </p>
            </div>

            <div className="bg-[#edf0e9] px-6 py-5 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#7c8b79]">
                Please enjoy responsibly
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
