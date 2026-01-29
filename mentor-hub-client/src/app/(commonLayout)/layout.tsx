import { Navbar } from "@/components/navbar1";

export default function CommonLaout({children}: {children : React.ReactNode}){
    return(
        <div>
              <Navbar></Navbar>
        
           {children}
        </div>
    )
}