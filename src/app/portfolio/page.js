import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import PortfolioIsoTop from "@/components/Portfolio/PortfolioIsoTop"

export const metadata = {
  title: "Portfolio",
  description: "Explore selected portfolio work from The Smart Pixel across digital marketing, creative campaigns and web development.",
}

const Portfolio = () => {
  return (
    <>
    <Breadcrumbs name={"Portfolio"}/>
    <PortfolioIsoTop/>
    </>
  )
}

export default Portfolio