
 // src/data/products.js

export const CURRENCY = "NZD";

// Demo prices and availability are enabled only
// when running the Vite development server.
export const IS_DEMO_STORE = import.meta.env.DEV;

export const PRODUCT_CATEGORIES = [
  {
    id: "all",
    name: "All Products",
    slug: "all",
    description: "Explore our complete orchard collection.",
  },
  {
    id: "fruit",
    name: "Fresh Fruit",
    slug: "fruit",
    description: "Seasonal fruit from the orchard.",
  },
  {
    id: "wine",
    name: "Wines & Fruit Ports",
    slug: "wine",
    description:
      "Wines and fruit ports inspired by the orchard.",
  },
  {
    id: "gifts",
    name: "Gifts & Hampers",
    slug: "gifts",
    description:
      "Thoughtfully selected gifts for every occasion.",
  },
];

export const PRODUCT_SUBCATEGORIES = [
  {
    id: "cherries",
    name: "Cherries",
    category: "fruit",
  },
  {
    id: "stone-fruit",
    name: "Stone Fruit",
    category: "fruit",
  },
  {
    id: "apples-pears",
    name: "Apples & Pears",
    category: "fruit",
  },
  {
    id: "fruit-port",
    name: "Fruit Ports",
    category: "wine",
  },
  {
    id: "wine",
    name: "Wine",
    category: "wine",
  },
  {
    id: "gift-box",
    name: "Gift Boxes",
    category: "gifts",
  },
  {
    id: "gift-card",
    name: "Gift Cards",
    category: "gifts",
  },
];

const placeholderImages = {
  cherries:
    "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=85",

  stoneFruit:
    "https://images.unsplash.com/photo-1629828874514-c1e5103f0550?auto=format&fit=crop&w=1200&q=85",

  apples:
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1200&q=85",

  pears:
    "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=1200&q=85",

  wine:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",

  vineyard:
    "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?auto=format&fit=crop&w=1200&q=85",

  gift:
    "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85",

  fruit:
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85",
};

// These prices are entirely fictional.
// They are used only for frontend cart testing.
const DEMO_PRICES = {
  "gv-001": 24.9,
  "gv-002": 18.5,
  "gv-003": 12.9,
  "gv-004": 14.5,
  "gv-005": 39.9,
  "gv-006": 45.0,
  "gv-007": 59.9,
  "gv-008": 44.9,
  "gv-009": 50.0,
};

const DEMO_COMPARE_PRICES = {
  "gv-001": 29.9,
  "gv-002": null,
  "gv-003": null,
  "gv-004": null,
  "gv-005": null,
  "gv-006": 55.0,
  "gv-007": 69.9,
  "gv-008": null,
  "gv-009": null,
};

// Keep the real catalogue separate from demo values.
const baseProducts = [
  {
    id: "gv-001",
    slug: "fresh-orchard-cherries",
    name: "Fresh Orchard Cherries",
    category: "fruit",
    subcategory: "cherries",
    description:
      "Fresh seasonal cherries selected for their colour, flavour, and quality.",
    shortDescription:
      "Fresh seasonal cherries from the orchard.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.cherries,
    images: [placeholderImages.cherries],
    badge: "Seasonal",
    featured: true,
    isAvailable: false,
    availabilityLabel: "Availability to be confirmed",
    requiresAgeVerification: false,
    tags: ["cherries", "fresh fruit", "seasonal"],
    options: [],
  },
  {
    id: "gv-002",
    slug: "seasonal-stone-fruit",
    name: "Seasonal Stone Fruit",
    category: "fruit",
    subcategory: "stone-fruit",
    description:
      "A seasonal selection of orchard-grown stone fruit, depending on harvest availability.",
    shortDescription:
      "A selection of seasonal stone fruit.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.stoneFruit,
    images: [placeholderImages.stoneFruit],
    badge: "Seasonal",
    featured: true,
    isAvailable: false,
    availabilityLabel: "Availability to be confirmed",
    requiresAgeVerification: false,
    tags: ["stone fruit", "seasonal", "fresh fruit"],
    options: [],
  },
  {
    id: "gv-003",
    slug: "fresh-orchard-apples",
    name: "Fresh Orchard Apples",
    category: "fruit",
    subcategory: "apples-pears",
    description:
      "A selection of fresh apples, with varieties determined by the season.",
    shortDescription:
      "Fresh apples selected for the season.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.apples,
    images: [placeholderImages.apples],
    badge: null,
    featured: false,
    isAvailable: false,
    availabilityLabel: "Availability to be confirmed",
    requiresAgeVerification: false,
    tags: ["apples", "fresh fruit"],
    options: [],
  },
  {
    id: "gv-004",
    slug: "fresh-orchard-pears",
    name: "Fresh Orchard Pears",
    category: "fruit",
    subcategory: "apples-pears",
    description:
      "Seasonal pears selected for freshness and flavour.",
    shortDescription: "Seasonal orchard pears.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.pears,
    images: [placeholderImages.pears],
    badge: null,
    featured: false,
    isAvailable: false,
    availabilityLabel: "Availability to be confirmed",
    requiresAgeVerification: false,
    tags: ["pears", "fresh fruit"],
    options: [],
  },
  {
    id: "gv-005",
    slug: "orchard-fruit-port",
    name: "Orchard Fruit Port",
    category: "wine",
    subcategory: "fruit-port",
    description:
      "A fruit-port product placeholder. The exact variety, bottle size, alcohol content, and tasting notes must be confirmed.",
    shortDescription: "Fruit port collection.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.wine,
    images: [placeholderImages.wine],
    badge: null,
    featured: true,
    isAvailable: false,
    availabilityLabel: "Product details to be confirmed",
    requiresAgeVerification: true,
    tags: ["fruit port", "wine"],
    options: [],
  },
  {
    id: "gv-006",
    slug: "vineyard-pinot-noir",
    name: "Vineyard Pinot Noir",
    category: "wine",
    subcategory: "wine",
    description:
      "A Pinot Noir product placeholder. Vintage, origin, tasting notes, and bottle size must be confirmed.",
    shortDescription: "Pinot Noir wine collection.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.vineyard,
    images: [placeholderImages.vineyard],
    badge: null,
    featured: true,
    isAvailable: false,
    availabilityLabel: "Product details to be confirmed",
    requiresAgeVerification: true,
    tags: ["pinot noir", "wine", "vineyard"],
    options: [],
  },
  {
    id: "gv-007",
    slug: "orchard-gift-box",
    name: "Orchard Gift Box",
    category: "gifts",
    subcategory: "gift-box",
    description:
      "A curated gift-box concept. Contents, packaging, price, and availability are awaiting confirmation.",
    shortDescription:
      "A thoughtful orchard-inspired gift.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.gift,
    images: [placeholderImages.gift],
    badge: "Gift Idea",
    featured: true,
    isAvailable: false,
    availabilityLabel: "Contents to be confirmed",
    requiresAgeVerification: false,
    tags: ["gift", "gift box", "hamper"],
    options: [],
  },
  {
    id: "gv-008",
    slug: "seasonal-fruit-gift-box",
    name: "Seasonal Fruit Gift Box",
    category: "gifts",
    subcategory: "gift-box",
    description:
      "A fresh-fruit gift-box concept featuring seasonal produce. Final contents and packaging are to be confirmed.",
    shortDescription:
      "A seasonal fresh-fruit gift selection.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.fruit,
    images: [placeholderImages.fruit],
    badge: "Seasonal",
    featured: false,
    isAvailable: false,
    availabilityLabel: "Contents to be confirmed",
    requiresAgeVerification: false,
    tags: ["gift", "fruit", "seasonal"],
    options: [],
  },
  {
    id: "gv-009",
    slug: "greenview-gift-card",
    name: "Greenview Gift Card",
    category: "gifts",
    subcategory: "gift-card",
    description:
      "A gift-card concept. Available denominations, redemption terms, and fulfilment must be confirmed.",
    shortDescription:
      "Give someone a Greenview experience.",
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: placeholderImages.gift,
    images: [placeholderImages.gift],
    badge: null,
    featured: false,
    isAvailable: false,
    availabilityLabel:
      "Gift-card details to be confirmed",
    requiresAgeVerification: false,
    tags: ["gift card", "gift"],
    options: [],
  },
];

// Apply test values only in development.
// Product IDs and all other fields remain unchanged.
export const products = baseProducts.map((product) => {
  if (!IS_DEMO_STORE) {
    return product;
  }

  return {
    ...product,
    price: DEMO_PRICES[product.id] ?? null,
    compareAtPrice:
      DEMO_COMPARE_PRICES[product.id] ?? null,
    isAvailable: true,
    availabilityLabel: "Available for demo testing",
    isDemoProduct: true,
  };
});

export const productSortOptions = [
  {
    value: "featured",
    label: "Featured",
  },
  {
    value: "name-asc",
    label: "Name: A to Z",
  },
  {
    value: "name-desc",
    label: "Name: Z to A",
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
  },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return (
    products.find((product) => product.id === id) ?? null
  );
}

export function getProductBySlug(slug) {
  return (
    products.find((product) => product.slug === slug) ??
    null
  );
}

export function getProductsByCategory(category) {
  if (!category || category === "all") {
    return products;
  }

  return products.filter(
    (product) => product.category === category
  );
}

export function getProductsBySubcategory(subcategory) {
  if (!subcategory) {
    return products;
  }

  return products.filter(
    (product) => product.subcategory === subcategory
  );
}

export function getFeaturedProducts(limit = 6) {
  return products
    .filter((product) => product.featured)
    .slice(0, limit);
}

export function searchProducts(query) {
  const search = String(query ?? "")
    .trim()
    .toLowerCase();

  if (!search) {
    return products;
  }

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.subcategory,
      ...(product.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search);
  });
}

export function sortProducts(
  items,
  sortBy = "featured"
) {
  const sorted = [...items];

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "name-desc":
      return sorted.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    case "price-asc":
      return sorted.sort((a, b) => {
        if (a.price == null && b.price == null) {
          return 0;
        }

        if (a.price == null) return 1;
        if (b.price == null) return -1;

        return a.price - b.price;
      });

    case "price-desc":
      return sorted.sort((a, b) => {
        if (a.price == null && b.price == null) {
          return 0;
        }

        if (a.price == null) return 1;
        if (b.price == null) return -1;

        return b.price - a.price;
      });

    case "featured":
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured) -
          Number(a.featured)
      );
  }
}

export function filterProducts({
  category = "all",
  subcategory = "",
  search = "",
  sortBy = "featured",
  availableOnly = false,
} = {}) {
  let result = [...products];

  if (category !== "all") {
    result = result.filter(
      (product) => product.category === category
    );
  }

  if (subcategory) {
    result = result.filter(
      (product) =>
        product.subcategory === subcategory
    );
  }

  if (availableOnly) {
    result = result.filter(
      (product) => product.isAvailable
    );
  }

  if (String(search).trim()) {
    const matchingIds = new Set(
      searchProducts(search).map(
        (product) => product.id
      )
    );

    result = result.filter((product) =>
      matchingIds.has(product.id)
    );
  }

  return sortProducts(result, sortBy);
}

export function formatPrice(
  amount,
  currency = CURRENCY
) {
  if (
    amount == null ||
    !Number.isFinite(Number(amount))
  ) {
    return "Price on request";
  }

  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

export function isPurchasable(product) {
  return Boolean(
    product &&
      product.isAvailable &&
      product.price != null &&
      Number.isFinite(Number(product.price)) &&
      Number(product.price) >= 0
  );
}

export function getRelatedProducts(
  product,
  limit = 4
) {
  if (!product) return [];

  return products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    )
    .slice(0, limit);
}

export default products;
