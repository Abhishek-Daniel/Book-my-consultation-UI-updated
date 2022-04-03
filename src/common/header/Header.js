import { React, useState } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.jpeg";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import { fetchUsedInHeaderForLogout } from '../../util/fetch';

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0%",
    transform: "translate(-50%, -50%)",
  },
};

const Header = (props) => {
  const [value, setValue] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedIn, setloggedIn] = useState(sessionStorage.getItem("access-token") === null ? false : true);


  //creating various handlers

  const openModalHandler = () => {
    setModalIsOpen(true);
    setValue(0);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
    setloggedIn(sessionStorage.getItem("access-token") === null ||
      sessionStorage.getItem("access-token") === undefined
      ? false
      : true);
    props.stateChange();
  }

  const tabChangeHandler = (e, val) => {
    setValue(val);
  }

  const logoutHandler = (e) => {

    fetchUsedInHeaderForLogout();

    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    setloggedIn(false);
  };

    return (
      <div>
        <header className="header">
          <img src={logo} className="logo" alt="BookAppointment App Logo" />
          <p className="label">Doctor Finder</p>
          {!loggedIn ? (
            <div className="login-button">
              <Button
                variant="contained"
                color="primary"
                onClick={openModalHandler}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="login-button">
              <Button
                variant="contained"
                color="secondary"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
        </header>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          contentLabel="Login"
          onRequestClose={closeModalHandler}
          style={customStyles}
        >
          <Card style={{ height: "100%" }}>
            <CardHeader
              className="card-header"
              title="Authentication"
            ></CardHeader>
            <CardContent style={{ height: "100%" }}>
          <Tabs
            className="tabs"
            value={value}
            onChange={tabChangeHandler}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {value === 0 && (
            <Login
              baseUrl={props.baseUrl}
              closeModal={closeModalHandler}
            />
          )}

          {value === 1 && <Register baseUrl={props.baseUrl} />}
          </CardContent>
          </Card>
        </Modal>
      </div>
    );
  }


export default Header;