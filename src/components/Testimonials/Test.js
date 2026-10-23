"use client";

import {
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import clientImage from "@/assets/new/client.png";
import quoteImage from "@/assets/new/quote.svg";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Customer",
    message:
      "We have a great business relationship with TheSmartPixel. We had worked with several other marketing companies in the past who did not deliver results and I am happy to say TheSmartPixel is doing that for us. They help bring our vision to life in a way that makes sense",
    imgUrl: clientImage,
  },
  {
    id: 2,
    name: "Customer",
    message:
      "TheSmartPixel has done a wonderful job redesigning our website to take it from plain and functional to amazingly professional. We would highly recommend TheSmartPixel to any business that needs a hand improving their internet traffic or their business.",
    imgUrl: clientImage,
  },
  {
    id: 3,
    name: "Customer",
    message:
      "Today we work with statistics and more accurate data and realize the digital space is an essential tool for Clinica da Mama to position itself in an increasingly competitive field",
    imgUrl: clientImage,
  },
  {
    id: 4,
    name: "Customer",
    message:
      "It really met my requirements. You guys were very patient even though there were delays from my side. The price was competitive and all our requirements were met. If somebody were to ask me for something similar, I would definitely recommend you guys!",
    imgUrl: clientImage,
  },
];

const Test = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || isHovered || hasFocus || prefersReducedMotion) return undefined;

    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, isHovered, hasFocus, prefersReducedMotion]);

  const showPrevious = () => {
    setIsPaused(true);
    setActiveSlide((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setIsPaused(true);
    setActiveSlide((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="bg-[#FAF1F2] py-24 sm:py-32">
      <div
        className="app__container grid grid-cols-1 gap-8 md:grid-cols-2"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setHasFocus(false);
          }
        }}
      >
        <div className="relative left-[5%] right-[5%] h-80 min-w-0">
          <ChatBubbleLeftRightIcon
            className="absolute right-12 h-60 w-60 text-[#ffdbc2] md:bottom-12"
            aria-hidden="true"
          />
          <div className="absolute pr-8 md:top-12">
            <h2 className="highlight z-2">Testimonials</h2>
            <p className="mt-2 text-4xl font-extrabold">
              See What Our <br />
              <span className="highlight">Client</span> Says
            </p>
            <p className="mt-4 app__text">
              Discover what our clients are saying about our digital marketing solutions. Read
              testimonials from satisfied customers and learn how TheSmartPixel has helped
              businesses like yours achieve their marketing goals.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="relative grid grid-cols-1 content-start rounded-xl bg-white px-6 py-12 shadow-lg">
            <Image
              src={quoteImage}
              className="pointer-events-none absolute bottom-0 right-2"
              height={150}
              width={150}
              alt=""
            />
            {testimonials.map((testimonial, index) => {
              const isActive = activeSlide === index;

              return (
                <div
                  key={testimonial.id}
                  className={`slide-test app__text ${isActive ? "activeSlider-test" : ""}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                  aria-hidden={!isActive}
                >
                  <p className="relative z-10 pr-3">&ldquo; {testimonial.message} &rdquo;</p>
                  <div className="relative z-10 mt-6 flex items-center justify-start gap-4">
                    <Image src={testimonial.imgUrl} height={50} width={50} alt="" />
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous testimonial"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next testimonial"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <p
                className="ml-1 text-sm tabular-nums text-gray-700"
                aria-live={isPaused || prefersReducedMotion ? "polite" : "off"}
                aria-atomic="true"
              >
                {activeSlide + 1} of {testimonials.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPaused((current) => !current)}
              disabled={prefersReducedMotion}
              aria-label={isPaused ? "Resume automatic testimonial rotation" : "Pause automatic testimonial rotation"}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPaused || prefersReducedMotion ? (
                <PlayIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PauseIcon className="h-4 w-4" aria-hidden="true" />
              )}
              {prefersReducedMotion ? "Auto-rotation off" : isPaused ? "Play" : "Pause"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test;
