
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  products,
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  productSortOptions,
  filterProducts,
  formatPrice,
  isPurchasable,
} from "../data/products";

import { useCart } from "../context/CartContext";

const PAGE_SIZE = 9;
const EASE = [0.22, 1, 0.36, 1];

const CATEGORY_IMAGES = {
  all: "/images/shop-all.jpg",
  fruit: "/images/shop-fruit.jpg",
  wine: "/images/shop-wine.jpg",
  gifts: "/images/shop-gifts.jpg",
};

const CATEGORY_FALLBACKS = {
  all: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1600&q=85",
  fruit: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1600&q=85",
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85",
  gifts: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1600&q=85",
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
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    close: (
      <>
        <path d="M5 5 19 19" />
        <path d="M19 5 5 19" />
      </>
    ),
    filter: (
      <>
        <path d="M4 7h16M7 12h10M10 17h4" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    bag: (
      <>
        <path d="M4 8h16l-1 13H5L4 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
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
    check: <path d="m5 12 4 4L19 6" />,
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
  className = "",
  y = 35,
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ShopHero({ category }) {
  const reducedMotion = useReducedMotion();

  const categoryInfo = PRODUCT_CATEGORIES.find(
    (item) => item.slug === category
  );

  const title =
    category === "all"
      ? "The Orchard Shop"
      : categoryInfo?.name || "The Orchard Shop";

  const subtitle =
    category === "all"
      ? "Explore seasonal harvests, orchard favourites, wines, and thoughtful gifts."
      : categoryInfo?.description ||
        "Explore our orchard collection.";

  return (
    <section className="relative isolate flex min-h-[390px] items-center overflow-hidden bg-[#213b2a] sm:min-h-[460px] lg:min-h-[530px]">
      <motion.div
        key={category}
        initial={reducedMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1.2, ease: EASE }}
        className="absolute inset-0"
      >
        <img
          src={CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.all}
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[#122419]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#102319]/75 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-10 lg:px-14">
        <motion.div
          key={`content-${category}`}
          initial={reducedMotion ? false : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            delay: 0.12,
            ease: EASE,
          }}
          className="max-w-[850px]"
        >
          <div className="mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-white/70">
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>

            <span>/</span>

            <span className="text-[#e5c18a]">Shop</span>
          </div>

          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5c18a]">
            Greenview Orchard Collection
          </p>

          <h1 className="font-serif text-[clamp(3.5rem,7.8vw,7.5rem)] leading-[1.02] tracking-[-0.055em] text-white">
            {title}
            <span className="text-[#e5c18a]">.</span>
          </h1>

          <p className="mt-7 max-w-[570px] text-[15px] leading-[1.9] text-white/80 sm:text-base">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 hidden bg-[#faf9f5] px-9 py-5 lg:block">
        <span className="font-serif text-xl italic text-[#284831]">
          From our orchard to you.
        </span>
      </div>
    </section>
  );
}

function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="border-b border-[#e4e5dc] bg-[#faf9f5]">
      <div className="mx-auto flex max-w-[1440px] gap-8 overflow-x-auto px-6 sm:px-10 lg:gap-12 lg:px-14">
        {PRODUCT_CATEGORIES.map((category) => {
          const active = activeCategory === category.slug;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.slug)}
              className={`relative shrink-0 py-7 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors sm:text-xs ${
                active
                  ? "text-[#284831]"
                  : "text-[#8b9489] hover:text-[#284831]"
              }`}
            >
              {category.name}

              {active && (
                <motion.span
                  layoutId="shop-category-underline"
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-[#b28b51]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ShopSidebar({
  category,
  subcategory,
  onCategoryChange,
  onSubcategoryChange,
  availableOnly,
  onAvailableChange,
  mobile = false,
}) {
  const subcategories = PRODUCT_SUBCATEGORIES.filter(
    (item) => category === "all" || item.category === category
  );

  return (
    <div className={mobile ? "" : "hidden lg:block"}>
      <div className="border-b border-[#e4e5dc] pb-9">
        <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.19em] text-[#284831]">
          Categories
        </h3>

        <div className="space-y-1">
          {PRODUCT_CATEGORIES.map((item) => {
            const count =
              item.slug === "all"
                ? products.length
                : products.filter(
                    (product) => product.category === item.slug
                  ).length;

            const active = category === item.slug;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onCategoryChange(item.slug)}
                className={`flex w-full items-center justify-between gap-4 py-3 text-left text-[14px] transition-colors ${
                  active
                    ? "font-semibold text-[#284831]"
                    : "text-[#758073] hover:text-[#284831]"
                }`}
              >
                <span>{item.name}</span>
                <span className="text-xs text-[#a5aca2]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-b border-[#e4e5dc] py-9">
        <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.19em] text-[#284831]">
          Product Type
        </h3>

        <div className="space-y-1">
          {subcategories.map((item) => {
            const active = subcategory === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onSubcategoryChange(active ? "" : item.id)
                }
                className="flex w-full items-center gap-3 py-3 text-left"
              >
                <span
                  className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center border transition-colors ${
                    active
                      ? "border-[#284831] bg-[#284831] text-white"
                      : "border-[#b8c0b5]"
                  }`}
                >
                  {active && <Icon name="check" size={13} />}
                </span>

                <span
                  className={`text-[14px] ${
                    active
                      ? "font-medium text-[#284831]"
                      : "text-[#758073]"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="py-9">
        <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.19em] text-[#284831]">
          Availability
        </h3>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(event) =>
              onAvailableChange(event.target.checked)
            }
            className="h-4 w-4 accent-[#284831]"
          />

          <span className="text-[14px] text-[#758073]">
            Available products only
          </span>
        </label>
      </div>

      <div className="mt-5 bg-[#edf0e9] px-7 py-9">
        <p className="font-serif text-3xl italic leading-tight text-[#284831]">
          Fresh from
          <br />
          the orchard.
        </p>

        <p className="mt-5 text-[13px] leading-[1.9] text-[#71806f]">
          Our collection changes with the seasons. Explore the latest
          products and discover something special.
        </p>

        <Link
          to="/about"
          className="mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
        >
          Our Story
          <Icon name="arrow" size={17} />
        </Link>
      </div>
    </div>
  );
}

function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const reducedMotion = useReducedMotion();
  const [feedback, setFeedback] = useState("");

  const purchasable = isPurchasable(product);

  useEffect(() => {
    if (!feedback) return;

    const timeout = window.setTimeout(() => setFeedback(""), 2800);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const handleAddToCart = () => {
    const result = addToCart(product.id);
    setFeedback(result.message);
  };

  return (
    <motion.article
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : Math.min(index * 0.045, 0.3),
        ease: EASE,
      }}
      className="group min-w-0"
    >
      <div className="relative aspect-[3/3.65] overflow-hidden bg-[#eeeee7]">
        <Link
          to={`/shop/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 block"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={reducedMotion ? {} : { scale: 1.075 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </Link>

        {product.badge && (
          <span className="absolute left-4 top-4 bg-[#faf9f5] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#284831]">
            {product.badge}
          </span>
        )}

        {product.requiresAgeVerification && (
          <span className="absolute right-4 top-4 bg-[#284831]/90 px-3 py-2 text-[10px] font-semibold text-white">
            18+
          </span>
        )}

        <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex translate-y-3 justify-end opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          <Link
            to={`/shop/${product.slug}`}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center bg-white text-[#284831] shadow-lg transition-colors hover:bg-[#e5c18a]"
            aria-label={`View ${product.name}`}
          >
            <Icon name="diagonal" size={19} />
          </Link>
        </div>
      </div>

      <div className="pt-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#b28b51]">
          {PRODUCT_CATEGORIES.find(
            (category) => category.slug === product.category
          )?.name || product.category}
        </p>

        <Link to={`/shop/${product.slug}`}>
          <h3 className="mt-3 font-serif text-[clamp(1.4rem,2.1vw,1.9rem)] leading-[1.2] tracking-[-0.025em] text-[#284831] transition-colors hover:text-[#b28b51]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 min-h-[42px] text-[13px] leading-[1.7] text-[#7b8579]">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold text-[#284831]">
              {formatPrice(product.price, product.currency)}
            </p>

            {!purchasable && (
              <p className="mt-1 text-[11px] text-[#90998d]">
                {product.availabilityLabel ||
                  "Currently unavailable"}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!purchasable}
            title={
              !purchasable
                ? "Product price or availability is not confirmed"
                : `Add ${product.name} to cart`
            }
            className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-all ${
              purchasable
                ? "border-[#284831] bg-[#284831] text-white hover:bg-[#b28b51] hover:border-[#b28b51]"
                : "cursor-not-allowed border-[#dce0d8] bg-[#eff0eb] text-[#aeb5a9]"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <Icon name="bag" size={19} />
          </button>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="mt-3 text-xs text-[#58745b]"
            >
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      aria-label="Product pagination"
      className="mt-20 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="flex h-11 w-11 items-center justify-center border border-[#e0e3da] text-[#284831] transition-colors hover:bg-[#284831] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Previous page"
      >
        <Icon name="left" size={18} />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onChange(number)}
          aria-current={page === number ? "page" : undefined}
          className={`h-11 min-w-11 border px-3 text-sm font-medium transition-colors ${
            page === number
              ? "border-[#284831] bg-[#284831] text-white"
              : "border-[#e0e3da] text-[#687767] hover:border-[#284831]"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-11 w-11 items-center justify-center border border-[#e0e3da] text-[#284831] transition-colors hover:bg-[#284831] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next page"
      >
        <Icon name="right" size={18} />
      </button>
    </nav>
  );
}

function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[400px] flex-col items-center justify-center border border-[#e6e8df] bg-white px-6 py-16 text-center"
    >
      <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf0e9] text-[#284831]">
        <Icon name="search" size={28} />
      </div>

      <h3 className="font-serif text-4xl text-[#284831]">
        No products found.
      </h3>

      <p className="mt-5 max-w-[400px] text-[14px] leading-[1.9] text-[#7b8579]">
        Try changing your search, selecting another category, or
        clearing your filters.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 bg-[#284831] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
}

function MobileFilters({
  open,
  onClose,
  category,
  subcategory,
  onCategoryChange,
  onSubcategoryChange,
  availableOnly,
  onAvailableChange,
}) {
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/50 lg:hidden"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="fixed inset-y-0 left-0 z-[90] flex w-[min(90vw,380px)] flex-col bg-[#faf9f5] shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-[#e4e5dc] px-7 py-6">
              <h2 className="font-serif text-3xl text-[#284831]">
                Filters
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-10 w-10 items-center justify-center"
              >
                <Icon name="close" size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-6">
              <ShopSidebar
                mobile
                category={category}
                subcategory={subcategory}
                onCategoryChange={onCategoryChange}
                onSubcategoryChange={onSubcategoryChange}
                availableOnly={availableOnly}
                onAvailableChange={onAvailableChange}
              />
            </div>

            <div className="border-t border-[#e4e5dc] p-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-[#284831] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white"
              >
                View Products
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  const productSectionRef = useRef(null);

  const rawCategory = searchParams.get("category") || "all";

  const category = PRODUCT_CATEGORIES.some(
    (item) => item.slug === rawCategory
  )
    ? rawCategory
    : "all";

  const rawSubcategory = searchParams.get("subcategory") || "";

  const subcategory = PRODUCT_SUBCATEGORIES.some(
    (item) =>
      item.id === rawSubcategory &&
      (category === "all" || item.category === category)
  )
    ? rawSubcategory
    : "";

  const search = searchParams.get("search") || "";

  const filteredProducts = useMemo(
    () =>
      filterProducts({
        category,
        subcategory,
        search,
        sortBy,
        availableOnly,
      }),
    [category, subcategory, search, sortBy, availableOnly]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      ),
    [filteredProducts, currentPage]
  );

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== "all") {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    }

    setSearchParams(next);
    setPage(1);
  };

  const handleCategoryChange = (nextCategory) => {
    updateParams({
      category: nextCategory,
      subcategory: "",
    });
  };

  const handleSubcategoryChange = (nextSubcategory) => {
    updateParams({
      subcategory: nextSubcategory,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    updateParams({
      search: searchInput.trim(),
    });
  };

  const handleReset = () => {
    setSearchParams({});
    setSearchInput("");
    setAvailableOnly(false);
    setSortBy("featured");
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    setPage(nextPage);

    productSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const startResult =
    filteredProducts.length === 0
      ? 0
      : (currentPage - 1) * PAGE_SIZE + 1;

  const endResult = Math.min(
    currentPage * PAGE_SIZE,
    filteredProducts.length
  );

  return (
    <div className="overflow-x-clip bg-[#faf9f5]">
      <ShopHero category={category} />

      <CategoryTabs
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      <section
        ref={productSectionRef}
        className="scroll-mt-28 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
          <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b28b51]">
                Explore Our Products
              </p>

              <h2 className="font-serif text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
                Shop the Collection
              </h2>
            </div>

            <p className="max-w-[360px] text-[14px] leading-[1.9] text-[#798477]">
              Discover orchard-inspired products and seasonal favourites,
              carefully presented in one collection.
            </p>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-16">
            <ShopSidebar
              category={category}
              subcategory={subcategory}
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubcategoryChange}
              availableOnly={availableOnly}
              onAvailableChange={(value) => {
                setAvailableOnly(value);
                setPage(1);
              }}
            />

            <div className="min-w-0">
              <div className="mb-9 flex flex-col gap-5 border-b border-[#e4e5dc] pb-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center gap-2 border border-[#dce1d8] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#284831] lg:hidden"
                  >
                    <Icon name="filter" size={18} />
                    Filters
                  </button>

                  <p
                    aria-live="polite"
                    className="text-[13px] text-[#798477]"
                  >
                    Showing {startResult}–{endResult} of{" "}
                    {filteredProducts.length} products
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <form
                    onSubmit={handleSearch}
                    role="search"
                    className="relative flex min-w-0 flex-1 items-center sm:w-[210px] sm:flex-none"
                  >
                    <input
                      type="search"
                      value={searchInput}
                      onChange={(event) =>
                        setSearchInput(event.target.value)
                      }
                      placeholder="Search products..."
                      aria-label="Search products"
                      className="w-full border-b border-[#cbd2c7] bg-transparent py-3 pr-9 text-[13px] text-[#284831] outline-none placeholder:text-[#9ba49a] focus:border-[#284831]"
                    />

                    <button
                      type="submit"
                      aria-label="Submit product search"
                      className="absolute right-0 flex h-10 w-8 items-center justify-center text-[#284831]"
                    >
                      <Icon name="search" size={18} />
                    </button>
                  </form>

                  <div className="relative flex items-center gap-2">
                    <label
                      htmlFor="shop-sort"
                      className="hidden text-[12px] text-[#8b9589] xl:block"
                    >
                      Sort:
                    </label>

                    <select
                      id="shop-sort"
                      value={sortBy}
                      onChange={(event) => {
                        setSortBy(event.target.value);
                        setPage(1);
                      }}
                      className="max-w-[190px] cursor-pointer border-b border-[#cbd2c7] bg-transparent py-3 text-[12px] font-medium text-[#284831] outline-none focus:border-[#284831]"
                    >
                      {productSortOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                    <AnimatePresence mode="popLayout">
                      {visibleProducts.map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                  />
                </>
              ) : (
                <EmptyState onReset={handleReset} />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e2e5db] bg-[#eef0e9] px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-10 text-center md:flex-row md:text-left">
          <div>
            <Reveal>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b28b51]">
                A Little More About Us
              </p>

              <h2 className="font-serif text-[clamp(2.3rem,4.5vw,4.5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
                Rooted in the orchard.
              </h2>

              <p className="mt-5 max-w-[500px] text-[14px] leading-[1.9] text-[#788576]">
                Learn more about the story, people, and inspiration
                behind Greenview.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <Link
              to="/about"
              className="group inline-flex shrink-0 items-center gap-7 bg-[#284831] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
            >
              Discover Our Story

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Icon name="arrow" size={19} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <MobileFilters
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        category={category}
        subcategory={subcategory}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
        availableOnly={availableOnly}
        onAvailableChange={(value) => {
          setAvailableOnly(value);
          setPage(1);
        }}
      />
    </div>
  );
}
