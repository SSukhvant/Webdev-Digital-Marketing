"use client"
import Image from "next/image"
import { useEffect, useState } from "react";

const WeCan = () => {
   const services = [
    {
        name: "Digital Marketing",
        imgUrl: digitalMarketingImage,
        bgColour: "bg-green-100"
    },{
        name: "PPC Services",
        imgUrl: ppcImage,
        bgColour: "bg-slate-100"
    },{
        name: "SMO Services",
        imgUrl: smoImage,
        bgColour: "bg-yellow-100"
    },{
        name: "SEO Services",
        imgUrl: seoImage,
        bgColour: "bg-rose-100"
    },{
        name: "Social Marketing",
        imgUrl: socialMarketingImage,
        bgColour: "bg-purple-100"
    },{
        name: "Website Optimization",
        imgUrl: websiteOptimizationImage,
        bgColour: "bg-blue-100"
    },{
        name: "Web Development",
        imgUrl: webDevelopmentImage,
        bgColour: "bg-pink-100"
    },
   ]

   const [activeSlide, setActiveSlide] = useState(0);

   useEffect(() => {
     const interval = setInterval(() => {
       setActiveSlide((prevState) => (prevState + 1) % services.length);
     }, 3000);
 
     return () => clearInterval(interval);
   }, [services.length]);
  return (
    <section className="py-24 sm:py-32">
    <div className="app__container grid grid-cols-1 md:grid-cols-2 gap-y-8">
    <div className="my-auto md:pr-24">
    <h1 className="primary-heading capitalize">What we can <br/>do for <span className="highlight">you?</span></h1>
    <p className="app__text mt-4">We are perfect in providing solution in certain areas of technology. We have a bunch of services that could speed up your entire business functioning.</p>
    </div>

    <div className="relative h-[500px] p-0">
     {
        services.map((i,k) => {
            return (
             <div key={k} className={`slide ${i.bgColour} flex justify-end flex-col items-center shadow-lg rounded-xl app__text ${
                activeSlide === k ? "activeSlider" : ""
              }`}>
             <Image src={i.imgUrl} height={400} width={400} alt=""/>
             <div className="py-6 bg-white w-full rounded-xl">
             <h1 className="font-bold text-2xl text-center">{i.name}</h1>
             </div>
             </div>
            )
        })
     }
    </div>
    </div>
    </section>
  )
}

export default WeCan