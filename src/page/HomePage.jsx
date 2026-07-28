import { lazy, Suspense } from "react";
import DefaultLayout from "../layouts";
import Hero from "../components/hero";
import Ticker from "../components/ticker";

const Services = lazy(() => import("../components/services"));
const WhyUs = lazy(() => import("../components/whyus"));
const Packages = lazy(() => import("../components/packages"));
const Testimonials = lazy(() => import("../components/testimonials"));
const Contact = lazy(() => import("../components/contact"));

const Divider = () => (
  <div className="px-6 md:px-16">
    <div className="border-t border-navy-line opacity-60" />
  </div>
);

const HomePage = ({ theme, toggleTheme }) => {
  return (
    <DefaultLayout theme={theme} toggleTheme={toggleTheme}>
      <Hero />
      <Divider />
      <Ticker />
      <Suspense fallback={null}>
        <Divider />
        <Services />
        <Divider />
        <WhyUs />
        <Divider />
        <Packages />
        <Divider />
        <Testimonials />
        <Divider />
        <Contact />
      </Suspense>
    </DefaultLayout>
  );
};

export default HomePage;
