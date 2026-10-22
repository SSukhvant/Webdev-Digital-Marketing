import { PageWrapper } from "@/app/page-wrapper"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import ContactForm from "@/components/ContactPage/ContactForm"
import WebOptimization from "@/components/WebOptimization/WebOptimization"

export const metadata = {
  title: "Website Optimization",
  description: "Explore website optimisation services focused on usability, responsive presentation and site performance.",
}
const WebsiteOptimization = () => {
  return (
    <>
    <Breadcrumbs name={"Web Optimization"}/>
    <PageWrapper>
     <WebOptimization/>
     </PageWrapper>

     <PageWrapper>
     <ContactForm heading={`Get in <span class="highlight">Touch</span>`} color={"bg-slate-50"}/>
     </PageWrapper>
    </>
  )
}

export default WebsiteOptimization