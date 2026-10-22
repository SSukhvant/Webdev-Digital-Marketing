"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import digitalMarketingImage from "@/assets/new/services/dm.png";
import ppcImage from "@/assets/new/services/ppc.png";
import smoImage from "@/assets/new/services/smo.png";
import seoImage from "@/assets/new/services/seo.png";
import socialMarketingImage from "@/assets/new/services/socialMarketing.png";
import websiteOptimizationImage from "@/assets/new/services/wo.png";
import webDevelopmentImage from "@/assets/new/services/wd.png";

const services = [
  {
    heading: "Digital Marketing",
    imgUrl: digitalMarketingImage,
    hoverBg: "pink-hover",
    iconColor: "pink-text",
  },
  {
    heading: "PPC Service",
    imgUrl: ppcImage,
    hoverBg: "paste-hover",
    iconColor: "paste-text",
  },
  {
    heading: "SMO Service",
    imgUrl: smoImage,
    hoverBg: "yellow-hover",
    iconColor: "yellow-text",
  },
  {
    heading: "SEO Service",
    imgUrl: seoImage,
    hoverBg: "purple-hover",
    iconColor: "purple-text",
  },
  {
    heading: "Social Marketing",
    imgUrl: socialMarketingImage,
    hoverBg: "pink-hover",
    iconColor: "pink-text",
  },
  {
    heading: "Web Optimization",
    imgUrl: websiteOptimizationImage,
    hoverBg: "paste-hover",
    iconColor: "paste-text",
  },
  {
    heading: "Web Development",
    imgUrl: webDevelopmentImage,
    hoverBg: "yellow-hover",
    iconColor: "yellow-text",
  },
];

const CaseStudy = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  return (
    <section className="py-24 sm:py-32">
      <div className="app__container grid grid-cols-1 md:grid-cols-2 gap-y-8">
        <div className="my-auto">
          <h1 className="primary-heading">
            Any Doubt ? Just <br />
            Check Out <span className="highlight">Case Study.</span>
          </h1>
        </div>

        <div>
          <motion.div
            ref={carousel}
            className="carousel"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="inner-carousel py-2"
            >
              {services.map((index, key) => {
                return (
                  <motion.div key={key} className="mx-2">
                    <div
                      className={`common-single-card flex flex-col py-8 md:py-12 px-16 md:px-20 ${index.hoverBg}`}
                    >
                      <div className={`mx-auto w-44 md:w-52 h-44 md:h-52 ${index.iconColor}`}>
                        <Image
                          src={index.imgUrl}
                          height={400}
                          width={400}
                          alt=""
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold mt-8 mb-4">
                          {index.heading}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
