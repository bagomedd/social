import {TopUI, SideUI} from "@/Components/UI"; 
import "@/styles/globals.css"
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
return (
<>
  <div className="page">
    <TopUI />
    <div className="header-after">
    <SideUI/>
    <div className="side-after">
      <div className="feed">
      {children}
      
      </div>
    </div>
    </div>
  </div>
</>
);
}

