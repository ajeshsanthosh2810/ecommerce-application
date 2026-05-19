export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-color)", padding: "4rem 0", marginTop: "auto", background: "var(--background)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          LuxeShop
        </div>
        <p style={{ textAlign: "center", maxWidth: "600px", fontFamily: "var(--font-mono)", textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em" }}>
          Sovereign E-Commerce Experience.
          Built with Spring Boot & Next.js.
        </p>
        <div style={{ fontSize: "0.75rem", color: "var(--border-color)", marginTop: "2rem", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
          &copy; {new Date().getFullYear()} LuxeShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
