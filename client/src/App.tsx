import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Container />
      <Footer />
    </div>
  );
};

export default App;
