import { useRef } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";

import data from "../data/portfolio.json";

export default function Home() {
  const workRef = useRef();
  const aboutRef = useRef();

  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  const skillItems = [
    ...(data?.resume?.frameworks || []),
    ...(data?.resume?.languages || []),
    ...(data?.resume?.others || []),
  ].slice(0, 12);

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        data.showCursor && "cursor-none"
      } bg-gradient-to-b from-[#fffdf8] via-[#f8fbff] to-[#fffaf5] text-black`}
    >
      {data.showCursor && <Cursor />}

      <Head>
        <title>{data.name}</title>
      </Head>

      {/* pastel glow */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl"></div>
      <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-yellow-100/40 blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 laptop:px-0 pb-12">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />

        {/* HERO */}
        <section className="mt-12 laptop:mt-24">
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-10 items-center">
            <div className="rounded-[32px] border border-black/5 bg-white/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 laptop:p-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 text-sm mb-6 text-black/80">
                Frontend Developer • UI/UX Focused
              </div>

              <p
                ref={textOne}
                className="text-lg tablet:text-2xl text-black/70 mb-4"
              >
                {data.headerTaglineOne}
              </p>

              <h1
                ref={textTwo}
                className="text-5xl tablet:text-7xl laptop:text-7xl laptopl:text-8xl font-semibold leading-[1.02] tracking-tight text-black"
              >
                {data.headerTaglineTwo}
              </h1>

              <h1
                ref={textThree}
                className="text-4xl tablet:text-6xl laptop:text-6xl laptopl:text-7xl font-semibold mt-2 leading-[1.05] tracking-tight text-black"
              >
                {data.headerTaglineThree}
              </h1>

              <p
                ref={textFour}
                className="mt-6 text-lg tablet:text-2xl laptop:text-3xl max-w-3xl text-black/70 leading-relaxed"
              >
                {data.headerTaglineFour}
              </p>

              <Socials className="mt-8 laptop:mt-10" />
            </div>

            <div className="flex justify-center laptop:justify-end">
              <div className="relative w-full max-w-xl rounded-[32px] border border-black/5 bg-white/55 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 laptop:p-8">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-pink-100/40 via-transparent to-blue-100/40"></div>
                <img
                  src="/images/duvchko.png"
                  alt="Hero visual"
                  className="relative z-10 w-full max-h-[560px] object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section className="mt-16 laptop:mt-28" ref={workRef}>
          <div className="rounded-[32px] border border-black/5 bg-white/65 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 laptop:p-10">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-semibold text-black">Work.</h2>
                <p className="mt-2 text-sm laptop:text-base text-black/65">
                  Selected projects that reflect my work in development, design, and digital product thinking.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <WorkCard
                  key={project.id}
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  slug={project.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="mt-16 laptop:mt-24">
          <div className="rounded-[32px] border border-black/5 bg-white/60 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 laptop:p-10">
            <h2 className="text-2xl font-semibold text-black">Services.</h2>
            <p className="mt-2 text-sm laptop:text-base text-black/65">
              Areas where I can contribute through design awareness and practical development.
            </p>

            <div className="mt-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
              {data.services.map((service, index) => (
                <ServiceCard
                  key={index}
                  name={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="mt-16 laptop:mt-24" ref={aboutRef}>
          <div className="rounded-[32px] border border-black/5 bg-white/60 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 laptop:p-10">
            <h2 className="text-2xl font-semibold mb-6 text-black">About.</h2>

            <div className="grid grid-cols-1 laptop:grid-cols-[1.5fr_1fr] gap-8 laptop:gap-12 items-start">
              <div className="max-w-4xl">
                <p className="text-lg laptop:text-2xl leading-relaxed text-black/80 whitespace-pre-line">
                  {data.aboutpara}
                </p>
              </div>

              <div className="rounded-[28px] border border-black/5 bg-white/70 backdrop-blur-md p-6 laptop:p-8 shadow-sm">
                <h3 className="text-lg laptop:text-2xl font-semibold mb-5 text-black">
                  Skills & Focus
                </h3>

                <div className="flex flex-wrap gap-3">
                  {skillItems.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className={`px-4 py-2 rounded-full text-sm laptop:text-base ${
                        index === 0
                          ? "bg-black text-white"
                          : "bg-black/5 text-black"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-black/10">
                  <h4 className="text-base laptop:text-lg font-medium mb-3 text-black">
                    Current Focus
                  </h4>

                  <p className="text-sm laptop:text-base leading-relaxed text-black/70">
                    {data.resume?.tagline ||
                      "Building modern, useful, and visually clear digital products."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEV BUTTON */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}