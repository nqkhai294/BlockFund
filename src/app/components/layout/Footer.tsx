"use client";

import Link from "next/link";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Logo from "./navbar/Logo";
import Container from "../Container";

const footerLinks = {
  platform: [
    { name: "Features", href: "/features" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "About us", href: "/about" }
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/support" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimers", href: "/disclaimers" }
  ]
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "GitHub", icon: Github, href: "https://github.com" }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 py-12 bg-black text-white">
      <Container>
        <div className="max-w-6xl mx-auto px-4 ">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Brand + Description */}
            <div className="md:w-2/5">
              <div className="flex items-center mb-4">
                <Logo />
              </div>
              <p className="text-gray-400 text-sx">
                Connecting innovative blockchain projects with investors through
                a transparent funding platform.
              </p>
              <div className="flex gap-4 mt-4 text-gray-400">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sx">
              <div>
                <h4 className="font-semibold mb-2">Platform</h4>
                <ul className="space-y-1 text-gray-400">
                  {footerLinks.platform.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resources</h4>
                <ul className="space-y-1 text-gray-400">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal</h4>
                <ul className="space-y-1 text-gray-400">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-sx  text-center md:text-left">
            &copy; {currentYear} BlockFund. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
