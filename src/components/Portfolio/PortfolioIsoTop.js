"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import portfolioImages from "./portfolio-images";

const thumbnailSizes =
  "(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw";

const PortfolioIsoTop = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeGallery = () => setSelectedIndex(null);

  const showNext = () => {
    setSelectedIndex((current) =>
      current === null ? current : (current + 1) % portfolioImages.length,
    );
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null
        ? current
        : (current - 1 + portfolioImages.length) % portfolioImages.length,
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((current) =>
          current === null ? current : (current + 1) % portfolioImages.length,
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((current) =>
          current === null
            ? current
            : (current - 1 + portfolioImages.length) % portfolioImages.length,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="py-12 md:py-16">
      <div className="app__container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            A closer look at our work
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-600">
            Explore selected projects from our portfolio.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
          {portfolioImages.map((projectImage, index) => (
            <button
              key={projectImage.src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View portfolio project ${index + 1}`}
              className="group block w-full overflow-hidden rounded-xl bg-gray-100 text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700"
            >
              <Image
                src={projectImage}
                alt={`Portfolio project ${index + 1}`}
                sizes={thumbnailSizes}
                className="block h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={selectedIndex !== null}
        onClose={closeGallery}
        className="relative z-[100]"
      >
        <div className="fixed inset-0 bg-black/85" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto p-3 sm:p-6">
          <div className="flex min-h-full items-center justify-center">
            {selectedIndex !== null && (
              <DialogPanel className="relative w-full max-w-5xl rounded-xl bg-black p-3 shadow-2xl sm:p-5">
                <DialogTitle className="sr-only">
                  Portfolio project {selectedIndex + 1}
                </DialogTitle>

                <button
                  type="button"
                  onClick={closeGallery}
                  aria-label="Close portfolio image"
                  className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Image
                  key={selectedIndex}
                  src={portfolioImages[selectedIndex]}
                  alt={`Portfolio project ${selectedIndex + 1}`}
                  sizes="(max-width: 1023px) 100vw, 80vw"
                  loading="eager"
                  className="mx-auto block h-auto max-h-[78vh] w-auto max-w-full object-contain"
                />

                <div className="mt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous portfolio project"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <ArrowSmallLeftIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                  <p className="text-sm tabular-nums text-white/75" aria-live="polite">
                    {selectedIndex + 1} of {portfolioImages.length}
                  </p>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next portfolio project"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowSmallRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </DialogPanel>
            )}
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default PortfolioIsoTop;
