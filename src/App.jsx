import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import FruitStall from "./pages/FruitStall";
import Accommodation from "./pages/Accommodation";
import Employment from "./pages/Employment";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/fruit-stall" element={<FruitStall />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/employment" element={<Employment />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}