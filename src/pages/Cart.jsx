
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Gift,
  Info,
  Leaf,
  LockKeyhole,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import {
  IS_DEMO_STORE,
  formatPrice,
} from "../data/products";

const EASE = [0.22, 1, 0.36, 1];

function DemoNotice() {
  if (!IS_DEMO_STORE) return null;

  return (
    <div className="border-b border-[#e6d9bd] bg-[#fff8e9]">
      <div className="mx-auto flex max-w-[1440px] items-start gap-3 px-5 py-4 sm:px-8 lg:px-12">
        <Info
          size={18}
          className="mt-0.5 shrink-0 text-[#a77d3f]"
        />
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#71542c]">
            Demonstration shopping cart
          </p>
          <p className="mt-1 text-[12px] leading-6 text-[#856b47]">
            This is a website demonstration. Products,
            availability and prices are illustrative. No
            real orders or payments can be placed.
          </p>
        </div>
      </div>
    </div>
  );
}

function CartHero({ count }) {
  return (
    <section className="relative overflow-hidden bg-[#213b2a]">
      <div className="pointer-events-none absolute -right-8 top-[-100px] select-none font-serif text-[350px] leading-none text-white/[0.035]">
        G.
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="mb-6 flex items-center gap-3">
            <Link
              to="/"
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
            >
              Home
            </Link>

            <ChevronRight
              size={13}
              className="text-white/40"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e5c18a]">
              Shopping Cart
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e5c18a]">
                Your selection
              </p>

              <h1 className="font-serif text-[clamp(3.3rem,7vw,6.5rem)] leading-none tracking-[-0.055em] text-white">
                Your <em>Cart.</em>
              </h1>
            </div>

            <span className="border border-white/25 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-white/80">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="mx-auto flex max-w-[620px] flex-col items-center px-5 py-24 text-center sm:py-32"
    >
      <div className="relative mb-9 flex h-28 w-28 items-center justify-center rounded-full border border-[#e0e5dc] bg-[#f1f3ed]">
        <ShoppingBag
          size={40}
          strokeWidth={1.2}
          className="text-[#284831]"
        />
        <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#e5c18a] text-[#284831]">
          <Leaf size={17} />
        </span>
      </div>

      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b28b51]">
        Nothing here just yet
      </p>

      <h2 className="font-serif text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.1] tracking-[-0.045em] text-[#284831]">
        Your basket is
        <br />
        <em>waiting.</em>
      </h2>

      <p className="mt-6 max-w-[420px] text-[14px] leading-8 text-[#788576]">
        Discover our orchard-inspired collection and add a
        few favourites to your basket.
      </p>

      <Link
        to="/shop"
        className="mt-9 inline-flex items-center gap-4 bg-[#284831] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b28b51]"
      >
        Explore the shop
        <ArrowRight size={17} />
      </Link>
    </motion.div>
  );
}

function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}) {
  return (
    <div className="inline-flex h-11 items-center border border-[#dce3d8] bg-white">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        className="flex h-full w-10 items-center justify-center text-[#284831] transition-colors hover:bg-[#f1f4ee] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Minus size={14} />
      </button>

      <span className="flex h-full min-w-10 items-center justify-center border-x border-[#e6eae2] px-2 text-[13px] font-semibold tabular-nums text-[#284831]">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center text-[#284831] transition-colors hover:bg-[#f1f4ee]"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const product = item.product ?? item;

  const quantity = item.quantity ?? 1;
  const unitPrice = Number(product.price ?? 0);
  const lineTotal = unitPrice * quantity;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="grid grid-cols-[105px_minmax(0,1fr)] gap-5 border-b border-[#e7eae2] py-7 sm:grid-cols-[145px_minmax(0,1fr)] sm:gap-7"
    >
      <Link
        to={`/shop/${product.slug}`}
        className="block aspect-[0.82] overflow-hidden bg-[#eef0e9]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-col justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#b28b51]">
              {product.category === "fruit"
                ? "Fresh Fruit"
                : product.category === "wine"
                  ? "Wines & Fruit Ports"
                  : "Gifts & Hampers"}
            </span>

            {product.requiresAgeVerification && (
              <span className="bg-[#e9eee7] px-2 py-1 text-[9px] font-semibold text-[#284831]">
                18+
              </span>
            )}
          </div>

          <Link
            to={`/shop/${product.slug}`}
            className="font-serif text-[22px] leading-[1.15] tracking-[-0.02em] text-[#284831] transition-colors hover:text-[#b28b51] sm:text-[27px]"
          >
            {product.name}
          </Link>

          <p className="mt-2 line-clamp-2 text-[12px] leading-6 text-[#849080]">
            {product.shortDescription}
          </p>

          <p className="mt-3 text-[12px] text-[#718071]">
            {formatPrice(product.price)} each
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <QuantityControl
            quantity={quantity}
            onDecrease={onDecrement}
            onIncrease={onIncrement}
          />

          <div className="flex flex-col items-end gap-3">
            <span className="text-[17px] font-semibold tabular-nums text-[#284831]">
              {formatPrice(lineTotal)}
            </span>

            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9b8071] transition-colors hover:text-red-700"
            >
              <Trash2 size={13} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function OrderSummary({
  count,
  subtotal,
  hasAgeRestrictedItems,
}) {
  return (
    <div className="sticky top-28 border border-[#e2e6dd] bg-[#f6f7f1] p-6 sm:p-8">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="font-serif text-[30px] tracking-[-0.03em] text-[#284831]">
          Order Summary
        </h2>
        <ShoppingBag
          size={19}
          strokeWidth={1.5}
          className="text-[#b28b51]"
        />
      </div>

      <div className="space-y-5 border-b border-[#dce2d7] pb-7">
        <div className="flex items-center justify-between gap-3 text-[13px]">
          <span className="text-[#7b8779]">
            Subtotal ({count} {count === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold tabular-nums text-[#284831]">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-[13px]">
          <span className="text-[#7b8779]">
            Shipping
          </span>
          <span className="text-[12px] text-[#8e998b]">
            Not calculated
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-[13px]">
          <span className="text-[#7b8779]">
            Taxes
          </span>
          <span className="text-[12px] text-[#8e998b]">
            Not calculated
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 py-7">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#284831]">
            Demo subtotal
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[#8e998b]">
            Excludes shipping and any applicable taxes.
          </p>
        </div>

        <span className="font-serif text-[29px] tabular-nums tracking-[-0.04em] text-[#284831]">
          {formatPrice(subtotal)}
        </span>
      </div>

      <button
        type="button"
        disabled
        aria-disabled="true"
        className="flex w-full cursor-not-allowed items-center justify-center gap-3 bg-[#aab4a8] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white"
      >
        <LockKeyhole size={16} />
        Checkout unavailable
      </button>

      <p className="mt-4 text-center text-[11px] leading-6 text-[#849080]">
        This is a demonstration store. No orders or
        payments can be processed.
      </p>

      {hasAgeRestrictedItems && (
        <div className="mt-6 flex items-start gap-3 border-t border-[#dce2d7] pt-6">
          <ShieldCheck
            size={19}
            className="mt-0.5 shrink-0 text-[#b28b51]"
          />
          <p className="text-[11px] leading-6 text-[#788576]">
            Your cart includes alcohol-related demonstration
            products. Real sales would require appropriate
            age verification and legal compliance.
          </p>
        </div>
      )}

      <Link
        to="/shop"
        className="mt-7 flex items-center justify-center gap-2 border border-[#cfd8ca] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.13em] text-[#284831] transition-colors hover:border-[#284831] hover:bg-white"
      >
        <ArrowLeft size={15} />
        Continue exploring
      </Link>
    </div>
  );
}

function ReassuranceStrip() {
  const features = [
    {
      icon: Leaf,
      title: "Orchard inspired",
      description:
        "A collection celebrating fruit and the countryside.",
    },
    {
      icon: Gift,
      title: "Thoughtful gifting",
      description:
        "Explore ideas for meaningful gifts and occasions.",
    },
    {
      icon: ShieldCheck,
      title: "Demo experience",
      description:
        "Browse and test the cart without making a payment.",
    },
  ];

  return (
    <section className="border-t border-[#e8ebe4] bg-[#f4f5ef]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8 lg:px-12">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="flex items-start gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dce3d7] text-[#284831]">
                <Icon size={19} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="text-[12px] font-semibold text-[#284831]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[11px] leading-6 text-[#849080]">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Cart() {
  const {
    items,
    cartCount,
    subtotal,
    isEmpty,
    hasAgeRestrictedItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [showClearConfirm, setShowClearConfirm] =
    useState(false);

  useEffect(() => {
    document.title = "Your Cart | Greenview Orchard";
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <DemoNotice />
      <CartHero count={cartCount} />

      {isEmpty ? (
        <EmptyCart />
      ) : (
        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-14 xl:gap-20">
            <div className="min-w-0">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#dfe5dc] pb-6">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b28b51]">
                    Your selected items
                  </p>

                  <h2 className="font-serif text-[34px] tracking-[-0.035em] text-[#284831]">
                    In your basket
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#947e72] transition-colors hover:text-red-700"
                >
                  <Trash2 size={14} />
                  Clear cart
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {items.map((item) => {
                  const product = item.product ?? item;
                  const productId =
                    item.productId ??
                    product.id;

                  return (
                    <CartItem
                      key={productId}
                      item={item}
                      onIncrement={() =>
                        incrementQuantity(productId)
                      }
                      onDecrement={() =>
                        decrementQuantity(productId)
                      }
                      onRemove={() =>
                        removeFromCart(productId)
                      }
                    />
                  );
                })}
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#284831] transition-colors hover:text-[#b28b51]"
                >
                  <ArrowLeft size={16} />
                  Continue exploring
                </Link>

                <span className="text-[11px] text-[#95a092]">
                  {cartCount}{" "}
                  {cartCount === 1
                    ? "item in cart"
                    : "items in cart"}
                </span>
              </div>
            </div>

            <aside>
              <OrderSummary
                count={cartCount}
                subtotal={subtotal}
                hasAgeRestrictedItems={
                  hasAgeRestrictedItems
                }
              />
            </aside>
          </div>
        </section>
      )}

      <ReassuranceStrip />

      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102519]/70 px-5 backdrop-blur-sm"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              transition={{
                duration: 0.25,
                ease: EASE,
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="clear-cart-title"
              onClick={(event) =>
                event.stopPropagation()
              }
              className="relative w-full max-w-[450px] bg-white p-8 shadow-2xl sm:p-10"
            >
              <button
                type="button"
                onClick={() =>
                  setShowClearConfirm(false)
                }
                aria-label="Close dialog"
                className="absolute right-5 top-5 text-[#849080] hover:text-[#284831]"
              >
                <X size={19} />
              </button>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#f3ede7] text-[#9b715c]">
                <Trash2 size={24} strokeWidth={1.5} />
              </div>

              <h2
                id="clear-cart-title"
                className="font-serif text-[34px] tracking-[-0.04em] text-[#284831]"
              >
                Clear your basket?
              </h2>

              <p className="mt-4 text-[13px] leading-7 text-[#7b8779]">
                This will remove all products from your
                demonstration cart. You can add them again
                at any time.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setShowClearConfirm(false)
                  }
                  className="flex-1 border border-[#dce3d8] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#284831] transition-colors hover:bg-[#f4f6f1]"
                >
                  Keep items
                </button>

                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(false);
                  }}
                  className="flex-1 bg-[#284831] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#b28b51]"
                >
                  Clear cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
