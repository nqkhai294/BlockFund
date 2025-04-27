"use client";

import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "./navbar/Logo";
import Container from "../Container";

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
                <FaTwitter className="hover:text-white cursor-pointer size-6" />
                <FaGithub className="hover:text-white cursor-pointer size-6" />
                <FaLinkedin className="hover:text-white cursor-pointer size-6" />
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sx">
              <div>
                <h4 className="font-semibold mb-2">Platform</h4>
                <ul className="space-y-1 text-gray-400">
                  <li>
                    <a href="#features">Features</a>
                  </li>
                  <li>
                    <a href="#projects">Projects</a>
                  </li>
                  <li>
                    <a href="#how-it-works">Services</a>
                  </li>
                  <li>
                    <a href="#">About us</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resources</h4>
                <ul className="space-y-1 text-gray-400">
                  <li>
                    <a href="#">Documentation</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal</h4>
                <ul className="space-y-1 text-gray-400">
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                  <li>
                    <a href="#">Cookie Policy</a>
                  </li>
                  <li>
                    <a href="#">Disclaimers</a>
                  </li>
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
