import AboutPage from "@/components/modules/homepage/About";
import Categories from "@/components/modules/homepage/Categories";
import { GrowSkillsSection } from "@/components/modules/homepage/GrowSkills";
import { Navbar } from "@/components/Navbar1";
import Footer from "@/components/ui/Footer";

export default function CommonLaout({children}: {children : React.ReactNode}){
    return(
        <div>
              <Navbar></Navbar>
             <Categories/>
             {children}
            <AboutPage/>
            <GrowSkillsSection/>
           <Footer></Footer>
        </div>
    )
}