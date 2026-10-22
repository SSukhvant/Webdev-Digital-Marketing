import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import ContactAddress from "@/components/ContactPage/ContactAddress"
import ContactForm from "@/components/ContactPage/ContactForm"
import { PageWrapper } from "../page-wrapper"

export const metadata = {
  title: "Contact Us",
  description: "Contact The Smart Pixel to discuss SEO, PPC, social media marketing or web development. Share your project details and get in touch with our team.",
}
const Contact = () => {
  return (
    <>
    <Breadcrumbs name={"Contact Us"}/>
    <PageWrapper>
    <ContactForm heading={`Get in <span class="highlight">Touch</span>`} color={"bg-white"}/>
    </PageWrapper>
    <PageWrapper>
    <ContactAddress/>
    </PageWrapper>
    </>
  )
}

export default Contact