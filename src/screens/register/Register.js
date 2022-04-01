import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";
import { fetchUsedInRegister } from '../../util/fetch'
import TabContainer from "../../common/tabContainer/TabContainer";


const validateUsername = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhoneNumber = (phone) => {
  return String(phone).match(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
};


const Register = () => {
  const [isSuccessRegister, setisSuccessRegister] = useState("dispNone");
  const [isFailedRegister, setisFailedRegister] = useState("dispNone");
  const [firstnameRequired, setfirstnameRequired] = useState("dispNone");
  const [firstname, setfirstname] = useState("");
  const [lastnameRequired, setlastnameRequired] = useState("dispNone");
  const [lastname, setlastname] = useState("");
  const [emailRequired, setemailRequired] = useState("dispNone");
  const [emailValid, setemailValid] = useState("dispNone");
  const [email, setemail] = useState("");
  const [registerPasswordRequired, setregisterPasswordRequired] = useState("dispNone");
  const [registerPassword, setregisterPassword] = useState("");
  const [contactRequired, setcontactRequired] = useState("dispNone");
  const [contactValid, setcontactValid] = useState("dispNone");
  const [contact, setcontact] = useState("");
  const [registrationSuccess, setregistrationSuccess] = useState(false);

  const registerClickHandler = async () => {
    firstname === ""
      ? setfirstnameRequired("dispBlock")
      : setfirstnameRequired("dispNone")

    lastname === ""
      ? setlastnameRequired("dispBlock")
      : setlastnameRequired("dispNone")

    email === ""
      ? setemailRequired("dispBlock")
      : setemailRequired("dispNone")

    email !== "" && !validateUsername(email)
      ? setemailValid("dispBlock")
      : setemailValid("dispNone")

    registerPassword === ""
      ? setregisterPasswordRequired("dispBlock")
      : setregisterPasswordRequired("dispNone")

    contact === ""
      ? setcontactRequired("dispBlock")
      : setcontactRequired("dispNone")

    contact !== "" && !validatePhoneNumber(contact)
      ? setcontactValid("dispBlock")
      : setcontactValid("dispNone")

    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      validateUsername(email) &&
      registerPassword !== "" &&
      contact !== "" &&
      validatePhoneNumber(contact)
    ) {
      let dataSignup = {
        emailId: email,
        firstName: firstname,
        lastName: lastname,
        mobile: contact,
        password: registerPassword,
      };

      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(dataSignup),
      // };
      // fetch("http://localhost:8080/users/register", requestOptions)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data !== null) {
      //       setState({
      //         registrationSuccess: true,
      //         isSuccessRegister: "dispBlock",
      //         isFailedRegister: "dispNone",
      //       });
      //     } else {
      //       setState({
      //         registrationSuccess: false,
      //         isSuccessRegister: "dispNone",
      //         isFailedRegister: "dispBlock",
      //       });
      //     }
      //   });

      // New Fetch Method


      const result = await fetchUsedInRegister(dataSignup);

      if (result[0] === 200) {

        setregistrationSuccess(true);
        setisSuccessRegister("dispBlock");
        setisFailedRegister("dispNone");

      } else {

        setregistrationSuccess(false);
        setisSuccessRegister("dispNone");
        setisFailedRegister("dispBlock");

      }

    }
  };

  const inputFirstNameChangeHandler = (e) => {
    setfirstname( e.target.value);
      setfirstnameRequired("dispNone");
  };

  const inputLastNameChangeHandler = (e) => {
    setlastname( e.target.value);
      setlastnameRequired( "dispNone");
  };

  const inputEmailChangeHandler = (e) => {

      setemail( e.target.value);
      setemailRequired( "dispNone");
      setemailValid( "dispNone");
    
  };

  const inputRegisterPasswordChangeHandler = (e) => {
    
      setregisterPassword( e.target.value);
      setregisterPasswordRequired( "dispNone");

  };

  const inputContactChangeHandler = (e) => {
    
      setcontact( e.target.value);
      setcontactRequired( "dispNone");
      setcontactValid( "dispNone");
    
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
        <FormHelperText className={firstnameRequired}>
          <div className="empty">Please fill out this field</div>
        </FormHelperText>
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
        <FormHelperText className={lastnameRequired}>
          <div className="empty">Please fill out this field</div>
        </FormHelperText>
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
        <FormHelperText className={emailRequired}>
          <div className="empty">Please fill out this field</div>
        </FormHelperText>
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
        <FormHelperText className={registerPasswordRequired}>
          <div className="empty">Please fill out this field</div>
        </FormHelperText>
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
        <FormHelperText className={contactRequired}>
          <div className="empty">Please fill out this field</div>
        </FormHelperText>
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
          <span className={isFailedRegister}>
            Registration Failed!
          </span>
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
