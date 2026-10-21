import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getProductById,
  isPurchasable,
  formatPrice,
} from "../data/products";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "greenview-shopping-cart";
const MAX_QUANTITY = 99;

function normalizeQuantity(quantity) {
  const number = Number(quantity);

  if (!Number.isFinite(number)) {
    return 1;
  }

  return Math.max(
    1,
    Math.min(MAX_QUANTITY, Math.floor(number))
  );
}

function validateCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const merged = new Map();

  for (const item of items) {
    if (!item || typeof item.productId !== "string") {
      continue;
    }

    const product = getProductById(item.productId);

    if (!product || !isPurchasable(product)) {
      continue;
    }

    const quantity = normalizeQuantity(item.quantity);
    const existing = merged.get(product.id) || 0;

    merged.set(
      product.id,
      Math.min(MAX_QUANTITY, existing + quantity)
    );
  }

  return Array.from(merged, ([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

function getInitialCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return validateCartItems(JSON.parse(stored));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch {
      // Cart remains usable for the current session.
    }
  }, [cartItems]);

  const addToCart = useCallback((productId, quantity = 1) => {
    const product = getProductById(productId);

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    if (!isPurchasable(product)) {
      return {
        success: false,
        message: "This product is not currently available for purchase.",
      };
    }

    const amount = normalizeQuantity(quantity);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: Math.min(
                  MAX_QUANTITY,
                  item.quantity + amount
                ),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          productId,
          quantity: amount,
        },
      ];
    });

    return {
      success: true,
      message: `${product.name} added to cart.`,
    };
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.productId !== productId
      )
    );
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const number = Number(quantity);

    if (!Number.isFinite(number)) {
      return;
    }

    if (number <= 0) {
      setCartItems((currentItems) =>
        currentItems.filter(
          (item) => item.productId !== productId
        )
      );

      return;
    }

    const amount = normalizeQuantity(number);

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: amount,
            }
          : item
      )
    );
  }, []);

  const incrementQuantity = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.min(
                MAX_QUANTITY,
                item.quantity + 1
              ),
            }
          : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const items = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = getProductById(item.productId);

        if (!product || !isPurchasable(product)) {
          return null;
        }

        const price = Number(product.price);

        return {
          ...item,
          product,
          price,
          lineTotal: price * item.quantity,
        };
      })
      .filter(Boolean);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.lineTotal,
      0
    );
  }, [items]);

  const hasAgeRestrictedItems = useMemo(() => {
    return items.some(
      (item) => item.product.requiresAgeVerification
    );
  }, [items]);

  const getItemQuantity = useCallback(
    (productId) => {
      const item = items.find(
        (cartItem) => cartItem.productId === productId
      );

      return item?.quantity ?? 0;
    },
    [items]
  );

  const isInCart = useCallback(
    (productId) => {
      return items.some(
        (item) => item.productId === productId
      );
    },
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      cartItems,
      cartCount,
      subtotal,
      formattedSubtotal: formatPrice(subtotal),
      isEmpty: items.length === 0,
      hasAgeRestrictedItems,

      addToCart,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      getItemQuantity,
      isInCart,
    }),
    [
      items,
      cartItems,
      cartCount,
      subtotal,
      hasAgeRestrictedItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      getItemQuantity,
      isInCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider."
    );
  }

  return context;
}

export default CartContext;