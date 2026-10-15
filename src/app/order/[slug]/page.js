"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaFlask, FaVial, FaTint, FaAppleAlt, FaWhatsapp, FaTelegramPlane, FaBitcoin } from "react-icons/fa";
import { FiUser, FiMapPin, FiMessageSquare, FiAtSign, FiChevronRight, FiLoader, FiArrowLeft, FiPackage, FiShield, FiTruck } from "react-icons/fi";

const WHATSAPP_NUMBER = "15125922145";
const TELEGRAM_USERNAME = "chemsolution12mal";

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
  const [channel, setChannel] = useState(null); // "whatsapp" | "telegram"
  const [form, setForm] = useState({ name: "", telegramUser: "", address: "", message: "" });

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

  const currentPrice = product.sizes?.[selectedSize]?.price || product.price || 0;

  const getCountry = () => {
    // Prefer the last part of the shipping address (usually the country)
    const parts = form.address.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length > 1) return parts[parts.length - 1];
    // Fallback to browser locale region
    try {
      const region = (navigator.language || "").split("-")[1];
      if (region && typeof Intl.DisplayNames === "function") {
        const name = new Intl.DisplayNames(["en"], { type: "region" }).of(region.toUpperCase());
        if (name) return name;
      }
    } catch {}
    return "Not specified";
  };

  const buildOrderMessage = () => {
    const size = product.sizes?.[selectedSize]?.label || "Standard";
    return [
      "Hello EtomidateShop team! 👋",
      "",
      "I'd love to place an order through your website (etomidateshop.com):",
      "",
      `🛍️ Product: ${product.name}`,
      `📦 Quantity: ${size}`,
      `💶 Total: €${currentPrice.toFixed(2)}`,
      `💳 Payment Method: Bitcoin (BTC)`,
      "",
      "My details:",
      `👤 Name: ${form.name}`,
      channel === "telegram" ? `📱 Telegram: @${form.telegramUser.replace(/^@/, "")}` : null,
      `📍 Shipping Address: ${form.address}`,
      `🌍 Country: ${getCountry()}`,
      form.message ? `💬 Note: ${form.message}` : null,
      "",
      "Thank you so much — looking forward to your confirmation and payment details! 🙏",
    ].filter((line) => line !== null).join("\n");
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const message = buildOrderMessage();
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      toast.success("Opening WhatsApp — send the message to confirm your order!");
    } else {
      // Telegram has no direct text param for user chats — use share link so the
      // message is pre-filled, and keep clipboard copy as a fallback.
      if (navigator.clipboard) {
        navigator.clipboard.writeText(message).catch(() => {});
      }
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent("https://etomidateshop.com")}&text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
      toast.success(`Opening Telegram — your order is pre-filled, just select @${TELEGRAM_USERNAME} and send!`);
    }
  };

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
              {/* Payment method notice */}
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <FaBitcoin className="w-6 h-6 text-[#f7931a] shrink-0" />
                <p className="text-xs text-amber-800">
                  <span className="font-bold">We accept Bitcoin (BTC) only.</span>{" "}
                  Our wallet address and payment instructions will be shared in the chat after you send your order.
                </p>
              </div>

              {/* Step 1 — choose channel */}
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setChannel("whatsapp")}
                  className={`flex items-center justify-center gap-2 bg-[#25d366] text-white font-bold py-4 rounded-xl transition-all text-base ${
                    channel === "whatsapp"
                      ? "ring-2 ring-offset-2 ring-[#25d366] shadow-lg shadow-[#25d366]/30 scale-[1.02]"
                      : channel
                        ? "opacity-60 hover:opacity-90"
                        : "hover:bg-[#1ebe5d] hover:shadow-lg hover:shadow-[#25d366]/25"
                  }`}
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Order via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setChannel("telegram")}
                  className={`flex items-center justify-center gap-2 bg-[#0088cc] text-white font-bold py-4 rounded-xl transition-all text-base ${
                    channel === "telegram"
                      ? "ring-2 ring-offset-2 ring-[#0088cc] shadow-lg shadow-[#0088cc]/30 scale-[1.02]"
                      : channel
                        ? "opacity-60 hover:opacity-90"
                        : "hover:bg-[#0077b5] hover:shadow-lg hover:shadow-[#0088cc]/25"
                  }`}
                >
                  <FaTelegramPlane className="w-5 h-5" />
                  Order via Telegram
                </button>
              </div>

              {!channel ? (
                <p className="text-sm text-gray-500 text-center bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl px-4 py-3">
                  Choose WhatsApp or Telegram above — each option has its own requirements.
                </p>
              ) : (
              <>
              <p className="text-xs text-gray-500 text-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                {channel === "whatsapp"
                  ? "We need your name and shipping address — your order opens in WhatsApp ready to send."
                  : "Telegram orders need your @username so we can reply — your order comes pre-filled, just pick our chat and send."}
              </p>

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

              {channel === "telegram" && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Telegram Username</label>
                  <div className="relative">
                    <FiAtSign className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="@yourusername"
                      required
                      value={form.telegramUser}
                      onChange={(e) => setForm({ ...form, telegramUser: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent placeholder:text-gray-400"
                    />
                  </div>
                </div>
              )}

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
                className={`w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-all text-base mt-2 ${
                  channel === "whatsapp"
                    ? "bg-[#25d366] hover:bg-[#1ebe5d] hover:shadow-lg hover:shadow-[#25d366]/25"
                    : "bg-[#0088cc] hover:bg-[#0077b5] hover:shadow-lg hover:shadow-[#0088cc]/25"
                }`}
              >
                {channel === "whatsapp" ? <FaWhatsapp className="w-5 h-5" /> : <FaTelegramPlane className="w-5 h-5" />}
                {channel === "whatsapp"
                  ? `Send Order on WhatsApp — €${currentPrice.toFixed(2)}`
                  : `Send Order on Telegram — €${currentPrice.toFixed(2)}`}
              </button>

              {channel === "telegram" && (
                <p className="text-center text-xs text-gray-400">
                  Can&apos;t find our chat in the share list?{" "}
                  <a
                    href={`https://t.me/${TELEGRAM_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0088cc] font-semibold hover:underline"
                  >
                    Open @{TELEGRAM_USERNAME} directly
                  </a>
                  {" "}(details are already copied — just paste)
                </p>
              )}
              </>
              )}
            </form>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: FaBitcoin, label: "BTC Payments" },
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
