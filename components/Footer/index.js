import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = () => {
  return (
    <footer className="mt-24 laptop:mt-40 px-4 laptop:px-0">

      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-2xl font-semibold opacity-70 mb-4">
          Contact
        </h2>

        {/* Big CTA */}
        <h1 className="text-4xl tablet:text-6xl laptop:text-7xl font-bold tracking-tight">
          Let's Work
        </h1>

        <h1 className="text-4xl tablet:text-6xl laptop:text-7xl font-bold tracking-tight mb-8">
          Together
        </h1>

        {/* Button */}
        <div className="flex justify-center mb-10">
          <a href="mailto:youremail@example.com">
            <Button type="primary">Send me an email</Button>
          </a>
        </div>

        {/* Social icons */}
        <div className="flex justify-center mb-14">
          <Socials />
        </div>

        {/* Divider */}
        <div className="border-t border-black/10 pt-6 flex flex-col laptop:flex-row justify-between items-center gap-4">

          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Duvchindorj
          </p>

          <p className="text-sm opacity-60">
            Built with Next.js & Tailwind
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;