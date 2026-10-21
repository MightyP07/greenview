
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Our Orchard",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Fruit", href: "/fruit-stall" },
      { label: "Employment", href: "/employment" },
    ],
  },
  {
    label: "Shop",
    children: [
      { label: "Shop All", href: "/shop" },
      { label: "Fresh Fruit", href: "/shop?category=fruit" },
      {
        label: "Wines & Fruit Ports",
        href: "/shop?category=wine",
      },
      { label: "Gift Packs", href: "/shop?category=gifts" },
    ],
  },
  {
    label: "Accommodation",
    href: "/accommodation",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

function ChevronDown({ open = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M5 5 19 19M19 5 5 19" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function CartBadge({ count }) {
  return (
    <AnimatePresence mode="wait">
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ opacity: 0, scale: 0.5, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -5 }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 25,
          }}
          className="absolute -right-1 -top-1 flex min-h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#b28b51] px-1 text-[10px] font-bold leading-none text-white shadow-sm"
        >
          {count > 99 ? "99+" : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  return (
    <>
      <div className="bg-[#213b2a] px-4 py-2 text-center text-[11px] font-medium tracking-[0.14em] text-white sm:text-xs">
        GROWN WITH CARE IN NEW ZEALAND
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-[#e9e6dd] bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_8px_30px_rgba(0,0,0,0.07)]"
            : ""
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[92px] lg:px-12">
          <Link
            to="/"
            className="group relative z-10 flex shrink-0 flex-col leading-none"
            aria-label="Greenview homepage"
          >
            <span className="font-serif text-[30px] font-semibold tracking-[-0.055em] text-[#284831] sm:text-[34px]">
              greenview
              <span className="text-[#c49b57]">.</span>
            </span>

            <span className="mt-1 text-center text-[8px] font-semibold uppercase tracking-[0.32em] text-[#6e7c6b]">
              Orchard & Estate
            </span>
          </Link>

          <nav
            className="hidden h-full items-center gap-7 lg:flex xl:gap-9"
            aria-label="Main navigation"
          >
            {navigation.map((item) => {
              const isActive = item.children
                ? item.children.some(
                    (child) =>
                      location.pathname ===
                      child.href.split("?")[0]
                  )
                : location.pathname === item.href;

              if (!item.children) {
                return (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.href === "/"}
                    className={`relative flex h-full items-center text-[12px] font-semibold uppercase tracking-[0.13em] transition-colors hover:text-[#b38b4c] ${
                      isActive
                        ? "text-[#b38b4c]"
                        : "text-[#2c382d]"
                    }`}
                  >
                    {item.label}

                    {isActive && (
                      <motion.span
                        layoutId="desktop-active-nav"
                        className="absolute bottom-[23px] left-0 h-[2px] w-full bg-[#b38b4c]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </NavLink>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative flex h-full items-center"
                  onMouseEnter={() =>
                    setActiveDropdown(item.label)
                  }
                  onMouseLeave={() =>
                    setActiveDropdown(null)
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown((current) =>
                        current === item.label
                          ? null
                          : item.label
                      )
                    }
                    aria-expanded={
                      activeDropdown === item.label
                    }
                    aria-haspopup="true"
                    className={`flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.13em] transition-colors hover:text-[#b38b4c] ${
                      isActive
                        ? "text-[#b38b4c]"
                        : "text-[#2c382d]"
                    }`}
                  >
                    {item.label}

                    <ChevronDown
                      open={
                        activeDropdown === item.label
                      }
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 6,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                        className="absolute left-[-22px] top-[calc(100%-12px)] w-[245px] border border-[#eae5d9] bg-white py-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() =>
                              setActiveDropdown(null)
                            }
                            className="block px-6 py-3 text-[13px] text-[#4e574d] transition-colors hover:bg-[#f7f6f0] hover:text-[#a57b3b]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="relative flex h-10 w-10 items-center justify-center text-[#2c382d] transition-colors hover:text-[#b38b4c]"
              aria-label={`View shopping cart, ${cartCount} ${
                cartCount === 1 ? "item" : "items"
              }`}
            >
              <CartIcon />

              <CartBadge count={cartCount} />
            </Link>

            <Link
              to="/shop"
              className="hidden border border-[#284831] bg-[#284831] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all hover:bg-white hover:text-[#284831] sm:inline-flex"
            >
              Shop Online
            </Link>

            <button
              type="button"
              onClick={() =>
                setMobileOpen((current) => !current)
              }
              aria-label={
                mobileOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="greenview-mobile-menu"
              className="flex h-11 w-11 items-center justify-center text-[#284831] lg:hidden"
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-[60] bg-black/45 lg:hidden"
            />

            <motion.aside
              id="greenview-mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
              }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,390px)] flex-col bg-[#f9f8f3] shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-[#e8e5db] px-6 py-6">
                <span className="font-serif text-3xl text-[#284831]">
                  greenview.
                </span>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center text-[#284831]"
                >
                  <MenuIcon open />
                </button>
              </div>

              <nav
                className="flex-1 overflow-y-auto px-6 py-6"
                aria-label="Mobile navigation links"
              >
                {navigation.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-[#e8e5db]"
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileDropdown((current) =>
                              current === item.label
                                ? null
                                : item.label
                            )
                          }
                          aria-expanded={
                            mobileDropdown === item.label
                          }
                          className="flex w-full items-center justify-between py-5 text-left text-[13px] font-semibold uppercase tracking-[0.14em] text-[#284831]"
                        >
                          {item.label}

                          <ChevronDown
                            open={
                              mobileDropdown === item.label
                            }
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {mobileDropdown === item.label && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pb-5 pl-4">
                                {item.children.map(
                                  (child) => (
                                    <Link
                                      key={child.href}
                                      to={child.href}
                                      onClick={closeMobileMenu}
                                      className="py-2.5 text-sm text-[#657163] transition-colors hover:text-[#b38b4c]"
                                    >
                                      {child.label}
                                    </Link>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={closeMobileMenu}
                        className="block py-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#284831]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="space-y-3 border-t border-[#e8e5db] p-6">
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border border-[#dce2d7] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#284831]"
                >
                  <span className="flex items-center gap-3">
                    <CartIcon />
                    Your Cart
                  </span>

                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-[#284831] px-2 text-[11px] text-white">
                    {cartCount}
                  </span>
                </Link>

                <Link
                  to="/shop"
                  onClick={closeMobileMenu}
                  className="block bg-[#284831] px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
                >
                  Explore Our Shop
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
