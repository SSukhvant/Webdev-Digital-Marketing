import { PageWrapper } from "@/app/page-wrapper"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import ContactForm from "@/components/ContactPage/ContactForm"
import Seo from "@/components/SEO/Seo"
import SeoServices from "@/components/SEO/SeoServices"

export const metadata = {
  title: "SEO Services",
  description: "Explore search engine optimisation services focused on making websites easier to discover through relevant content and technical improvements.",
}
const SeoService = () => {
  return (
    <>
    <Breadcrumbs name={"SEO Services"}/>
    <PageWrapper>
    <Seo/>
    </PageWrapper>

    <PageWrapper>
    <SeoServices/>
    </PageWrapper>

    <PageWrapper>
    <ContactForm heading={`Get in <span class="highlight">Touch</span>`} color={"bg-white"}/>
    </PageWrapper>
    </>
  )
}

export default SeoService