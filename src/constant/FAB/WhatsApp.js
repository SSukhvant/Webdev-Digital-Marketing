import Image from "next/image";
import image from "../Images/image";

const WhatsApp = () => (
  <a
    href="https://wa.me/7906514988"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-24 right-4 z-40 rounded-full drop-shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 md:bottom-8 md:right-8"
  >
    <Image
      src={image.whatsapp}
      width={52}
      height={52}
      alt=""
      aria-hidden="true"
    />
  </a>
);

export default WhatsApp;
