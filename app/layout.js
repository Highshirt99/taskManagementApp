import "./globals.css";
import { Providers } from "@/utils/Providers ";


export const metadata = {
  title: "Kanban Task Management App",
  description: "Task management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers >
          {children}</Providers>
      </body>
    </html>
  );
}
