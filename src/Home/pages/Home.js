import "../../css/home.css";
import logo from "../../img/icons/logo.PNG";
import wallet from "../../img/icons/mywallet.png";
import profile1 from "../../img/icons/profile.png";
import profile2 from "../../img/icons/colorprofile.png";
import iconAyudar from "../../img/icons/HandHeart2.png";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ListaProductos from "../components/ListaProductos";
import Menu from "../components/Menu";
import Busqueda from "../components/Busqueda";
import LoginForm from "../../Login/components/LoginForm";
import EditProfile from "../../Home/components/EditProfile";
import WalletResume from "../../Wallet/pages/WalletResume";

const Home = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [, setSearchTerm] = useState("");

  // Función para cargar todos los productos iniciales
  useEffect(() => {
    async function fetchData() {
      try {
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(`${apiUrl}/products/list`, config);
        const data = await response.json();
        if (data) {
          setProductos(data);
          setFilteredProductos(data); // Inicialmente mostrar todos los productos
        }
      } catch (error) {
        console.error(`Error fetching data: ${apiUrl} :`, error);
      }
    }
    fetchData();
  }, [apiUrl]);

  // Función para manejar cambios en el término de búsqueda
  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    // Si el término de búsqueda está vacío, no hacer la solicitud HTTP
    if (searchTerm.trim() === "") {
      setFilteredProductos(productos);
      return;
    }
    try {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${apiUrl}/products/search/${searchTerm}`,
        config
      );
      const data = await response.json();
      if (data) {
        setFilteredProductos(data); // Actualizar productos filtrados según la búsqueda
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  // Función para manejar filtro por categoria
  const handleCategorySearch = async (setSearchcategory) => {
    try {
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${apiUrl}/products/searchCategory/${setSearchcategory}`,
        config
      );
      const data = await response.json();
      if (data) {
        setFilteredProductos(data); // Actualizar productos filtrados según la búsqueda
      }
    } catch (error) {
      console.error("Error searching category products:", error);
    }
  };

  // funciones visibilidad del login
  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  // funciones visibilidad del la billetera
  const [showWallet, setShowWallet] = useState(false);
  const handleShowWallet = () => {
    setShowWallet(true);
  };
  const handleCloseWallet = () => {
    setShowWallet(false);
  };

  // funciones visibilidad del la Perfil
  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => {
    setShowProfile(true);
  };
  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const getProfileImage = (userName) => {
    if (userName) {
      return profile2;
    } else {
      return profile1;
    }
  };
  const userName = localStorage.getItem("user-name")?.replace(/^"|"$/g, "");
  const profileImage = getProfileImage(userName);

  const handleWallet = () => {
    if (userName) {
      handleShowWallet();
    } else {
      handleShowLogin();
    }
  };

  const handleProfile = () => {
    if (userName) {
      handleShowProfile();
    } else {
      handleShowLogin();
    }
  };

  // Obtención nombre usuario

  return (
    <div className="home-container">
      <div className="header-container">
        <img className="logo-nana" src={logo} alt="Logo" />
        <div className="icon-buttons">
          <button className="icon-wallet" onClick={handleWallet}>
            <img className="logo-wallet" src={wallet} alt="Wallet" />
            <p>Mi billetera</p>
          </button>
          <button className="icon-profile" onClick={handleProfile}>
            {userName && (
              <img className="logo-wallet" src={profileImage} alt="Perfil" />
            )}
            {userName && (
              <div className="text-container">
                <p>
                  Hola <strong>{userName}</strong>
                </p>
                <p>Bienvenido</p>
              </div>
            )}
            {!userName && (
              <div>
                <img className="logo-wallet" src={profileImage} alt="Perfil" />
                <div className="text-container">
                  <p>Iniciar Sesión</p>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="content-container">
        <p className="h5 mb-3 fw-normal">Transformamos la forma de ayudar</p>
        <div className="busqueda-container-wrapper">
          <Busqueda onSearch={handleSearch} />
        </div>
        <div className="menu-container-wrapper d-lg-flex justify-content-center">
          <Menu onSearch={handleCategorySearch} />
        </div>
        <div className="d-lg-flex justify-content-center">
          <ListaProductos
            productos={filteredProductos}
            setProductos={setProductos}
          />
        </div>
      </div>
      <p className="mt-5 mb-3 text-muted">&copy; NanaPass-2024</p>

      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton></Modal.Header>
        <h1 className="text-center">Inicia sesión</h1>
        <h4 className="text-center">Iniciar sesión para continuar</h4>
        <Modal.Body>
          <LoginForm handleClose={handleCloseLogin} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showWallet}
        onHide={handleCloseWallet}
        dialogClassName="my-custom-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <WalletResume handleClose={handleCloseWallet} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showWallet}
        onHide={handleCloseWallet}
        dialogClassName="my-custom-modal-msg"
      >
        <Modal.Body>
          <div className="text-rw1">
            Estamos trabajando para poner en marcha tu billetera
          </div>
          <div className="text-rw2">
            Mientras tanto continua ayudando a más personas
          </div>
          <br />
          <Button className="btn-ayudar" onClick={handleCloseWallet}>
            <img src={iconAyudar} alt="Ayudar Icon" className="icon-ayudar" />
            Ayudar
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        show={showProfile}
        onHide={handleCloseProfile}
        dialogClassName="my-custom-modal-profile"
        centered
      >
        <Modal.Body>
          <EditProfile handleCloseProfile={handleCloseProfile} />
        </Modal.Body>
      </Modal>

      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton></Modal.Header>
        <h1 className="text-center">Inicia sesión</h1>
        <h4 className="text-center">Iniciar sesión para continuar</h4>
        <Modal.Body>
          <LoginForm handleClose={handleCloseLogin} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
