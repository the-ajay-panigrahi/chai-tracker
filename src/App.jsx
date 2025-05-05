import ChaiForm from "./components/ChaiForm";
import Hero from "./components/Hero";
import History from "./components/History";
import Layout from "./components/Layout";
import Statistics from "./components/Statistics";

function App() {
  const isAuthenticated = false;

  const authenticatedContent = (
    <>
      <Statistics />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <ChaiForm />
      {isAuthenticated && authenticatedContent}
    </Layout>
  );
}

export default App;
