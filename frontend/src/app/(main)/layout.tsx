import {TopUI} from "@/Components/TopUI";
import "./globals.css"

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
       <TopUI/>
        {children}
      </body>
    </html>
  );
}

