import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found — Cloud on Fire"
        description="The page you are looking for does not exist."
        canonical={location.pathname}
        noindex
      />
      <Layout>
        <section className="section-padding">
          <div className="container-wide flex flex-col items-center justify-center py-20 text-center">
            <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
            <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default NotFound;
