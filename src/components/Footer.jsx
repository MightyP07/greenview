
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/about" },
    { label: "Fruit Stall", href: "/fruit-stall" },
    { label: "Accommodation", href: "/accommodation" },
    { label: "Employment", href: "/employment" },
  ],
  shop: [
    { label: "Shop All", href: "/shop" },
    { label: "Fresh Fruit", href: "/shop?category=fruit" },
    { label: "Wines & Fruit Ports", href: "/shop?category=wine" },
    { label: "Gift Packs", href: "/shop?category=gifts" },
    { label: "Your Cart", href: "/cart" },
  ],
};

const orchardAddress =
  "259 Wright Road, Aongatete, Katikati 3181, New Zealand";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=259+Wright+Road%2C+Aongatete%2C+Katikati+3181%2C+New+Zealand";

export default function Footer() {
  return (
    <footer className="bg-[#213b2a] text-white">
      <div className="border-b border-white/15">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-14 lg:px-14">
          <div>
            <Link
              to="/"
              className="inline-flex items-center"
              aria-label="Greenview Orchard homepage"
            >
              <img
                src="/greenview-logo.jpg"
                alt="Greenview Orchard"
                className="h-24 w-24 object-contain"
              />
            </Link>

            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-[#c5cdbf]">
              Orchard & Estate
            </p>

            <p className="mt-7 max-w-[330px] text-[14px] leading-8 text-[#d1d9cf]">
              Inspired by the land, shaped by the seasons, and dedicated to
              bringing the finest orchard experiences to life.
            </p>
          </div>

          <div>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#d1ac72]">
              Explore
            </h3>

            <div className="flex flex-col gap-4">
              {footerLinks.explore.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="w-fit text-sm text-[#d1d9cf] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#d1ac72]">
              Shop
            </h3>

            <div className="flex flex-col gap-4">
              {footerLinks.shop.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="w-fit text-sm text-[#d1d9cf] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#d1ac72]">
              Get In Touch
            </h3>

            <p className="text-sm leading-7 text-[#d1d9cf]">
              Have a question about our orchard, products, or accommodation?
              We'd be pleased to hear from you.
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block max-w-[280px] text-sm leading-7 text-[#d1d9cf] transition-colors hover:text-white"
              aria-label={`View ${orchardAddress} on Google Maps`}
            >
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d1ac72]">
                Visit Our Orchard
              </span>
              259 Wright Road,
              <br />
              Aongatete, Katikati 3181,
              <br />
              New Zealand
            </a>

            <Link
              to="/contact"
              className="mt-7 inline-flex border border-[#d1ac72] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c999] transition-all hover:bg-[#d1ac72] hover:text-[#213b2a]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 px-6 py-7 text-center sm:px-10 md:flex-row md:text-left lg:px-14">
        <p className="text-xs text-[#b6c2b4]">
          © {new Date().getFullYear()} Greenview Orchard. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/contact"
            className="text-xs text-[#b6c2b4] transition-colors hover:text-white"
          >
            Contact
          </Link>

          <Link
            to="/about"
            className="text-xs text-[#b6c2b4] transition-colors hover:text-white"
          >
            About
          </Link>

          <motion.a
            href="#top"
            whileHover={{ y: -3 }}
            className="text-xs font-medium uppercase tracking-[0.14em] text-[#e6c999]"
          >
            Back to top ↑
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
