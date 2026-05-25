import Link from "next/link";
import { FiMail, FiPhone, FiTruck, FiArrowRight } from "react-icons/fi";
import { FaFlask, FaVial, FaTint } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-500 mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/logo.svg" alt="EtomidateShop.com" className="h-10" />
            </div>
            <p className="text-sm leading-relaxed">
              Premium etomidate products for researchers and licensed buyers. Quality-tested, discreetly shipped worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="flex items-center gap-2 hover:text-gray-900 transition-colors group">
                  <FiArrowRight className="w-3 h-3 text-[#00d4aa] group-hover:translate-x-0.5 transition-transform" />
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=powder" className="flex items-center gap-2 hover:text-gray-900 transition-colors group">
                  <FaFlask className="w-3 h-3 text-[#00d4aa]" />
                  Etomidate Powder
                </Link>
              </li>
              <li>
                <Link href="/shop?category=vape" className="flex items-center gap-2 hover:text-gray-900 transition-colors group">
                  <FaVial className="w-3 h-3 text-[#00d4aa]" />
                  K-Pods (Vape)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=liquid" className="flex items-center gap-2 hover:text-gray-900 transition-colors group">
                  <FaTint className="w-3 h-3 text-[#00d4aa]" />
                  Etomidate Liquid
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-2 hover:text-gray-900 transition-colors group">
                  <FiArrowRight className="w-3 h-3 text-[#00d4aa] group-hover:translate-x-0.5 transition-transform" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-[#00d4aa] shrink-0" />
                orders@etomidateshop.com
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-[#00d4aa] shrink-0" />
                +15125922145
              </li>
              <li className="flex items-start gap-2.5 pt-2 text-xs">
                <FiTruck className="w-4 h-4 text-[#00d4aa] shrink-0 mt-0.5" />
                All orders shipped within 48h via tracked, discreet packaging.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} EtomidateShop.com — All rights reserved.
        </div>
      </div>
    </footer>
  );
}


