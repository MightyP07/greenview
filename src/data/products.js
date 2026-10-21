
 // src/data/products.js

export const CURRENCY = "NZD";

// IMPORTANT:
// This is a public demonstration catalogue.
// All products, prices, and availability are illustrative.
// Set this to false before launching a real store.
export const IS_DEMO_STORE = true;

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
    description: "Wines and fruit ports inspired by the orchard.",
  },
  {
    id: "gifts",
    name: "Gifts & Hampers",
    slug: "gifts",
    description: "Thoughtfully selected gifts for every occasion.",
  },
];

export const PRODUCT_SUBCATEGORIES = [
  { id: "cherries", name: "Cherries", category: "fruit" },
  { id: "stone-fruit", name: "Stone Fruit", category: "fruit" },
  { id: "apples-pears", name: "Apples & Pears", category: "fruit" },
  { id: "fruit-port", name: "Fruit Ports", category: "wine" },
  { id: "wine", name: "Wine", category: "wine" },
  { id: "gift-box", name: "Gift Boxes", category: "gifts" },
  { id: "gift-card", name: "Gift Cards", category: "gifts" },
];

// Illustrative images. Replace with verified product photography.
const images = {
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
  citrus:
    "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=1200&q=85",
  grapes:
    "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=1200&q=85",
  strawberry:
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=85",
  basket:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",
  hamper:
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85",
  celebration:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
};

// Compact catalogue definitions.
// Every entry is mapped to the complete product structure below.
//
// Fields:
// id, slug, name, category, subcategory, description,
// price, image key, featured, age restricted, tags

const catalogue = [
  // FRESH FRUIT — 12 PRODUCTS
  [
    "gv-001",
    "fresh-orchard-cherries",
    "Fresh Orchard Cherries",
    "fruit",
    "cherries",
    "A seasonal cherry selection with vibrant colour and a naturally sweet flavour.",
    24.9,
    "cherries",
    true,
    false,
    ["cherries", "seasonal", "fresh fruit"],
  ],
  [
    "gv-002",
    "seasonal-stone-fruit",
    "Seasonal Stone Fruit",
    "fruit",
    "stone-fruit",
    "An assortment of stone fruit inspired by the summer harvest.",
    18.5,
    "stoneFruit",
    true,
    false,
    ["stone fruit", "summer", "seasonal"],
  ],
  [
    "gv-003",
    "fresh-orchard-apples",
    "Fresh Orchard Apples",
    "fruit",
    "apples-pears",
    "A crisp and refreshing apple selection for everyday enjoyment.",
    12.9,
    "apples",
    false,
    false,
    ["apples", "fresh fruit"],
  ],
  [
    "gv-004",
    "fresh-orchard-pears",
    "Fresh Orchard Pears",
    "fruit",
    "apples-pears",
    "Sweet and juicy pears selected as an example of seasonal orchard produce.",
    14.5,
    "pears",
    false,
    false,
    ["pears", "fresh fruit"],
  ],
  [
    "gv-010",
    "premium-dark-cherries",
    "Premium Dark Cherries",
    "fruit",
    "cherries",
    "A premium-style dark cherry selection for a seasonal fruit collection.",
    32.9,
    "cherries",
    true,
    false,
    ["cherries", "premium", "seasonal"],
  ],
  [
    "gv-011",
    "sweet-summer-apricots",
    "Sweet Summer Apricots",
    "fruit",
    "stone-fruit",
    "Golden apricots with a delicate balance of sweetness and tang.",
    16.9,
    "stoneFruit",
    false,
    false,
    ["apricots", "summer", "stone fruit"],
  ],
  [
    "gv-012",
    "orchard-peaches",
    "Orchard Peaches",
    "fruit",
    "stone-fruit",
    "A fragrant peach selection inspired by the warmer growing season.",
    19.9,
    "stoneFruit",
    false,
    false,
    ["peaches", "stone fruit", "summer"],
  ],
  [
    "gv-013",
    "golden-nectarines",
    "Golden Nectarines",
    "fruit",
    "stone-fruit",
    "Smooth-skinned nectarines with a fresh, summery character.",
    18.9,
    "stoneFruit",
    false,
    false,
    ["nectarines", "stone fruit"],
  ],
  [
    "gv-014",
    "sweet-orchard-plums",
    "Sweet Orchard Plums",
    "fruit",
    "stone-fruit",
    "A colourful plum assortment inspired by seasonal harvests.",
    17.5,
    "stoneFruit",
    false,
    false,
    ["plums", "stone fruit"],
  ],
  [
    "gv-015",
    "crisp-green-apples",
    "Crisp Green Apples",
    "fruit",
    "apples-pears",
    "A bright green apple selection with a refreshing, crisp character.",
    13.9,
    "apples",
    false,
    false,
    ["green apples", "apples"],
  ],
  [
    "gv-016",
    "seasonal-fruit-selection",
    "Seasonal Fruit Selection",
    "fruit",
    "stone-fruit",
    "A mixed-fruit concept bringing together a changing seasonal selection.",
    29.9,
    "fruit",
    true,
    false,
    ["mixed fruit", "seasonal", "selection"],
  ],
  [
    "gv-017",
    "orchard-fruit-basket",
    "Orchard Fruit Basket",
    "fruit",
    "apples-pears",
    "An everyday fruit basket concept with a colourful orchard-inspired assortment.",
    34.9,
    "basket",
    false,
    false,
    ["fruit basket", "mixed fruit"],
  ],

  // WINES & FRUIT PORTS — 8 PRODUCTS
  [
    "gv-005",
    "orchard-fruit-port",
    "Orchard Fruit Port",
    "wine",
    "fruit-port",
    "An illustrative fruit-port concept. Variety, origin and alcohol content are unconfirmed.",
    39.9,
    "wine",
    true,
    true,
    ["fruit port", "wine"],
  ],
  [
    "gv-006",
    "vineyard-pinot-noir",
    "Vineyard Pinot Noir",
    "wine",
    "wine",
    "An illustrative Pinot Noir listing. Vintage, producer and bottle details are unconfirmed.",
    45.0,
    "vineyard",
    true,
    true,
    ["pinot noir", "red wine"],
  ],
  [
    "gv-018",
    "cherry-fruit-port",
    "Cherry Fruit Port",
    "wine",
    "fruit-port",
    "A cherry-inspired fruit-port concept for demonstration purposes.",
    42.0,
    "wine",
    false,
    true,
    ["cherry", "fruit port"],
  ],
  [
    "gv-019",
    "plum-fruit-port",
    "Plum Fruit Port",
    "wine",
    "fruit-port",
    "A plum-inspired fruit-port concept with illustrative product details.",
    38.5,
    "wine",
    false,
    true,
    ["plum", "fruit port"],
  ],
  [
    "gv-020",
    "orchard-rose",
    "Orchard Rosé",
    "wine",
    "wine",
    "An illustrative rosé wine listing for the demonstration collection.",
    36.9,
    "wine",
    true,
    true,
    ["rose", "wine"],
  ],
  [
    "gv-021",
    "estate-sauvignon-blanc",
    "Estate Sauvignon Blanc",
    "wine",
    "wine",
    "A Sauvignon Blanc concept. No estate origin or production claim is confirmed.",
    34.9,
    "vineyard",
    false,
    true,
    ["sauvignon blanc", "white wine"],
  ],
  [
    "gv-022",
    "reserve-pinot-noir",
    "Reserve Pinot Noir",
    "wine",
    "wine",
    "A premium Pinot Noir concept with fictional pricing and unconfirmed specifications.",
    64.9,
    "wine",
    false,
    true,
    ["pinot noir", "reserve", "red wine"],
  ],
  [
    "gv-023",
    "summer-fruit-port",
    "Summer Fruit Port",
    "wine",
    "fruit-port",
    "A mixed-fruit port concept created to demonstrate the wine collection.",
    41.5,
    "wine",
    false,
    true,
    ["fruit port", "summer"],
  ],

  // GIFTS & HAMPERS — 10 PRODUCTS
  [
    "gv-007",
    "orchard-gift-box",
    "Orchard Gift Box",
    "gifts",
    "gift-box",
    "An orchard-inspired gift-box concept. Final contents and packaging are unconfirmed.",
    59.9,
    "gift",
    true,
    false,
    ["gift box", "hamper"],
  ],
  [
    "gv-008",
    "seasonal-fruit-gift-box",
    "Seasonal Fruit Gift Box",
    "gifts",
    "gift-box",
    "A fresh-fruit gifting concept featuring a seasonal assortment.",
    44.9,
    "fruit",
    false,
    false,
    ["fruit gift", "gift box"],
  ],
  [
    "gv-009",
    "greenview-gift-card",
    "Greenview Gift Card",
    "gifts",
    "gift-card",
    "A demonstration gift-card listing. No real gift-card value or redemption rights are issued.",
    50.0,
    "gift",
    false,
    false,
    ["gift card", "gift"],
  ],
  [
    "gv-024",
    "premium-orchard-hamper",
    "Premium Orchard Hamper",
    "gifts",
    "gift-box",
    "A premium gifting concept with an illustrative orchard-inspired assortment.",
    89.9,
    "hamper",
    true,
    false,
    ["premium", "hamper", "gift"],
  ],
  [
    "gv-025",
    "cherry-lovers-gift-box",
    "Cherry Lovers Gift Box",
    "gifts",
    "gift-box",
    "A cherry-themed gift-box concept designed for seasonal gifting.",
    54.9,
    "cherries",
    false,
    false,
    ["cherries", "gift box"],
  ],
  [
    "gv-026",
    "summer-harvest-hamper",
    "Summer Harvest Hamper",
    "gifts",
    "gift-box",
    "A summer-inspired hamper concept featuring seasonal fruit themes.",
    74.9,
    "basket",
    true,
    false,
    ["summer", "hamper", "harvest"],
  ],
  [
    "gv-027",
    "thoughtful-thank-you-box",
    "Thoughtful Thank You Box",
    "gifts",
    "gift-box",
    "An illustrative thank-you gift selection with contents to be confirmed.",
    49.9,
    "gift",
    false,
    false,
    ["thank you", "gift"],
  ],
  [
    "gv-028",
    "celebration-gift-hamper",
    "Celebration Gift Hamper",
    "gifts",
    "gift-box",
    "A celebratory gifting concept for special occasions.",
    99.9,
    "celebration",
    false,
    false,
    ["celebration", "hamper", "gift"],
  ],
  [
    "gv-029",
    "little-orchard-gift-box",
    "Little Orchard Gift Box",
    "gifts",
    "gift-box",
    "A smaller orchard-inspired gift concept for simple gestures.",
    29.9,
    "gift",
    false,
    false,
    ["small gift", "gift box"],
  ],
  [
    "gv-030",
    "grand-orchard-collection",
    "Grand Orchard Collection",
    "gifts",
    "gift-box",
    "An illustrative premium gift collection. Contents and packaging are not final.",
    129.9,
    "hamper",
    true,
    false,
    ["luxury", "premium", "hamper"],
  ],
];

// Turn compact definitions into full product objects.
// Keep the same shape expected by existing components.
const baseProducts = catalogue.map(
  ([
    id,
    slug,
    name,
    category,
    subcategory,
    description,
    demoPrice,
    imageKey,
    featured,
    requiresAgeVerification,
    tags,
  ]) => ({
    id,
    slug,
    name,
    category,
    subcategory,
    description,
    shortDescription: description,
    price: null,
    compareAtPrice: null,
    currency: CURRENCY,
    image: images[imageKey],
    images: [images[imageKey]],
    badge: null,
    featured,
    isAvailable: false,
    availabilityLabel: "Availability to be confirmed",
    requiresAgeVerification,
    tags,
    options: [],
    demoPrice,
  })
);

export const products = baseProducts.map(
  ({ demoPrice, ...product }) => {
    if (!IS_DEMO_STORE) {
      return product;
    }

    return {
      ...product,
      price: demoPrice,
      compareAtPrice: null,
      isAvailable: true,
      availabilityLabel: "Demo only - not available for purchase",
      badge: "Demo",
      isDemoProduct: true,
    };
  }
);

export const productSortOptions = [
  { value: "featured", label: "Featured" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === id) ?? null;
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
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
  const search = String(query ?? "").trim().toLowerCase();

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

export function sortProducts(items, sortBy = "featured") {
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
        if (a.price == null && b.price == null) return 0;
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return a.price - b.price;
      });

    case "price-desc":
      return sorted.sort((a, b) => {
        if (a.price == null && b.price == null) return 0;
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return b.price - a.price;
      });

    case "featured":
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured)
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
      (product) => product.subcategory === subcategory
    );
  }

  if (availableOnly) {
    result = result.filter(
      (product) => product.isAvailable
    );
  }

  if (String(search).trim()) {
    const matchingIds = new Set(
      searchProducts(search).map((product) => product.id)
    );

    result = result.filter((product) =>
      matchingIds.has(product.id)
    );
  }

  return sortProducts(result, sortBy);
}

export function formatPrice(amount, currency = CURRENCY) {
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

export function getRelatedProducts(product, limit = 4) {
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
