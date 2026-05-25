"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaFlask, FaVial, FaTint, FaAppleAlt } from "react-icons/fa";
import { FiArrowRight, FiCheckCircle, FiXCircle, FiStar, FiFilter, FiShoppingBag, FiChevronRight, FiX } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const productIcons = {
  powder: <FaFlask className="w-16 h-16 text-[#00d4aa]" />,
  vape: <FaVial className="w-16 h-16 text-[#00d4aa]" />,
  liquid: <FaTint className="w-16 h-16 text-[#00d4aa]" />,
  "vape flavours": <FaAppleAlt className="w-16 h-16 text-[#00d4aa]" />,
};

const categoryInfo = {
  powder: { label: "Powder / Crystal", icon: <FaFlask className="w-5 h-5" />, heading: "Etomidate Powder / Crystal", desc: "High-purity etomidate powder for research and clinical use." },
  vape: { label: "Vape / K-Pods", icon: <FaVial className="w-5 h-5" />, heading: "Etomidate Vape / K-Pods", desc: "Precision-formulated etomidate vape cartridges and K-Pod systems." },
  liquid: { label: "Liquid", icon: <FaTint className="w-5 h-5" />, heading: "Etomidate Liquid", desc: "Pharmaceutical-grade etomidate liquid solutions." },
  "vape flavours": { label: "Vape Flavours", icon: <FaAppleAlt className="w-5 h-5" />, heading: "Vape Flavours", desc: "Premium flavored etomidate vape products in various fruit and specialty flavors." },
};

export default function ShopClient({ products }) {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(() => {
    const cat = searchParams?.get("category");
    return cat ? cat : "all";
  });
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);

  const categories = ["powder", "vape", "liquid", "vape flavours"].filter((cat) =>
    products.some((p) => p.category === cat)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    if (heroRef.current) {
      const els = heroRef.current.querySelectorAll(".hero-anim");
      gsap.fromTo(els,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (!categoriesRef.current) return;
    const sections = categoriesRef.current.querySelectorAll(".category-section");
    sections.forEach((section) => {
      const cards = section.querySelectorAll(".shop-card");
      gsap.killTweensOf(cards);
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [activeFilter]);

  const displayCategories = activeFilter === "all"
    ? categories
    : categories.filter((c) => c === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div ref={heroRef} className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          {/* Breadcrumb */}
          <nav className="hero-anim flex items-center gap-1.5 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#00d4aa] transition-colors">Home</Link>
            <FiChevronRight className="w-3 h-3" />
            <span className="text-[#00d4aa] font-medium">Shop</span>
          </nav>

          <h1 className="hero-anim text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            All <span className="text-[#00d4aa]">Products</span>
          </h1>
          <p className="hero-anim text-gray-600 max-w-xl text-base mb-6">
            Lab-tested, COA-certified etomidate in three forms. Each product ships within 48h with discreet packaging.
          </p>

          {/* Filter pills - Teal style like reference */}
          <div className="hero-anim flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border-2 ${
                activeFilter === "all"
                  ? "bg-[#00d4aa] border-[#00d4aa] text-black"
                  : "bg-white border-gray-300 text-gray-700 hover:border-[#00d4aa] hover:text-[#00d4aa]"
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border-2 ${
                    activeFilter === cat
                      ? "bg-[#00d4aa] border-[#00d4aa] text-black"
                      : "bg-white border-gray-300 text-gray-700 hover:border-[#00d4aa] hover:text-[#00d4aa]"
                  }`}
                >
                  {categoryInfo[cat]?.label} ({count})
                </button>
              );
            })}
            {activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500 hover:text-[#00d4aa] transition-colors"
              >
                <FiX className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div ref={categoriesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {displayCategories.map((cat, catIdx) => {
          const catProducts = products.filter((p) => p.category === cat);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat} className={`category-section ${catIdx > 0 ? "mt-12 pt-12 border-t border-gray-200" : ""}`}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-xl flex items-center justify-center text-[#00d4aa]">
                  {categoryInfo[cat]?.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {categoryInfo[cat]?.heading}
                  </h2>
                  <p className="text-sm text-gray-500">{categoryInfo[cat]?.desc}</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="text-xs text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                    {catProducts.length} product{catProducts.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Product Cards - Clean grid like reference */}
              <div className={`grid gap-4 ${catProducts.length === 1 ? "grid-cols-1 max-w-sm mx-auto" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                {catProducts.map((product) => (
                  <Link key={product._id} href={`/shop/${product.slug}`} className="block group">
                    <div className="shop-card bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
                      {/* Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-900 bg-[#ff6b6b] px-2 py-1 rounded">
                          Multi Buy
                        </span>
                      </div>
                      
                      {/* Image */}
                      <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden p-4">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="text-center">
                            {productIcons[product.category]}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        {/* Name */}
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-gray-900">€{product.price?.toFixed(2)}</span>
                          {product.sizes?.length > 0 && (
                            <span className="text-xs text-gray-500">{product.sizes[0]?.label}</span>
                          )}
                        </div>

                        {/* Quick add button */}
                        <button className="w-full py-2 bg-[#00d4aa] text-black text-sm font-semibold rounded hover:bg-[#00b894] transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {displayCategories.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}




