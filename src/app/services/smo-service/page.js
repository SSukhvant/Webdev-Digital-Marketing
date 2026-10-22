import { PageWrapper } from "@/app/page-wrapper"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import ContactForm from "@/components/ContactPage/ContactForm"
import SemService from "@/components/SMO/SemService"
import ServiceInclude from "@/components/SMO/ServiceInclude"
import Smo from "@/components/SMO/Smo"

export const metadata = {
  title: "Social Media Optimization",
  description: "Strengthen your social presence with social media optimisation services for profile improvements, content discovery and audience engagement.",
}
const sections = [
  {
    section: <Smo/>
  },{
    section: <SemService/>
  },{
    section: <ServiceInclude/>
  },{
    section: <ContactForm heading={`Get in <span class="highlight">Touch</span>`} color={"bg-slate-50"}/>
  }
]
const SmoService = () => {
  return (
    <>
    <Breadcrumbs name={"SMO Services"}/>
    {
      sections.map((i,k) => {
        return (
          <PageWrapper key={k}>
          {i.section}
          </PageWrapper>
        )
      })
    }
    </>
  )
}

export default SmoService