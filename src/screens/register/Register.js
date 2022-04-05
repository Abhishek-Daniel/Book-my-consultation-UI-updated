import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { register } from '../../util/fetch'
import TabContainer from "../../common/tabContainer/TabContainer";

// Function to validate Username
const validateUsername = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Function to validate Phone Number
const validatePhoneNumber = (phone) => {
  return String(phone).match(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
};


const Register = () => {
  //Creating variables to store states
  const [isSuccessRegister, setIsSuccessRegister] = useState("dispNone");
  const [isFailedRegister, setIsFailedRegister] = useState("dispNone");
  const [firstnameRequired, setFirstnameRequired] = useState("dispNone");
  const [firstname, setFirstname] = useState("");
  const [lastnameRequired, setLastnameRequired] = useState("dispNone");
  const [lastname, setLastname] = useState("");
  const [emailRequired, setEmailRequired] = useState("dispNone");
  const [emailValid, setEmailValid] = useState("dispNone");
  const [email, setEmail] = useState("");
  const [registerPasswordRequired, setRegisterPasswordRequired] = useState("dispNone");
  const [registerPassword, setRegisterPassword] = useState("");
  const [contactRequired, setContactRequired] = useState("dispNone");
  const [contactValid, setContactValid] = useState("dispNone");
  const [contact, setContact] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  // Register Button Click Handler
  const registerClickHandler = async () => {
    firstname === ""
      ? setFirstnameRequired("dispBlock")
      : setFirstnameRequired("dispNone")

    lastname === ""
      ? setLastnameRequired("dispBlock")
      : setLastnameRequired("dispNone")

    email === ""
      ? setEmailRequired("dispBlock")
      : setEmailRequired("dispNone")

    email !== "" && !validateUsername(email)
      ? setEmailValid("dispBlock")
      : setEmailValid("dispNone")

    registerPassword === ""
      ? setRegisterPasswordRequired("dispBlock")
      : setRegisterPasswordRequired("dispNone")

    contact === ""
      ? setContactRequired("dispBlock")
      : setContactRequired("dispNone")

    contact !== "" && !validatePhoneNumber(contact)
      ? setContactValid("dispBlock")
      : setContactValid("dispNone")

    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      validateUsername(email) &&
      registerPassword !== "" &&
      contact !== "" &&
      validatePhoneNumber(contact)
    ) {
      let registrationData = {
        emailId: email,
        firstName: firstname,
        lastName: lastname,
        mobile: contact,
        password: registerPassword,
      };

      try {
        // Sending Registration Data to be recorded in database
        const result = await register(registrationData);

        if (result[0] === 200) {

          setRegistrationSuccess(true);
          setIsSuccessRegister("dispBlock");
          setIsFailedRegister("dispNone");

        } else {

          setRegistrationSuccess(false);
          setIsSuccessRegister("dispNone");
          setIsFailedRegister("dispBlock");

        }

      } catch (err) {
        console.log("Backend Not Running")
      }

    }
  };

  // First Name state updater
  const inputFirstNameChangeHandler = (e) => {
    setFirstname(e.target.value);
    setFirstnameRequired("dispNone");
  };

  // Last Name state updater
  const inputLastNameChangeHandler = (e) => {
    setLastname(e.target.value);
    setLastnameRequired("dispNone");
  };

  // Email state updater
  const inputEmailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailRequired("dispNone");
    setEmailValid("dispNone");
  };

  // Password state updater
  const inputRegisterPasswordChangeHandler = (e) => {
    setRegisterPassword(e.target.value);
    setRegisterPasswordRequired("dispNone");
  };

  // Contact state updater
  const inputContactChangeHandler = (e) => {

    setContact(e.target.value);
    setContactRequired("dispNone");
    setContactValid("dispNone");

  };

  return (
    <TabContainer>
      <FormControl required>
        <InputLabel htmlFor="firstname">First Name</InputLabel>
        <Input
          id="firstname"
          type="text"
          firstname={firstname}
          onChange={inputFirstNameChangeHandler}
        />
        <div className={firstnameRequired}>
          <div className="empty-field">Please fill out this field</div>
        </div>
      </FormControl>
      <br />
      <FormControl required>
        <InputLabel htmlFor="lastname">Last Name</InputLabel>
        <Input
          id="lastname"
          type="text"
          lastname={lastname}
          onChange={inputLastNameChangeHandler}
        />
        <div className={lastnameRequired}>
          <div className="empty-field">Please fill out this field</div>
        </div>
      </FormControl>
      <br />
      <FormControl required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          type="text"
          email={email}
          onChange={inputEmailChangeHandler}
        />
        <div className={emailRequired}>
          <div className="empty-field">Please fill out this field</div>
        </div>
        <FormHelperText className={emailValid}>
          <span className="red">Enter valid Email</span>
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl required>
        <InputLabel htmlFor="registerPassword">Password</InputLabel>
        <Input
          id="registerPassword"
          type="password"
          registerpassword={registerPassword}
          onChange={inputRegisterPasswordChangeHandler}
        />
        <div className={registerPasswordRequired}>
          <div className="empty-field">Please fill out this field</div>
        </div>
      </FormControl>
      <br />
      <FormControl required>
        <InputLabel htmlFor="contact">Contact No.</InputLabel>
        <Input
          id="contact"
          type="text"
          contact={contact}
          onChange={inputContactChangeHandler}
        />
        <div className={contactRequired}>
          <div className="empty-field">Please fill out this field</div>
        </div>
        <FormHelperText className={contactValid}>
          <span className="red">Enter valid mobile number</span>
        </FormHelperText>
      </FormControl>
      <br />
      {registrationSuccess === true && (
        <FormControl>
          <span className={isSuccessRegister}>
            Registration Successful. Please Login!
          </span>
        </FormControl>
      )}

      {registrationSuccess === false && (
        <FormControl>
          <span className={isFailedRegister}>Registration Failed !</span>
          <span className={isFailedRegister}>User with this email already exists !</span>
        </FormControl>
      )}

      <br />
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={registerClickHandler}
      >
        REGISTER
      </Button>
    </TabContainer>
  );
}


export default Register;
