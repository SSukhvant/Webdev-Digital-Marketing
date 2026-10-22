"use client"
import { motion } from 'framer-motion'
import Image from "next/image";
import callIcon from "@/assets/img/svg/call.svg";
import chatIcon from "@/assets/img/svg/chat.svg";
import placeholderIcon from "@/assets/img/svg/placeholder.svg";
import "./ContactAddress.css";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const items = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const ContactAddress = () => {
  return (
    <section className="contact-us-wrapper py-16 md:py-32 bg-slate-50">
      <div className="app__container contact-heading text-center mx-w-700 m-auto pb-50 pb-md-30 get-bottom animate">
        <div className="section-title pb-25 animate">
          <h2 className="text-3xl primary-heading capitalize">Contact us for any <span className="highlight">help</span></h2>
        </div>
        <p className="pt-4 app__text">
          How many days to promote for accurate response, How to manage the
          promotional budget and what to promote?
        </p>
      </div>
      <div className="app__container mt-8">
        <motion.div variants={variants} initial="hidden" whileInView="show" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={items}>
            <div className="contact-card common-single-card h4-offer-card paste-hover bg-white flex justify-center items-center flex-col shadow-md">
              <div className="contact-card-icon card-paste svg-paste p-6 drop-shadow-lg">
                <Image src={callIcon} alt="call" />
              </div>
              <div className="contact-card-content mt-4">
                <a
                  href="tel:+917906514988"
                  className="font-semibold text-gray-900 transition-colors hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700"
                  aria-label="Call The Smart Pixel at +91 79065 14988"
                >
                  +91 79065 14988
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div variants={items}>
            <div className="contact-card common-single-card h4-offer-card pink-hover bg-white flex justify-center items-center flex-col shadow-md">
              <div className="contact-card-icon card-pink1 svg-pink1 p-6 drop-shadow-lg">
                <Image src={chatIcon} alt="chat" />
              </div>
              <div className="contact-card-content mt-4">
                <a
                  href="mailto:info@thesmartpixel.tech"
                  className="font-semibold text-gray-900 transition-colors hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700"
                >
                  info@thesmartpixel.tech
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div variants={items}>
            <div className="contact-card common-single-card h4-offer-card purple-hover bg-white flex justify-center items-center flex-col shadow-md">
              <div className="contact-card-icon card-purple svg-purple p-6 drop-shadow-lg">
                <Image src={placeholderIcon} alt="placeholder" />
              </div>
              <div className="contact-card-content mt-4">
                <h6 className='font-semibold'>
                  Sector 91, Mohali,
                  <br />
                  Punjab, India - 140307
                </h6>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactAddress;
