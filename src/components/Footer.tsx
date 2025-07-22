import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Twitch, Twitter } from "lucide-react";

export default function Footer() {
  const menuLinks = [
    { text: "Order tracking", href: "/tracking" },
    { text: "Store location", href: "/locations" },
    { text: "Return policy", href: "/returns" },
    { text: "Support", href: "/support" },
  ];

  const resourceLinks = [
    { text: "Blog", href: "/blog" },
    { text: "Help center", href: "/help" },
    { text: "Documentation", href: "/docs" },
    { text: "Guidelines", href: "/guidelines" },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: "https://instagram.com" },
    { icon: <Youtube size={20} />, href: "https://youtube.com" },
    { icon: <Twitch size={20} />, href: "https://twitch.tv" },
    { icon: <Twitter size={20} />, href: "https://twitter.com" },
  ];

  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/kZ-logo.svg" // Pastikan Anda memiliki logo versi putih/terang
                alt="KZ Store Logo"
                width={100}
                height={40}
                className="w-24 h-auto"
              />
            </Link>
          </div>

          {/* Menu Column */}
          <div>
            <h5 className="font-bold text-white mb-4">Menu</h5>
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h5 className="font-bold text-white mb-4">Resources</h5>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="col-span-2 md:col-span-1">
            <h5 className="font-bold text-white mb-4">Follow us on:</h5>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {new Date().getFullYear()} KZStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
