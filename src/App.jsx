import ChaiForm from "./components/ChaiForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import History from "./components/History";
import Statistics from "./components/Statistics";

const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <ChaiForm />
      <Statistics/>
      <History/>
      <Footer />
    </>
  );
};

export default App;
