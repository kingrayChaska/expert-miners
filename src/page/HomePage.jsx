import DefaultLayout from "../layouts";
import Hero from "../components/hero";
import Ticker from "../components/ticker";
import Services from "../components/services";
import WhyUs from "../components/whyus";
import Packages from "../components/packages";
import Testimonials from "../components/testimonials";
import Contact from "../components/contact";

const HomePage = ({ theme, toggleTheme }) => {
  return (
    <DefaultLayout theme={theme} toggleTheme={toggleTheme}>
      <Hero />
      <Ticker />
      <Services />
      <WhyUs />
      <Packages />
      <Testimonials />
      <Contact />
    </DefaultLayout>
  );
};

export default HomePage;
