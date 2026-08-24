import Hero from "../components/home/Hero";
import PortfolioIntroduction from "../components/home/PortfolioIntroduction";
import StudentProfile from "../components/home/StudentProfile";
import CourseFocus from "../components/home/CourseFocus";
// import PortfolioIndex from "../components/home/PortfolioIndex";
import TechnicalInformation from "../components/home/TechnicalInformation";
import ContactForm from "../components/contact/ContactForm";

function Home() {
  return (
    <>
      <Hero />
      <PortfolioIntroduction />
      <StudentProfile />
      <CourseFocus />
      {/* <PortfolioIndex /> */}
      <TechnicalInformation />
      <ContactForm />
    </>
  );
}

export default Home;
