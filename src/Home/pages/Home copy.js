import Header from "../../Shared/pages/Header";
import SearchBar from "./SearchBar";
import logo from "../../logo.PNG";

const Home = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form>
        <Header />
        <img className="mb-4" src={logo} alt="" width="100" height="100" />
        <p className="h4 mb-3 fw-normal">Transformamos la forma de ayudar</p>
        <SearchBar />
      </form>
    </div>
  );
};

export default Home;
