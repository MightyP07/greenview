
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import {
  IS_DEMO_STORE,
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  filterProducts,
  formatPrice,
  isPurchasable,
  productSortOptions,
} from "../data/products";

import { useCart } from "../context/CartContext";

const EASE = [0.22, 1, 0.36, 1];
const PAGE_SIZE = 9;

const CATEGORY_IMAGES = {
  all:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
  fruit:
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=85",
  wine:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85",
  gifts:
    "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=85",
};

const CATEGORY_LABELS = {
  all: "The complete collection",
  fruit: "Fresh from the orchard",
  wine: "A considered collection",
  gifts: "Thoughtfully chosen",
};

function IconButton({ children, onClick, label, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-11 w-11 items-center justify-center border border-[#dedfd6] bg-white text-[#284831] transition-colors hover:border-[#284831] ${className}`}
    >
      {children}
    </button>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#b28b51]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-[32px] leading-[1.1] tracking-[-0.035em] text-[#213b2a] sm:text-[42px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#718071]">
          {description}
        </p>
      )}
    </div>
  );
}

function DemoNotice() {
  if (!IS_DEMO_STORE) return null;

  return (
    <section
      aria-label="Demonstration store notice"
      className="border-b border-[#e5ddca] bg-[#fff8e9]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex items-start gap-3">
          <Sparkles
            size={17}
            className="mt-0.5 shrink-0 text-[#a77d3f]"
          />
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#71542c]">
              Demonstration storefront
            </p>
            <p className="mt-1 text-[12px] leading-6 text-[#856b47]">
              Products, prices and availability are illustrative.
              You can explore the shop and test the cart, but no
              purchases or payments can be completed.
            </p>
          </div>
        </div>
        <span className="shrink-0 self-start border border-[#e0cba8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a6634]">
          Demo only
        </span>
      </div>
    </section>
  );
}

function ShopHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#102519]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=2200&q=85"
          alt="Illustrative orchard landscape"
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102519]/95 via-[#102519]/75 to-[#102519]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102519]/45 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] items-center px-5 py-24 sm:px-8 lg:min-h-[520px] lg:px-12">
        <div className="max-w-[780px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-[#d7b47b]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e5c18a]">
              Greenview Orchard & Estate
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: EASE,
            }}
            className="font-serif text-[clamp(3.6rem,8vw,7.8rem)] leading-[0.98] tracking-[-0.055em] text-white"
          >
            The Orchard
            <br />
            <span className="italic text-[#e5c18a]">
              Collection.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: EASE,
            }}
            className="mt-8 max-w-[530px] text-[14px] leading-8 text-white/75 sm:text-[16px]"
          >
            Discover a thoughtfully presented collection of
            orchard-inspired fruit, wines and gifts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/65"
          >
            <span>Home</span>
            <ChevronRight size={13} />
            <span className="text-[#e5c18a]">Shop</span>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[-25px] right-[-20px] select-none font-serif text-[clamp(100px,19vw,330px)] leading-none tracking-[-0.08em] text-white/[0.035]">
        harvest
      </div>
    </section>
  );
}

function CategoryCard({ category, active, onClick, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative isolate h-[210px] overflow-hidden text-left sm:h-[240px] ${
        active
          ? "ring-2 ring-[#b28b51] ring-offset-4"
          : ""
      }`}
    >
      <img
        src={CATEGORY_IMAGES[category.id]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#102519]/90 via-[#102519]/25 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
        <span className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#e5c18a]">
          {CATEGORY_LABELS[category.id]}
        </span>

        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-serif text-[24px] leading-tight text-white sm:text-[27px]">
              {category.name}
            </h3>
            <p className="mt-2 text-[11px] text-white/70">
              {count} {count === 1 ? "product" : "products"}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-colors group-hover:border-[#e5c18a] group-hover:bg-[#e5c18a] group-hover:text-[#213b2a]">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </button>
  );
}

function FilterContents({
  category,
  subcategory,
  availableOnly,
  onCategoryChange,
  onSubcategoryChange,
  onAvailableChange,
  onClear,
  counts,
}) {
  const subcategories = PRODUCT_SUBCATEGORIES.filter(
    (item) =>
      category === "all" || item.category === category
  );

  return (
    <div className="space-y-9">
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#284831]">
            Categories
          </h3>
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] text-[#9a7a4c] underline underline-offset-4 hover:text-[#284831]"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-1">
          {PRODUCT_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onCategoryChange(item.id)}
              className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-[13px] transition-colors ${
                category === item.id
                  ? "bg-[#284831] text-white"
                  : "text-[#667365] hover:bg-[#eff1e9] hover:text-[#284831]"
              }`}
            >
              <span>{item.name}</span>
              <span
                className={`text-[11px] ${
                  category === item.id
                    ? "text-white/75"
                    : "text-[#a1a99e]"
                }`}
              >
                {counts[item.id] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#e7e9e1] pt-7">
        <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#284831]">
          Product Type
        </h3>

        <div className="space-y-1">
          {subcategories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onSubcategoryChange(
                  subcategory === item.id ? "" : item.id,
                  item.category
                )
              }
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-[12px] transition-colors ${
                subcategory === item.id
                  ? "bg-[#eef1e9] font-semibold text-[#284831]"
                  : "text-[#718071] hover:bg-[#f3f4ee] hover:text-[#284831]"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                  subcategory === item.id
                    ? "border-[#284831] bg-[#284831] text-white"
                    : "border-[#c8cec3]"
                }`}
              >
                {subcategory === item.id && (
                  <Check size={11} />
                )}
              </span>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#e7e9e1] pt-7">
        <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#284831]">
          Availability
        </h3>

        <label className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[12px] text-[#718071]">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(event) =>
              onAvailableChange(event.target.checked)
            }
            className="h-4 w-4 accent-[#284831]"
          />
          {IS_DEMO_STORE
            ? "Available in demo"
            : "Available products only"}
        </label>
      </div>

      <div className="border border-[#e7e6dc] bg-[#f7f7f1] p-5">
        <Sparkles
          size={19}
          className="mb-3 text-[#b28b51]"
        />
        <p className="font-serif text-[21px] text-[#284831]">
          A little something special.
        </p>
        <p className="mt-2 text-[12px] leading-6 text-[#7c8778]">
          Explore our orchard-inspired gifts and seasonal
          collections.
        </p>
        <button
          type="button"
          onClick={() => onCategoryChange("gifts")}
          className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#284831]"
        >
          Browse gifts
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, index, onAdd }) {
  const purchasable = isPurchasable(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index % 3, 2) * 0.07,
        ease: EASE,
      }}
      className="group min-w-0"
    >
      <div className="relative aspect-[0.88] overflow-hidden bg-[#f0f1eb]">
        <Link
          to={`/shop/${product.slug}`}
          className="block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-[#102519]/0 transition-colors duration-500 group-hover:bg-[#102519]/[0.07]" />
        </Link>

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badge && (
            <span className="bg-white/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#284831] backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {product.requiresAgeVerification && (
            <span className="bg-[#284831] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white">
              18+
            </span>
          )}
        </div>

        {purchasable && !product.requiresAgeVerification && (
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-white px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#284831] shadow-lg transition-colors hover:bg-[#284831] hover:text-white sm:translate-y-[calc(100%+16px)] sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus:translate-y-0 sm:focus:opacity-100"
          >
            <ShoppingBag size={15} />
            {IS_DEMO_STORE ? "Add to demo cart" : "Add to cart"}
          </button>
        )}

        {product.requiresAgeVerification && (
          <Link
            to={`/shop/${product.slug}`}
            className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-white px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#284831] shadow-lg transition-colors hover:bg-[#284831] hover:text-white sm:translate-y-[calc(100%+16px)] sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus:translate-y-0 sm:focus:opacity-100"
          >
            View details
            <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <div className="pt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b28b51]">
            {PRODUCT_CATEGORIES.find(
              (item) => item.id === product.category
            )?.name ?? product.category}
          </span>

          {product.featured && (
            <span className="text-[9px] uppercase tracking-[0.1em] text-[#9ba69a]">
              Featured
            </span>
          )}
        </div>

        <Link
          to={`/shop/${product.slug}`}
          className="block"
        >
          <h3 className="font-serif text-[23px] leading-[1.2] tracking-[-0.02em] text-[#284831] transition-colors hover:text-[#b28b51]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-[44px] text-[12px] leading-[22px] text-[#829080]">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e7e9e1] pt-4">
          <div>
            <span className="text-[16px] font-semibold text-[#284831]">
              {formatPrice(product.price)}
            </span>
            {IS_DEMO_STORE && (
              <p className="mt-1 text-[10px] text-[#9b8a6c]">
                Illustrative price
              </p>
            )}
          </div>

          <Link
            to={`/shop/${product.slug}`}
            aria-label={`View ${product.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe4da] text-[#284831] transition-all hover:border-[#284831] hover:bg-[#284831] hover:text-white"
          >
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      className="mt-16 flex flex-wrap items-center justify-center gap-2"
      aria-label="Product pagination"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className="flex h-11 w-11 items-center justify-center border border-[#dfe4da] text-[#284831] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={17} />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onChange(number)}
          aria-label={`Page ${number}`}
          aria-current={page === number ? "page" : undefined}
          className={`flex h-11 w-11 items-center justify-center border text-[12px] font-semibold transition-colors ${
            page === number
              ? "border-[#284831] bg-[#284831] text-white"
              : "border-[#dfe4da] bg-white text-[#284831] hover:border-[#284831]"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className="flex h-11 w-11 items-center justify-center border border-[#dfe4da] text-[#284831] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={17} />
      </button>
    </nav>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const categoryParam = searchParams.get("category") || "all";
  const subcategoryParam = searchParams.get("subcategory") || "";

  const category = PRODUCT_CATEGORIES.some(
    (item) => item.id === categoryParam
  )
    ? categoryParam
    : "all";

  const subcategory = PRODUCT_SUBCATEGORIES.some(
    (item) => item.id === subcategoryParam
  )
    ? subcategoryParam
    : "";

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    document.title = "Shop | Greenview Orchard";
  }, []);

  useEffect(() => {
    setPage(1);
  }, [category, subcategory, search, sortBy, availableOnly]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMobileFiltersOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [mobileFiltersOpen]);

  const updateFilters = (nextCategory, nextSubcategory = "") => {
    const next = new URLSearchParams();

    if (nextCategory !== "all") {
      next.set("category", nextCategory);
    }

    if (nextSubcategory) {
      next.set("subcategory", nextSubcategory);
    }

    setSearchParams(next);
  };

  const changeCategory = (nextCategory) => {
    updateFilters(nextCategory, "");
  };

  const changeSubcategory = (nextSubcategory, parentCategory) => {
    updateFilters(
      category === "all" ? parentCategory : category,
      nextSubcategory
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSortBy("featured");
    setAvailableOnly(false);
    updateFilters("all", "");
  };

  const categoryCounts = useMemo(() => {
    const allProducts = filterProducts();

    return PRODUCT_CATEGORIES.reduce((counts, item) => {
      counts[item.id] =
        item.id === "all"
          ? allProducts.length
          : allProducts.filter(
              (product) => product.category === item.id
            ).length;

      return counts;
    }, {});
  }, []);

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

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const activeFilterCount =
    Number(category !== "all") +
    Number(Boolean(subcategory)) +
    Number(availableOnly);

  const handleAdd = (product) => {
    if (!isPurchasable(product)) return;

    if (product.requiresAgeVerification) {
      return;
    }

    addToCart(product.id, 1);
    setAddedProduct(product.name);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);

    document
      .getElementById("shop-products")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="overflow-hidden bg-[#faf9f5]">
      <DemoNotice />
      <ShopHero />

      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Explore by collection"
            title={
              <>
                Find your <em>favourite.</em>
              </>
            }
            description="Browse fresh fruit, orchard-inspired wines and gifts in our demonstration collection."
          />

          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9b9f92]">
            {categoryCounts.all} curated examples
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {PRODUCT_CATEGORIES.map((item) => (
            <CategoryCard
              key={item.id}
              category={item}
              active={category === item.id}
              count={categoryCounts[item.id]}
              onClick={() => changeCategory(item.id)}
            />
          ))}
        </div>
      </section>

      <section
        id="shop-products"
        className="scroll-mt-28 border-t border-[#e9eae3] bg-white"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Shop the collection"
              title={
                category === "all"
                  ? "All products."
                  : `${PRODUCT_CATEGORIES.find(
                      (item) => item.id === category
                    )?.name}.`
              }
              description="Browse, discover and build a demo cart using the illustrative collection."
            />

            <span className="text-[12px] text-[#899387]">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </span>
          </div>

          <div className="mb-10 flex flex-col gap-4 border-y border-[#e8ebe4] py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 border border-[#dfe4da] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#284831] lg:hidden"
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#284831] text-[10px] text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="relative min-w-0 flex-1 md:w-[310px] md:flex-none">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca79a]"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search the collection..."
                  aria-label="Search products"
                  className="h-12 w-full border border-[#e0e4db] bg-[#fafbf8] pl-11 pr-4 text-[12px] text-[#284831] outline-none transition-colors placeholder:text-[#9ca79a] focus:border-[#284831]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-end">
              <span className="hidden text-[11px] text-[#929d90] sm:inline">
                {filteredProducts.length} results
              </span>

              <div className="relative min-w-[200px] flex-1 md:flex-none">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  aria-label="Sort products"
                  className="h-12 w-full appearance-none border border-[#e0e4db] bg-white pl-4 pr-10 text-[12px] text-[#284831] outline-none focus:border-[#284831]"
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
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718071]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] xl:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <FilterContents
                  category={category}
                  subcategory={subcategory}
                  availableOnly={availableOnly}
                  onCategoryChange={changeCategory}
                  onSubcategoryChange={changeSubcategory}
                  onAvailableChange={setAvailableOnly}
                  onClear={clearFilters}
                  counts={categoryCounts}
                />
              </div>
            </aside>

            <div className="min-w-0">
              {visibleProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-7">
                    {visibleProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        onAdd={handleAdd}
                      />
                    ))}
                  </div>

                  <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                  />

                  <p className="mt-7 text-center text-[11px] text-[#9aa397]">
                    Showing{" "}
                    {(currentPage - 1) * PAGE_SIZE + 1}
                    {" - "}
                    {Math.min(
                      currentPage * PAGE_SIZE,
                      filteredProducts.length
                    )}{" "}
                    of {filteredProducts.length} products
                  </p>
                </>
              ) : (
                <div className="flex min-h-[440px] flex-col items-center justify-center border border-[#e8ebe4] bg-[#fafbf8] px-6 text-center">
                  <Search
                    size={30}
                    strokeWidth={1.2}
                    className="mb-6 text-[#b28b51]"
                  />
                  <h3 className="font-serif text-[34px] text-[#284831]">
                    Nothing in the basket yet.
                  </h3>
                  <p className="mt-3 max-w-[340px] text-[13px] leading-7 text-[#849081]">
                    We couldn't find a product matching your
                    filters. Try a different category or search.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-7 bg-[#284831] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#b28b51]"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#213b2a]">
        <div className="pointer-events-none absolute -right-10 top-0 select-none font-serif text-[230px] leading-none text-white/[0.035]">
          G.
        </div>

        <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:px-12 lg:py-24">
          <div className="max-w-[720px]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e5c18a]">
              Beyond the collection
            </p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.05] tracking-[-0.045em] text-white">
              There is more to
              <br />
              <span className="italic text-[#e5c18a]">
                discover.
              </span>
            </h2>
            <p className="mt-5 max-w-[480px] text-[13px] leading-7 text-white/65">
              Learn more about the orchard, explore the fruit
              stall and discover the Greenview story.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex shrink-0 items-center gap-4 border border-white/45 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#e5c18a] hover:bg-[#e5c18a] hover:text-[#213b2a]"
          >
            Explore Our Story
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileFiltersOpen(false)
              }
              className="fixed inset-0 z-[80] bg-[#102519]/55 lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.3,
                ease: EASE,
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
              className="fixed inset-y-0 left-0 z-[90] flex w-[min(90vw,390px)] flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#e7e9e1] px-6 py-5">
                <div className="flex items-center gap-3">
                  <Filter
                    size={18}
                    className="text-[#b28b51]"
                  />
                  <h2 className="font-serif text-[26px] text-[#284831]">
                    Filters
                  </h2>
                </div>

                <IconButton
                  label="Close filters"
                  onClick={() =>
                    setMobileFiltersOpen(false)
                  }
                >
                  <X size={18} />
                </IconButton>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-7">
                <FilterContents
                  category={category}
                  subcategory={subcategory}
                  availableOnly={availableOnly}
                  onCategoryChange={changeCategory}
                  onSubcategoryChange={changeSubcategory}
                  onAvailableChange={setAvailableOnly}
                  onClear={clearFilters}
                  counts={categoryCounts}
                />
              </div>

              <div className="border-t border-[#e7e9e1] p-6">
                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(false)
                  }
                  className="w-full bg-[#284831] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white"
                >
                  Show {filteredProducts.length} products
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addedProduct && (
          <motion.div
            key={addedProduct}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            className="fixed bottom-5 left-5 right-5 z-[100] max-w-[420px] border border-[#dce5d8] bg-white p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] sm:left-auto sm:right-6"
            role="status"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9f1e7] text-[#284831]">
                <Check size={17} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-[#284831]">
                  Added to demo cart
                </p>
                <p className="mt-1 text-[12px] text-[#718071]">
                  {addedProduct}
                </p>

                <Link
                  to="/cart"
                  onClick={() => setAddedProduct(null)}
                  className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#a77d3f]"
                >
                  View cart
                  <ArrowRight size={13} />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setAddedProduct(null)}
                aria-label="Dismiss notification"
                className="text-[#8c978b] hover:text-[#284831]"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}