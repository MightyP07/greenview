
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

const EASE = [0.22, 1, 0.36, 1];

function Icon({ name, size = 20, className = "" }) {
  const paths = {
    arrow: (
      <>
        <path d="M4 12h16" />
        <path d="m13 5 7 7-7 7" />
      </>
    ),
    left: (
      <>
        <path d="M20 12H4" />
        <path d="m11 19-7-7 7-7" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" />
        <path d="M10 11v6M14 11v6" />
      </>
    ),
    bag: (
      <>
        <path d="M4 8h16l-1 13H5L4 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="M5 5 19 19M19 5 5 19" />,
    leaf: (
      <>
        <path d="M20 4C11 4 5 7 5 15a5 5 0 0 0 5 5c8 0 11-6 10-16Z" />
        <path d="M4 21c3-7 7-10 13-13" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
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

function Reveal({ children, delay = 0, className = "" }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
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

function CartHero({ cartCount }) {
  return (
    <section className="relative overflow-hidden bg-[#284831] px-6 py-20 sm:px-10 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-6 -top-6 h-60 w-60 rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-[1440px]">
        <Reveal>
          <div className="mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-white/55">
            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-[#e5c18a]">Your Cart</span>
          </div>

          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.27em] text-[#e5c18a]">
            Greenview Orchard Shop
          </p>

          <h1 className="font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[1.05] tracking-[-0.055em] text-white">
            Your Cart<span className="text-[#e5c18a]">.</span>
          </h1>

          <p className="mt-6 text-[14px] leading-[1.9] text-white/70">
            {cartCount === 0
              ? "Your shopping bag is waiting for something special."
              : `${cartCount} ${
                  cartCount === 1 ? "item" : "items"
                } in your shopping bag.`}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function EmptyCart() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto flex max-w-[650px] flex-col items-center text-center">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative mb-10 flex h-32 w-32 items-center justify-center rounded-full bg-[#edf0e9] text-[#284831]"
        >
          <Icon name="bag" size={49} />

          <span className="absolute -right-2 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#e5c18a] text-[#284831]">
            <Icon name="leaf" size={22} />
          </span>
        </motion.div>

        <Reveal>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b28b51]">
            Nothing in Your Bag Yet
          </p>

          <h2 className="font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-[1.12] tracking-[-0.045em] text-[#284831]">
            Your cart is
            <br />
            <span className="italic">currently empty.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[430px] text-[15px] leading-[1.95] text-[#7a8778]">
            Explore our orchard collection, discover seasonal
            favourites, and find something worth bringing home.
          </p>

          <Link
            to="/shop"
            className="group mt-10 inline-flex items-center gap-6 bg-[#284831] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#b28b51]"
          >
            Explore the Shop

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="arrow" size={19} />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="inline-flex h-11 items-center border border-[#dce1d7]">
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center text-[#284831] transition-colors hover:bg-[#edf0e9]"
      >
        <Icon name="minus" size={15} />
      </button>

      <span className="flex h-full w-10 items-center justify-center text-[13px] font-semibold text-[#284831]">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= 99}
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center text-[#284831] transition-colors hover:bg-[#edf0e9] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Icon name="plus" size={15} />
      </button>
    </div>
  );
}

function CartItem({ item, onRequestRemove }) {
  const reducedMotion = useReducedMotion();

  const {
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const { product, quantity, lineTotal } = item;

  return (
    <motion.article
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        reducedMotion
          ? undefined
          : { opacity: 0, x: -35, height: 0 }
      }
      transition={{ duration: 0.35, ease: EASE }}
      className="grid grid-cols-[105px_minmax(0,1fr)] gap-5 border-b border-[#e3e7de] py-8 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8"
    >
      <Link
        to={`/shop/${product.slug}`}
        className="block aspect-[3/3.6] overflow-hidden bg-[#e9ece5]"
      >
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </Link>

      <div className="flex min-w-0 flex-col justify-between gap-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#b28b51]">
                {product.category === "fruit"
                  ? "Fresh Fruit"
                  : product.category === "wine"
                  ? "Wines & Fruit Ports"
                  : "Gifts & Hampers"}
              </p>

              <Link
                to={`/shop/${product.slug}`}
                className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] leading-tight text-[#284831] transition-colors hover:text-[#b28b51]"
              >
                {product.name}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => onRequestRemove(product.id)}
              aria-label={`Remove ${product.name}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center text-[#9ca79b] transition-colors hover:text-red-700"
            >
              <Icon name="trash" size={19} />
            </button>
          </div>

          <p className="mt-3 line-clamp-2 text-[13px] leading-[1.8] text-[#839081]">
            {product.shortDescription}
          </p>

          {product.requiresAgeVerification && (
            <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium text-[#a47d4b]">
              <Icon name="shield" size={16} />
              Age-restricted product · 18+
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] text-[#94a091]">
              Quantity
            </p>

            <QuantityControl
              quantity={quantity}
              onIncrement={() =>
                incrementQuantity(product.id)
              }
              onDecrement={() =>
                decrementQuantity(product.id)
              }
            />
          </div>

          <div className="text-right">
            <p className="mb-2 text-[11px] text-[#94a091]">
              Item total
            </p>

            <p className="text-lg font-semibold text-[#284831]">
              {formatPrice(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function RemoveConfirmation({
  item,
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    if (!item) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [item, onCancel]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102015]/65 px-5"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm item removal"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[440px] bg-[#faf9f5] px-7 py-9 text-center shadow-2xl sm:px-10"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2e9e4] text-[#a96e55]">
              <Icon name="trash" size={26} />
            </div>

            <h2 className="font-serif text-3xl text-[#284831]">
              Remove this item?
            </h2>

            <p className="mt-4 text-[14px] leading-[1.85] text-[#7b877a]">
              Remove{" "}
              <span className="font-semibold text-[#284831]">
                {item.product.name}
              </span>{" "}
              from your shopping cart?
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="border border-[#d9dfd5] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#284831] transition-colors hover:bg-[#edf0e9]"
              >
                Keep Item
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="bg-[#284831] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#b28b51]"
              >
                Remove
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OrderSummary({
  cartCount,
  subtotal,
  hasAgeRestrictedItems,
}) {
  return (
    <Reveal className="lg:sticky lg:top-32">
      <div className="border border-[#e0e5db] bg-[#f1f3ec] px-6 py-9 sm:px-8 sm:py-10">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b28b51]">
          Your Order
        </p>

        <h2 className="font-serif text-[clamp(2rem,3vw,2.7rem)] text-[#284831]">
          Order Summary
        </h2>

        <div className="mt-9 space-y-5 border-b border-[#d9e0d5] pb-7">
          <div className="flex items-center justify-between gap-5">
            <span className="text-[14px] text-[#788675]">
              Subtotal ({cartCount}{" "}
              {cartCount === 1 ? "item" : "items"})
            </span>

            <span className="text-[15px] font-semibold text-[#284831]">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-5">
            <span className="text-[14px] text-[#788675]">
              Shipping
            </span>

            <span className="text-[12px] text-[#899688]">
              Not calculated
            </span>
          </div>

          <div className="flex items-center justify-between gap-5">
            <span className="text-[14px] text-[#788675]">
              Taxes
            </span>

            <span className="text-[12px] text-[#899688]">
              To be confirmed
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 py-7">
          <span className="font-serif text-[25px] text-[#284831]">
            Subtotal
          </span>

          <span className="text-[25px] font-semibold text-[#284831]">
            {formatPrice(subtotal)}
          </span>
        </div>

        <button
          type="button"
          disabled
          title="Checkout integration is not yet configured"
          className="flex w-full cursor-not-allowed items-center justify-center gap-3 bg-[#a9b4a6] px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
        >
          <Icon name="lock" size={18} />
          Checkout Coming Soon
        </button>

        <p className="mt-4 text-center text-[12px] leading-[1.8] text-[#899688]">
          Online checkout will be available once payment,
          shipping, and order processing are configured.
        </p>

        {hasAgeRestrictedItems && (
          <div className="mt-7 flex gap-3 border border-[#e5d8bd] bg-[#f8f2e8] px-4 py-5">
            <div className="shrink-0 text-[#a7804b]">
              <Icon name="shield" size={20} />
            </div>

            <p className="text-[12px] leading-[1.85] text-[#927a5b]">
              Your cart contains alcohol. Purchasers must be
              18 or older. Age verification will be required
              before any alcohol order is completed.
            </p>
          </div>
        )}

        <div className="mt-8 border-t border-[#d9e0d5] pt-7">
          <Link
            to="/shop"
            className="group flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#284831]"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              <Icon name="left" size={18} />
            </span>
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="mt-6 flex gap-4 border border-[#e2e6dd] px-6 py-5">
        <div className="shrink-0 text-[#b28b51]">
          <Icon name="info" size={22} />
        </div>

        <p className="text-[12px] leading-[1.9] text-[#849081]">
          Final shipping charges, applicable taxes, and
          fulfilment details will be confirmed when ordering
          becomes available.
        </p>
      </div>
    </Reveal>
  );
}

export default function Cart() {
  const {
    items,
    cartCount,
    subtotal,
    isEmpty,
    hasAgeRestrictedItems,
    removeFromCart,
    clearCart,
  } = useCart();

  const [itemToRemove, setItemToRemove] = useState(null);
  const [clearConfirmationOpen, setClearConfirmationOpen] =
    useState(false);

  useEffect(() => {
    document.title = "Your Cart | Greenview Orchard";

    return () => {
      document.title = "Greenview Orchard";
    };
  }, []);

  const handleConfirmRemove = () => {
    if (!itemToRemove) return;

    removeFromCart(itemToRemove.product.id);
    setItemToRemove(null);
  };

  const handleClearCart = () => {
    clearCart();
    setClearConfirmationOpen(false);
  };

  return (
    <div className="overflow-x-clip bg-[#faf9f5]">
      <CartHero cartCount={cartCount} />

      {isEmpty ? (
        <EmptyCart />
      ) : (
        <section className="py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
            <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-20">
              <div className="min-w-0">
                <Reveal>
                  <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#dce2d7] pb-7">
                    <div>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b28b51]">
                        Your Selection
                      </p>

                      <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-[-0.04em] text-[#284831]">
                        Shopping Bag
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setClearConfirmationOpen(true)}
                      className="inline-flex items-center gap-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9d7667] transition-colors hover:text-red-700"
                    >
                      <Icon name="trash" size={17} />
                      Clear Cart
                    </button>
                  </div>
                </Reveal>

                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onRequestRemove={(productId) => {
                        const selected = items.find(
                          (cartItem) =>
                            cartItem.productId === productId
                        );

                        setItemToRemove(selected || null);
                      }}
                    />
                  ))}
                </AnimatePresence>

                <Reveal>
                  <Link
                    to="/shop"
                    className="group mt-9 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#284831]"
                  >
                    <span className="transition-transform group-hover:-translate-x-1">
                      <Icon name="left" size={18} />
                    </span>

                    Back to Shopping
                  </Link>
                </Reveal>
              </div>

              <OrderSummary
                cartCount={cartCount}
                subtotal={subtotal}
                hasAgeRestrictedItems={hasAgeRestrictedItems}
              />
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#edf0e8] px-6 py-20 text-center sm:py-24">
        <Reveal>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b28b51]">
            Greenview Orchard
          </p>

          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.7rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
            There's more to discover.
          </h2>

          <p className="mx-auto mt-6 max-w-[480px] text-[14px] leading-[1.9] text-[#7d897b]">
            Explore seasonal fruit, orchard favourites, and
            thoughtfully selected gifts.
          </p>

          <Link
            to="/shop"
            className="group mt-9 inline-flex items-center gap-6 bg-[#284831] px-9 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
          >
            Browse All Products

            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrow" size={19} />
            </span>
          </Link>
        </Reveal>
      </section>

      <RemoveConfirmation
        item={itemToRemove}
        onCancel={() => setItemToRemove(null)}
        onConfirm={handleConfirmRemove}
      />

      <RemoveConfirmation
        item={
          clearConfirmationOpen && items.length
            ? {
                product: {
                  name: `all ${cartCount} ${
                    cartCount === 1 ? "item" : "items"
                  }`,
                },
              }
            : null
        }
        onCancel={() => setClearConfirmationOpen(false)}
        onConfirm={handleClearCart}
      />
    </div>
  );
}
