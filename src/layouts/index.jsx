import Header from "../components/header";
import Footer from "../components/footer";

const DefaultLayout = ({ children, theme, toggleTheme }) => {
  return (
    <div className="bg-navy-deep min-h-screen overflow-hidden transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
