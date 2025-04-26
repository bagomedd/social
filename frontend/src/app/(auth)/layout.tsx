export default function RootRegisterLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return(
        <html>
            <body>
                
                {children}
            </body>
        </html>
    )
}