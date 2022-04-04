import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { login } from '../../util/fetch'
import TabContainer from "../../common/tabContainer/TabContainer";

const validateUsername = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Login = (props) => {


  const [isSuccessLogin, setIsSuccessLogin] = useState("dispNone");
  const [isFailedLogin, setIsFailedLogin] = useState("dispNone");
  const [usernameRequired, setUsernameRequired] = useState("dispNone");
  const [usernameValid, setUsernameValid] = useState("dispNone");
  const [username, setUsername] = useState("");
  const [loginPasswordRequired, setLoginPasswordRequired] = useState("dispNone");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("access-token") == null ||
    sessionStorage.getItem("access-token") === undefined ? false : true);



  const loginClickHandler = async () => {
    username === ""
      ? setUsernameRequired("dispBlock")
      : setUsernameRequired("dispNone")
    loginPassword === ""
      ? setLoginPasswordRequired("dispBlock")
      : setLoginPasswordRequired("dispNone")
    username !== "" && !validateUsername(username)
      ? setUsernameValid("dispBlock")
      : setUsernameValid("dispNone")

    if (
      username !== "" &&
      validateUsername(username) &&
      loginPassword !== ""
    ) {

      try{

      const data = await login(username, loginPassword);
      if (data[1] === 200) {

        sessionStorage.setItem("uuid", data[0].id);
        sessionStorage.setItem("access-token", data[0].accessToken);


        setLoggedIn(sessionStorage.getItem("access-token") === null ||
          sessionStorage.getItem("access-token") === undefined
          ? false
          : true);

        setIsSuccessLogin("dispBlock");
        setIsFailedLogin("dispNone");

        setTimeout(() => {
          props.closeModal();
        }, 1000);
      } else {

        setLoggedIn(
          sessionStorage.getItem("access-token") === null ||
            sessionStorage.getItem("access-token") === undefined
            ? false
            : true);
        setIsSuccessLogin("dispNone");
        setIsFailedLogin("dispBlock");

      }



    } catch (err){
      console.log("Backend Not Running")
    }
  }
  };

  const inputUsernameChangeHandler = (e) => {

    setUsername(e.target.value);
    setUsernameRequired("dispNone");
    setUsernameValid("dispNone");
  };

  const inputLoginPasswordChangeHandler = (e) => {

    setLoginPassword(e.target.value);
    setLoginPasswordRequired("dispNone");

  };

  return (
    <TabContainer>
      <FormControl required>
        <InputLabel htmlFor="username">Email</InputLabel>
        <Input
          id="username"
          type="email"
          username={username}
          onChange={inputUsernameChangeHandler}
        />
        <div className={usernameRequired}>
          <div className="empty-field">Please fill out this field.</div>
        </div>
        <FormHelperText className={usernameValid}>
          <span className="red">Enter valid Email</span>
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl required>
        <InputLabel htmlFor="loginPassword">Password</InputLabel>
        <Input
          id="loginPassword"
          type="password"
          loginpassword={loginPassword}
          onChange={inputLoginPasswordChangeHandler}
        />
        <div className={loginPasswordRequired}>
          <div className="empty-field">Please fill out this field.</div>
        </div>
      </FormControl>
      <br />
      {loggedIn === true && (
        <FormControl>
          <span className={isSuccessLogin}>Login Successful!</span>
        </FormControl>
      )}
      {loggedIn === false && (
        <FormControl>
          <span className={isFailedLogin}>Login Failed !</span>
          <span className={isFailedLogin}>Please enter correct username and password !</span>
        </FormControl>
      )}
      <br />

      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={loginClickHandler}
      >
        LOGIN
      </Button>
    </TabContainer>
  );
}

export default Login;
