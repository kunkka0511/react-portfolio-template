import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { name, showBlog, showResume, socials } = data;

  const emailLink =
    socials?.find((item) => item.title === "Email")?.link ||
    "mailto:youremail@example.com";

  const navItems = !isBlog
    ? [
        { label: "Work", action: handleWorkScroll },
        { label: "About", action: handleAboutScroll },
        ...(showBlog ? [{ label: "Blog", action: () => router.push("/blog") }] : []),
        ...(showResume ? [{ label: "Resume", action: () => router.push("/resume") }] : []),
        { label: "Contact", action: () => window.open(emailLink) },
      ]
    : [
        { label: "Home", action: () => router.push("/") },
        ...(showBlog ? [{ label: "Blog", action: () => router.push("/blog") }] : []),
        ...(showResume ? [{ label: "Resume", action: () => router.push("/resume") }] : []),
        { label: "Contact", action: () => window.open(emailLink) },
      ];

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open, close }) => (
          <>
            <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md px-3 py-3 shadow-sm">
              <button
                onClick={() => router.push("/")}
                className="text-left font-semibold tracking-tight text-base"
              >
                {name}
                <span className="opacity-50">.</span>
              </button>

              <Popover.Button
                className="h-10 w-10 rounded-full border border-black/10 flex items-center justify-center bg-white/70 hover:scale-105 transition"
                aria-label="Open menu"
              >
                <img
                  className="h-5 w-5"
                  src={`/images/${!open ? "menu.svg" : "cancel.svg"}`}
                  alt="menu icon"
                />
              </Popover.Button>
            </div>

            <Popover.Panel className="absolute right-0 left-0 mx-2 mt-3 z-20 rounded-2xl border border-black/10 bg-white/90 backdrop-blur-xl shadow-xl p-3">
              <div className="grid grid-cols-1 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action();
                      close();
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-black/[0.03] hover:bg-black/[0.06] transition font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div className="mt-10 hidden tablet:flex items-center justify-between sticky top-0 z-20 rounded-2xl border border-black/10 px-4 py-3 shadow-sm backdrop-blur-md bg-white/75">
        <button
          onClick={() => router.push("/")}
          className="font-semibold tracking-tight text-lg text-left"
        >
          {name}
          <span className="opacity-50">.</span>
        </button>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="px-4 py-2 rounded-full text-sm font-medium bg-black/[0.04] hover:bg-black/[0.08] transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;