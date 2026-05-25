"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaFlask, FaVial, FaTint, FaAppleAlt } from "react-icons/fa";
import { FiCheckCircle, FiUser, FiMail, FiMapPin, FiMessageSquare, FiShoppingBag, FiChevronRight, FiLoader, FiArrowLeft, FiPackage, FiShield, FiTruck } from "react-icons/fi";

const categoryIcons = {
  powder: <FaFlask className="w-10 h-10 text-[#00d4aa]" />,
  vape: <FaVial className="w-10 h-10 text-[#00d4aa]" />,
  liquid: <FaTint className="w-10 h-10 text-[#00d4aa]" />,
  flavours: <FaAppleAlt className="w-10 h-10 text-[#00d4aa]" />,
};

export default function OrderPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", message: "" });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const found = data.products?.find((p) => p.slug === slug);
        setProduct(found || null);
        // If size was passed via query param
        const sizeParam = searchParams.get("size");
        if (sizeParam && found?.sizes?.length) {
          const idx = found.sizes.findIndex((s) => s.label === sizeParam);
          if (idx >= 0) setSelectedSize(idx);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug, searchParams]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <FiLoader className="w-8 h-8 text-[#00d4aa] animate-spin mx-auto mb-3" />
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Product Not Found</h1>
        <Link href="/shop" className="text-[#00d4aa] hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const handleOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.slug,
          productName: product.name,
          size: product.sizes?.[selectedSize]?.label || "Standard",
          price: product.sizes?.[selectedSize]?.price || product.price || 0,
          customerName: form.name,
          customerEmail: form.email,
          shippingAddress: form.address,
          message: form.message,
        }),
      });
      if (res.ok) {
        setOrderPlaced(true);
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order. Try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentPrice = product.sizes?.[selectedSize]?.price || product.price || 0;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">
            <div className="w-20 h-20 bg-[#00d4aa]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiCheckCircle className="w-10 h-10 text-[#00d4aa]" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 mb-2">
              Thank you, <span className="font-semibold text-gray-800">{form.name}</span>.
            </p>
            <p className="text-gray-500 mb-6">
              Your order for{" "}
              <span className="font-semibold text-gray-800">
                {product.name} — {product.sizes?.[selectedSize]?.label || "Standard"}
              </span>{" "}
              has been received. Payment instructions will be sent to{" "}
              <span className="font-semibold text-gray-800">{form.email}</span>.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#00d4aa] hover:bg-[#00b894] text-black font-bold px-8 py-3 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <FiShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#00d4aa] transition-colors">Home</Link>
          <FiChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[#00d4aa] transition-colors">Shop</Link>
          <FiChevronRight className="w-3 h-3" />
          <Link href={`/shop/${product.slug}`} className="hover:text-[#00d4aa] transition-colors truncate max-w-[120px]">{product.name}</Link>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-[#00d4aa] font-medium">Order</span>
        </nav>

        {/* Back link */}
        <Link href={`/shop/${product.slug}`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#00d4aa] transition-colors mb-6">
          <FiArrowLeft className="w-3.5 h-3.5" />
          Back to product
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Product Summary Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  categoryIcons[product.category]
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#00d4aa] uppercase tracking-wider mb-0.5 capitalize">{product.category}</p>
                <h1 className="text-lg font-extrabold text-gray-900 leading-tight">{product.name}</h1>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Total</p>
                <p className="text-2xl font-extrabold text-[#00d4aa]">€{currentPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Selected quantity row */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">Selected quantity</span>
              <span className="text-sm font-bold text-gray-900 bg-[#00d4aa]/10 text-[#00b894] px-3 py-1 rounded-full">
                {product.sizes?.[selectedSize]?.label || "Standard"}
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          {product.sizes?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Choose Quantity
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.sizes.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(i)}
                    className={`px-4 py-3.5 rounded-xl border text-sm font-medium transition-all text-center ${
                      selectedSize === i
                        ? "bg-[#00d4aa] text-black border-[#00d4aa] shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#00d4aa] hover:bg-[#00d4aa]/5"
                    }`}
                  >
                    <span className="block font-bold">{size.label}</span>
                    <span className={`text-sm mt-0.5 block ${selectedSize === i ? "text-black/70" : "text-[#00b894]"}`}>€{size.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Order Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-gray-900 mb-6">
              <FiUser className="w-5 h-5 text-[#00d4aa]" />
              Your Details
            </h3>

            <form onSubmit={handleOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Shipping Address</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="123 Main St, Berlin, Germany"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Message <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    placeholder="Any special requests or questions..."
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent placeholder:text-gray-400 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-[#00d4aa] hover:bg-[#00b894] disabled:opacity-60 text-black font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#00d4aa]/25 mt-2 text-base"
              >
                {submitting ? (
                  <FiLoader className="w-5 h-5 animate-spin" />
                ) : (
                  <FiShoppingBag className="w-5 h-5" />
                )}
                {submitting ? "Placing Order..." : `Place Order — €${currentPrice.toFixed(2)}`}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Payment instructions will be sent to your email after confirmation.
              </p>
            </form>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: FiShield, label: "Secure Order" },
              { icon: FiTruck, label: "Discreet Shipping" },
              { icon: FiPackage, label: "COA Included" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center gap-1.5 shadow-sm">
                <Icon className="w-5 h-5 text-[#00d4aa]" />
                <span className="text-xs font-semibold text-gray-600 text-center">{label}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
}
