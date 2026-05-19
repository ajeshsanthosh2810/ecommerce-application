export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-color)", padding: "3rem 0", marginTop: "auto" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", background: "linear-gradient(to right, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          LuxeShop
        </div>
        <p style={{ textAlign: "center", maxWidth: "600px" }}>
          Premium e-commerce experience built with Next.js and Spring Boot.
          Showcasing modern web development practices and rich aesthetics.
        </p>
        <div style={{ fontSize: "0.875rem", color: "var(--border-color)", marginTop: "1rem" }}>
          &copy; {new Date().getFullYear()} LuxeShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
