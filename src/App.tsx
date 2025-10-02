import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/Footer";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Home";
import ShopPage from "./pages/ShopePage";
import ProductDetailPage from "./pages/productDetail";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import WishlistPage from "./pages/wishListPage";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
            <Footer />
            <Toaster position="bottom-right" />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
