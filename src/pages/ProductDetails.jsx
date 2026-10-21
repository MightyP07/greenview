
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import AgeVerification from "../components/AgeVerification";
import { useCart } from "../context/CartContext";

import {
  getProductBySlug,
  getRelatedProducts,
  PRODUCT_CATEGORIES,
  formatPrice,
  isPurchasable,
} from "../data/products";

const EASE = [0.22, 1, 0.36, 1];
const MAX_QUANTITY = 99;
const AGE_STORAGE_KEY = "greenview-age-confirmed";

function getAgeConfirmation() {
  try {
    return sessionStorage.getItem(AGE_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

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
    bag: (
      <>
        <path d="M4 8h16l-1 13H5L4 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 15a5 5 0 0 0 5 5c8 0 11-6 10-16Z" />
        <path d="M4 21c3-7 7-10 13-13" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v11H3zM14 10h4l3 4v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    close: (
      <>
        <path d="M5 5 19 19M19 5 5 19" />
      </>
    ),
    zoom: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5M10.5 7v7M7 10.5h7" />
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
  y = 35,
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

function ProductGallery({ product }) {
  const reducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const images = useMemo(() => {
    const collection =
      Array.isArray(product.images) && product.images.length
        ? product.images
        : [product.image];

    return [...new Set(collection.filter(Boolean))];
  }, [product]);

  const activeImage = images[activeIndex] || product.image;

  useEffect(() => {
    setActiveIndex(0);
    setZoomOpen(false);
  }, [product.id]);

  useEffect(() => {
    if (!zoomOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setZoomOpen(false);
      }

      if (images.length > 1 && event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }

      if (images.length > 1 && event.key === "ArrowLeft") {
        setActiveIndex(
          (current) => (current - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomOpen, images.length]);

  const changeImage = (direction) => {
    setActiveIndex(
      (current) =>
        (current + direction + images.length) % images.length
    );
  };

  return (
    <>
      <div className="min-w-0">
        <Reveal>
          <div className="relative aspect-[4/4.6] overflow-hidden bg-[#eceee6] sm:aspect-[4/4.3]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={`${product.name} - image ${activeIndex + 1}`}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, scale: 1.045 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  reducedMotion
                    ? undefined
                    : { opacity: 0, scale: 0.985 }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.55,
                  ease: EASE,
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {product.badge && (
              <span className="absolute left-5 top-5 bg-[#faf9f5] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#284831]">
                {product.badge}
              </span>
            )}

            {product.requiresAgeVerification && (
              <span className="absolute right-5 top-5 bg-[#284831] px-4 py-2.5 text-xs font-semibold text-white">
                18+
              </span>
            )}

            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              aria-label="View larger product image"
              className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center bg-white text-[#284831] shadow-lg transition-colors hover:bg-[#e5c18a]"
            >
              <Icon name="zoom" size={20} />
            </button>

            {images.length > 1 && (
              <div className="absolute bottom-5 left-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeImage(-1)}
                  aria-label="Previous product image"
                  className="flex h-11 w-11 items-center justify-center bg-white/95 text-[#284831] transition-colors hover:bg-[#e5c18a]"
                >
                  <Icon name="left" size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => changeImage(1)}
                  aria-label="Next product image"
                  className="flex h-11 w-11 items-center justify-center bg-white/95 text-[#284831] transition-colors hover:bg-[#e5c18a]"
                >
                  <Icon name="right" size={18} />
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {images.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View product image ${index + 1}`}
                aria-pressed={activeIndex === index}
                className={`relative aspect-square overflow-hidden border-2 transition-all ${
                  activeIndex === index
                    ? "border-[#284831]"
                    : "border-transparent hover:border-[#b28b51]"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} image viewer`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101b14]/95 p-5 sm:p-10"
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white hover:text-[#284831] sm:right-9 sm:top-9"
            >
              <Icon name="close" size={24} />
            </button>

            <motion.img
              key={activeImage}
              src={activeImage}
              alt={product.name}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, scale: 0.94 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="max-h-[82vh] max-w-full object-contain"
            />

            {images.length > 1 && (
              <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-5 text-white">
                <button
                  type="button"
                  onClick={() => changeImage(-1)}
                  aria-label="Previous image"
                  className="p-3"
                >
                  <Icon name="left" size={23} />
                </button>

                <span className="text-xs tracking-[0.15em]">
                  {activeIndex + 1} / {images.length}
                </span>

                <button
                  type="button"
                  onClick={() => changeImage(1)}
                  aria-label="Next image"
                  className="p-3"
                >
                  <Icon name="right" size={23} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function QuantitySelector({ quantity, onChange, disabled }) {
  return (
    <div
      className={`inline-flex h-[58px] items-center border border-[#d8ded4] ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-full w-12 items-center justify-center text-[#284831] transition-colors hover:bg-[#edf0e9] disabled:cursor-not-allowed"
      >
        <Icon name="minus" size={17} />
      </button>

      <span className="flex h-full w-12 items-center justify-center text-sm font-semibold text-[#284831]">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() =>
          onChange(Math.min(MAX_QUANTITY, quantity + 1))
        }
        disabled={disabled || quantity >= MAX_QUANTITY}
        aria-label="Increase quantity"
        className="flex h-full w-12 items-center justify-center text-[#284831] transition-colors hover:bg-[#edf0e9] disabled:cursor-not-allowed"
      >
        <Icon name="plus" size={17} />
      </button>
    </div>
  );
}

function ProductInformation({ product, ageConfirmed }) {
  const { addToCart, getItemQuantity } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const purchasable = isPurchasable(product);
  const ageRestricted = Boolean(product.requiresAgeVerification);
  const canAddToCart =
    purchasable && (!ageRestricted || ageConfirmed);

  const category = PRODUCT_CATEGORIES.find(
    (item) => item.slug === product.category
  );

  const currentCartQuantity = getItemQuantity(product.id);

  useEffect(() => {
    setQuantity(1);
    setFeedback(null);
    setActiveTab("description");
  }, [product.id]);

  useEffect(() => {
    if (!feedback) return;

    const timeout = window.setTimeout(
      () => setFeedback(null),
      3500
    );

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const handleAddToCart = () => {
    if (ageRestricted && !ageConfirmed) {
      setFeedback({
        success: false,
        message:
          "Please confirm that you're 18 or older before continuing.",
      });
      return;
    }

    const result = addToCart(product.id, quantity);

    setFeedback({
      success: result.success,
      message: result.message,
    });
  };

  return (
    <div className="lg:pl-8 xl:pl-16">
      <Reveal>
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b28b51]">
          {category?.name || "Greenview Collection"}
        </p>

        <h1 className="font-serif text-[clamp(2.8rem,5vw,5.5rem)] leading-[1.08] tracking-[-0.05em] text-[#284831]">
          {product.name}
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <span className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium text-[#284831]">
            {formatPrice(product.price, product.currency)}
          </span>

          {product.compareAtPrice != null &&
            product.price != null &&
            product.compareAtPrice > product.price && (
              <span className="text-lg text-[#9ba69a] line-through">
                {formatPrice(
                  product.compareAtPrice,
                  product.currency
                )}
              </span>
            )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span
            className={`h-2 w-2 rounded-full ${
              purchasable
                ? "bg-[#5f9469]"
                : "bg-[#c79c64]"
            }`}
          />

          <p
            className={`text-[12px] font-medium ${
              purchasable
                ? "text-[#527b59]"
                : "text-[#a57e4f]"
            }`}
          >
            {purchasable
              ? "Available to order"
              : product.availabilityLabel ||
                "Currently unavailable"}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-9 border-t border-[#e2e6dd] pt-8">
          <p className="text-[15px] leading-[1.95] text-[#728071]">
            {product.shortDescription || product.description}
          </p>
        </div>
      </Reveal>

      {ageRestricted && ageConfirmed && (
        <Reveal delay={0.15}>
          <div className="mt-7 inline-flex items-center gap-3 border border-[#d8e5d6] bg-[#edf4eb] px-4 py-3 text-[12px] font-medium text-[#527b59]">
            <Icon name="check" size={17} />
            <span>18+ · Confirmed for browsing</span>
          </div>
        </Reveal>
      )}

      {ageRestricted && !ageConfirmed && (
        <Reveal delay={0.15}>
          <div className="mt-7 flex gap-4 border border-[#e4d6be] bg-[#f8f2e8] px-5 py-5">
            <div className="shrink-0 text-[#a77f49]">
              <Icon name="shield" size={23} />
            </div>

            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.13em] text-[#735b3a]">
                Age-Restricted Product
              </h3>

              <p className="mt-2 text-[13px] leading-[1.8] text-[#927a5b]">
                Please confirm that you're at least 18 years
                old to browse this alcoholic product.
              </p>
            </div>
          </div>
        </Reveal>
      )}

      {Array.isArray(product.options) &&
        product.options.length > 0 && (
          <Reveal delay={0.18}>
            <div className="mt-8">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#284831]">
                Available Options
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.options.map((option, index) => (
                  <span
                    key={option.id || index}
                    className="border border-[#d9dfd5] px-5 py-3 text-[13px] text-[#657563]"
                  >
                    {option.label ||
                      option.name ||
                      String(option)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}

      <Reveal delay={0.2}>
        <div className="mt-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#284831]">
            Quantity
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              disabled={!canAddToCart}
            />

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`group flex min-h-[58px] flex-1 items-center justify-center gap-4 px-7 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors sm:flex-none sm:px-11 ${
                canAddToCart
                  ? "bg-[#284831] text-white hover:bg-[#b28b51]"
                  : "cursor-not-allowed bg-[#dce2d9] text-[#899688]"
              }`}
            >
              <Icon name="bag" size={19} />

              {canAddToCart
                ? "Add to Cart"
                : !purchasable
                ? "Unavailable"
                : "Age Confirmation Required"}
            </button>
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                role="status"
                className={`mt-5 flex items-center gap-3 px-5 py-4 text-[13px] ${
                  feedback.success
                    ? "bg-[#edf3eb] text-[#456e4b]"
                    : "bg-[#f8eee7] text-[#9c684a]"
                }`}
              >
                <Icon
                  name={feedback.success ? "check" : "info"}
                  size={18}
                />
                {feedback.message}
              </motion.div>
            )}
          </AnimatePresence>

          {currentCartQuantity > 0 && (
            <Link
              to="/cart"
              className="mt-5 inline-flex items-center gap-3 text-[12px] font-medium text-[#284831] underline underline-offset-4"
            >
              {currentCartQuantity} in your cart. View cart
              <Icon name="arrow" size={17} />
            </Link>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-12 grid gap-4 border-y border-[#e2e6dd] py-8 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Icon
              name="leaf"
              size={22}
              className="text-[#a88b5c]"
            />
            <span className="text-[12px] text-[#6c796b]">
              Orchard-inspired selection
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Icon
              name="truck"
              size={22}
              className="text-[#a88b5c]"
            />
            <span className="text-[12px] text-[#6c796b]">
              Contact us for delivery options
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-10">
          <div className="flex gap-8 border-b border-[#e2e6dd]">
            {[
              { id: "description", label: "Description" },
              { id: "details", label: "Product Details" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-5 text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors ${
                  activeTab === tab.id
                    ? "text-[#284831]"
                    : "text-[#a0aaa0]"
                }`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <motion.span
                    layoutId="product-details-tab"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[#b28b51]"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="min-h-[140px] py-7"
            >
              {activeTab === "description" ? (
                <p className="text-[14px] leading-[2] text-[#728071]">
                  {product.description}
                </p>
              ) : (
                <dl className="space-y-4 text-[13px]">
                  <div className="flex justify-between gap-5 border-b border-[#edf0e9] pb-3">
                    <dt className="text-[#8a9689]">
                      Category
                    </dt>
                    <dd className="text-right font-medium text-[#284831]">
                      {category?.name || product.category}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-5 border-b border-[#edf0e9] pb-3">
                    <dt className="text-[#8a9689]">
                      Product Code
                    </dt>
                    <dd className="text-right font-medium text-[#284831]">
                      {product.id}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-5 border-b border-[#edf0e9] pb-3">
                    <dt className="text-[#8a9689]">
                      Availability
                    </dt>
                    <dd className="text-right font-medium text-[#284831]">
                      {product.availabilityLabel ||
                        (purchasable
                          ? "Available"
                          : "Unavailable")}
                    </dd>
                  </div>

                  {ageRestricted && (
                    <div className="flex justify-between gap-5 pb-3">
                      <dt className="text-[#8a9689]">
                        Age Restriction
                      </dt>
                      <dd className="text-right font-medium text-[#284831]">
                        18+
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </div>
  );
}

function RelatedProducts({ product }) {
  const related = getRelatedProducts(product, 4);

  if (related.length === 0) return null;

  return (
    <section className="bg-[#f1f2eb] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b28b51]">
              Discover More
            </p>

            <h2 className="font-serif text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
              You May Also Like
            </h2>
          </div>

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-4 border-b border-[#284831] pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
          >
            View All Products
            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={18} />
            </span>
          </Link>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <Link
                to={`/shop/${item.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/3.7] overflow-hidden bg-[#e4e7dd]">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />

                  {item.badge && (
                    <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#284831]">
                      {item.badge}
                    </span>
                  )}

                  {item.requiresAgeVerification && (
                    <span className="absolute right-4 top-4 bg-[#284831] px-3 py-2 text-[10px] font-semibold text-white">
                      18+
                    </span>
                  )}

                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center bg-white text-[#284831] transition-colors group-hover:bg-[#e5c18a]">
                    <Icon name="diagonal" size={18} />
                  </span>
                </div>

                <div className="pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#b28b51]">
                    {PRODUCT_CATEGORIES.find(
                      (category) =>
                        category.slug === item.category
                    )?.name || item.category}
                  </p>

                  <h3 className="mt-2 font-serif text-[24px] leading-tight text-[#284831] transition-colors group-hover:text-[#b28b51]">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-[14px] font-semibold text-[#284831]">
                    {formatPrice(item.price, item.currency)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductNotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b28b51]">
        Greenview Orchard
      </p>

      <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] text-[#284831]">
        Product Not Found
      </h1>

      <p className="mt-6 max-w-[470px] text-[15px] leading-[1.9] text-[#728071]">
        The product you're looking for may have been removed
        or is no longer available.
      </p>

      <Link
        to="/shop"
        className="mt-10 inline-flex items-center gap-5 bg-[#284831] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
      >
        <Icon name="left" size={18} />
        Return to Shop
      </Link>
    </section>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();

  const product = getProductBySlug(slug);

  const [ageConfirmed, setAgeConfirmed] = useState(
    getAgeConfirmation
  );

  useEffect(() => {
    setAgeConfirmed(getAgeConfirmation());
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    document.title = product
      ? `${product.name} | Greenview Orchard`
      : "Product Not Found | Greenview Orchard";

    return () => {
      document.title = "Greenview Orchard";
    };
  }, [product]);

  if (!product) {
    return <ProductNotFound />;
  }

  const category = PRODUCT_CATEGORIES.find(
    (item) => item.slug === product.category
  );

  return (
    <div className="overflow-x-clip bg-[#faf9f5]">
      <AgeVerification
        key={product.id}
        required={product.requiresAgeVerification}
        onVerified={() => setAgeConfirmed(true)}
      />

      <div className="border-b border-[#e6e8e0]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 px-6 py-6 text-[11px] text-[#859082] sm:px-10 lg:px-14">
          <Link
            to="/"
            className="transition-colors hover:text-[#284831]"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            to="/shop"
            className="transition-colors hover:text-[#284831]"
          >
            Shop
          </Link>

          <span>/</span>

          <Link
            to={`/shop?category=${product.category}`}
            className="transition-colors hover:text-[#284831]"
          >
            {category?.name || product.category}
          </Link>

          <span>/</span>

          <span className="font-medium text-[#284831]">
            {product.name}
          </span>
        </div>
      </div>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-14 xl:gap-16">
          <ProductGallery product={product} />

          <ProductInformation
            product={product}
            ageConfirmed={ageConfirmed}
          />
        </div>
      </section>

      <RelatedProducts product={product} />

      <section className="bg-[#284831] px-6 py-20 text-center sm:py-24">
        <Reveal>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e5c18a]">
            Explore Greenview
          </p>

          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] tracking-[-0.045em] text-white">
            Discover more from
            <br />
            <span className="italic text-[#e5c18a]">
              the orchard.
            </span>
          </h2>

          <Link
            to="/shop"
            className="group mt-9 inline-flex items-center gap-6 border border-[#e5c18a] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e5c18a] transition-colors hover:bg-[#e5c18a] hover:text-[#284831]"
          >
            Continue Shopping

            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={19} />
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
