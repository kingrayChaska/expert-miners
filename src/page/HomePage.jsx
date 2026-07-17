import DefaultLayout from "../layouts";
import Hero from "../components/hero";
import Ticker from "../components/ticker";
import Services from "../components/services";
import WhyUs from "../components/whyus";
import Packages from "../components/packages";
import Testimonials from "../components/testimonials";
import Contact from "../components/contact";

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
    </DefaultLayout>
  );
};

export default HomePage;
