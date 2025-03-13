import type { Metadata } from "next";
import "../styles/root-styles.css";
import "bootstrap/dist/css/bootstrap.css"
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import {Poppins} from "next/font/google"

export const metadata: Metadata = {
  title: "Listare",
  description: "Seu novo app de gerenciamento de tarefas",
};
const googlePoppinsFont = Poppins({
  variable:"--font-poppins",
  subsets:["latin"],
  weight:["400","500","700"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={"Layout "+googlePoppinsFont.className}>
        {children}
      </body>
    </html>
  );
}

