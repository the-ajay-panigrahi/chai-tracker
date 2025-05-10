import ChaiForm from "./components/ChaiForm";
import Hero from "./components/Hero";
import History from "./components/History";
import Layout from "./components/Layout";
import Statistics from "./components/Statistics";
import { useAuth } from "./context/AuthContext";

function App() {
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuthenticated = globalUser;
  const isData = globalData && !!Object.keys(globalData || {}).length;

  const authenticatedContent = (
    <>
      <Statistics />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <ChaiForm isAuthenticated={isAuthenticated} />
      {isAuthenticated && isLoading && <p>Loading chai data...</p>}
      {isAuthenticated && isData && authenticatedContent}
    </Layout>
  );
}

export default App;
