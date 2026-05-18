export const metadata = {
  title: "Ecommerce App",
  description: "Spring Boot Ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <body>

        {children}

      </body>

    </html>
  );

}