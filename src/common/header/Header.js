import { React, useState } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.jpeg";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import { fetchUsedInHeaderForLogout } from '../../util/fetch'

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

// const TabContainer = function (props) {
//   return (
//     <Typography component="span" style={{ padding: 0, textAlign: "center" }}>
//       {props.children}
//     </Typography>
//   );
// };

// const validateUsername = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

// const validatePhoneNumber = (phone) => {
//   return String(phone).match(
//     /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
//   );
// };

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

//creating Header component
const Header = (props) => {
  const [value, setValue] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [isSuccessLogin, setisSuccessLogin] = useState("dispNone");
  // const [isSuccessRegister, setisSuccessRegister] = useState("dispNone");
  // const [isFailedLogin, setisFailedLogin] = useState("dispNone");
  // const [isFailedRegister, setisFailedRegister] = useState("dispNone");
  // const [usernameRequired, setusernameRequired] = useState("dispNone");
  // const [usernameValid, setusernameValid] = useState("dispNone");
  // const [username, setusername] = useState("");
  // const [loginPasswordRequired, setloginPasswordRequired] = useState("dispNone");
  // const [loginPassword, setloginPassword] = useState("");
  // const [firstnameRequired, setfirstnameRequired] = useState("dispNone");
  // const [firstname, setfirstname] = useState("");
  // const [lastnameRequired, setlastnameRequired] = useState("dispNone");
  // const [lastname, setlastname] = useState("");
  // const [emailRequired, setemailRequired] = useState("dispNone");
  // const [emailValid, setemailValid] = useState("dispNone");
  // const [email, setemail] = useState("");
  // const [registerPasswordRequired, setregisterPasswordRequired] = useState("dispNone");
  // const [registerPassword, setregisterPassword] = useState("");
  // const [contactRequired, setcontactRequired] = useState("dispNone");
  // const [contactValid, setcontactValid] = useState("dispNone");
  // const [contact, setcontact] = useState("");
  // const [registrationSuccess, setregistrationSuccess] = useState(false);
  const [loggedIn, setloggedIn] = useState(localStorage.getItem("access-token") === null ? false : true);


  //creating various handlers

  const openModalHandler = () => {
    setModalIsOpen(true);
    setValue(0);
    // setisSuccessLogin("dispNone");
    // setisSuccessRegister("dispNone");
    // setisFailedLogin("dispNone");
    // setisFailedRegister("dispNone");
    // setusernameRequired("dispNone");
    // setusernameValid("dispNone");
    // setusername("");
    // setloginPasswordRequired("dispNone");
    // setloginPassword("");
    // setfirstnameRequired("dispNone");
    // setfirstname("");
    // setlastnameRequired("dispNone");
    // setlastname("");
    // setemailRequired("dispNone");
    // setemailValid("dispNone");
    // setemail("");
    // setregisterPasswordRequired("dispNone");
    // setregisterPassword("");
    // setcontactRequired("dispNone");
    // setcontactValid("dispNone");
    // setcontact("");
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
    setloggedIn(localStorage.getItem("access-token") === null ||
      localStorage.getItem("access-token") === undefined
      ? false
      : true);
    props.stateChange();
  }

  const tabChangeHandler = (e, val) => {
    setValue(val);
    // setisSuccessLogin("dispNone");
    // setisSuccessRegister("dispNone");
    // setisFailedLogin("dispNone");
    // setisFailedRegister("dispNone");
  }

  const logoutHandler = (e) => {

    fetchUsedInHeaderForLogout();

    localStorage.removeItem("uuid");
    localStorage.removeItem("access-token");

    setloggedIn(false);

    // props.stateChange();
  };

    return (
      <div>
        <header className="app-header">
          <img src={logo} className="app-logo" alt="BookAppointment App Logo" />
          <p className="app-label">Doctor Finder</p>
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
          <div className="modal-head">Authentication</div>
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
        </Modal>
      </div>
    );
  }


export default Header;
