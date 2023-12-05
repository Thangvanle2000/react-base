import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { Providers } from "./redux/provider";
import "../assets/styles/style.scss";
export const metadata = {
  title: "React base app",
  description: "Description base app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
