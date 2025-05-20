import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Truck Mate",
  description: "Truck Mate 2.0 - Manage your VTC, events, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}