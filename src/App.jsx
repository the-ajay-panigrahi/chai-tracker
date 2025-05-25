import { useContext } from "react";
import ChaiForm from "./components/ChaiForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import History from "./components/History";
import Statistics from "./components/Statistics";
import { AuthContext } from "./utils/AuthContext";

const App = () => {
  const { isAuthenticated, globalData } = useContext(AuthContext);
  const dataExists =
    isAuthenticated && globalData && Object.keys(globalData).length > 0;
  return (
    <>
      <Header />
      <Hero />
      <ChaiForm />
      {dataExists && (
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
