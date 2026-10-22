"use client";

import image from "@/constant/Images/image";
import { sendContactForm } from "@/lib/api";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import Image from "next/image";
import { useState } from "react";

const initialValues = { name: "", email: "", number: "", service: "", message: "" };

export default function ContactForm({ heading, color = "bg-white" }) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status.type === "loading") return;
    setStatus({ type: "loading", message: "Sending your message…" });
    try {
      const result = await sendContactForm(values);
      setStatus({ type: "success", message: result.message || "Thanks! Your message has been sent." });
      setValues(initialValues);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to send your message. Please try again." });
    }
  }

  const inputClass = "block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 shadow-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100";
  const fieldClass = "mt-2";

  return (
    <section className={color}>
      <div className="app__container grid grid-cols-1 gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="my-auto">
          <Image src={image.getInTouch} alt="Contact our team" className="h-auto w-full" />
        </div>
        <form onSubmit={handleSubmit} className="min-w-0" aria-busy={status.type === "loading"}>
          <div className="pb-6">
            <h2 className="text-3xl primary-heading leading-tight capitalize text-gray-900"
              dangerouslySetInnerHTML={{ __html: heading }} />
            <a className="mt-4 inline-flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-700"
              href="mailto:info@thesmartpixel.tech">
              <FaEnvelope aria-hidden="true" className="text-[#EA4335]" />
              info@thesmartpixel.tech
            </a>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-900">Full name</label>
                <input className={`${inputClass} ${fieldClass}`} id="contact-name" name="name" value={values.name} onChange={handleChange} autoComplete="name" maxLength={100} required />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-900">Email address</label>
                <input className={`${inputClass} ${fieldClass}`} id="contact-email" name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" maxLength={254} required />
              </div>
              <div>
                <label htmlFor="contact-number" className="block text-sm font-medium text-gray-900">Phone number</label>
                <input className={`${inputClass} ${fieldClass}`} id="contact-number" name="number" type="tel" value={values.number} onChange={handleChange} autoComplete="tel" maxLength={30} required />
              </div>
              <div>
                <label htmlFor="contact-service" className="block text-sm font-medium text-gray-900">What do you need?</label>
                <select className={`${inputClass} ${fieldClass}`} id="contact-service" name="service" value={values.service} onChange={handleChange} required>
                  <option value="">Select a service</option>
                  <option value="website">Website</option>
                  <option value="seo">SEO</option>
                  <option value="smo">Social media optimization</option>
                  <option value="campaign">Paid campaign</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-900">Tell us about your project</label>
                <textarea className={`${inputClass} ${fieldClass}`} id="contact-message" name="message" value={values.message} onChange={handleChange} rows={5} maxLength={5000} required />
              </div>
            </div>
          </div>
          <button type="submit" disabled={status.type === "loading"}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-indigo-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
            {status.type === "loading" ? "Sending…" : "Send message"}
          </button>
          <p className={`mt-4 text-sm ${status.type === "error" ? "text-red-700" : status.type === "success" ? "text-green-700" : "text-gray-600"}`} role="status" aria-live="polite">
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
}
