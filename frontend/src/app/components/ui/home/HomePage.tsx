// app/page.tsx

import Footer from "../Footer";
import CustomProducts from "./components/CustomProducts";
import ForMerchants from "./components/ForMerchants";
import ForUsers from "./components/ForUsers";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductCategories from "./components/ProductCategories";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <HeroSection />
        <ProductCategories />
        <CustomProducts />
        <ForMerchants />
        <ForUsers />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;