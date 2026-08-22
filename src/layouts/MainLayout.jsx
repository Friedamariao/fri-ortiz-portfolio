import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SkipLink from "../components/ui/SkipLink";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SkipLink />
      <Header />

      <main id="contenido-principal" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
