import { PageWrapper } from "@/app/page-wrapper"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import ContactForm from "@/components/ContactPage/ContactForm"
import Ppc from "@/components/PPC/Ppc"
import Trend from "@/components/PPC/Trend"
import WeHelp from "@/components/PPC/WeHelp"

export const metadata = {
  title: "PPC Advertising Services",
  description: "Learn about pay-per-click advertising services for planning, managing and improving paid digital campaigns across relevant channels.",
}
const sections = [
  {
    section: <Ppc/>
  },{
    section: <WeHelp name={"PPC Services"}/>
  },{
    section: <Trend/>
  },{
    section: <ContactForm heading={`Get in <span class="highlight">Touch</span>`} color={"bg-slate-50"}/>
  }
]
const PpcService = () => {
  return (
    <>
    <Breadcrumbs name={"PPC Services"}/>
    {sections.map((i,k) => {
      return (
        <PageWrapper key={k}>
        {i.section}
        </PageWrapper>
      )
    })}
    </>
  )
}

export default PpcService