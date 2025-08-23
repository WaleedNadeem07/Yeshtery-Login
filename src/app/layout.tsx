import "./globals.css";
import ReduxProvider from "./ReduxProvider";

export const metadata = {
  title: "Yeshtery Login",
  description: "Login and dashboard demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
