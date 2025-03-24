import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <h1>Accueil</h1>
        <p>Bienvenue sur notre application.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
