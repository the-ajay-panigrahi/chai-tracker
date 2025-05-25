import { useContext } from "react";
import ChaiForm from "./components/ChaiForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import History from "./components/History";
import Statistics from "./components/Statistics";
import { AuthContext } from "./utils/AuthContext";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Hero />
      <ChaiForm />
      {isAuthenticated && (
        <>
          <Statistics />
          <History />
        </>
      )}
      <Footer />
    </>
  );
};

export default App;
