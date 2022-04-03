import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { fetchUsedInLogin } from '../../util/fetch'
import TabContainer from "../../common/tabContainer/TabContainer";

const validateUsername = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Login = (props) => {


  const [isSuccessLogin, setisSuccessLogin] = useState("dispNone");
  const [isFailedLogin, setisFailedLogin] = useState("dispNone");
  const [usernameRequired, setusernameRequired] = useState("dispNone");
  const [usernameValid, setusernameValid] = useState("dispNone");
  const [username, setusername] = useState("");
  const [loginPasswordRequired, setloginPasswordRequired] = useState("dispNone");
  const [loginPassword, setloginPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(sessionStorage.getItem("access-token") == null ||
    sessionStorage.getItem("access-token") === undefined ? false : true);



  const loginClickHandler = async () => {
    username === ""
      ? setusernameRequired("dispBlock")
      : setusernameRequired("dispNone")
    loginPassword === ""
      ? setloginPasswordRequired("dispBlock")
      : setloginPasswordRequired("dispNone")
    username !== "" && !validateUsername(username)
      ? setusernameValid("dispBlock")
      : setusernameValid("dispNone")

    if (
      username !== "" &&
      validateUsername(username) &&
      loginPassword !== ""
    ) {

      const data = await fetchUsedInLogin(username, loginPassword);
      if (data[1] === 200) {

        sessionStorage.setItem("uuid", data[0].id);
        sessionStorage.setItem("access-token", data[0].accessToken);


        setloggedIn(sessionStorage.getItem("access-token") === null ||
          sessionStorage.getItem("access-token") === undefined
          ? false
          : true);

        setisSuccessLogin("dispBlock");
        setisFailedLogin("dispNone");

        setTimeout(() => {
          props.closeModal();
        }, 1000);
      } else {

        setloggedIn(
          sessionStorage.getItem("access-token") === null ||
            sessionStorage.getItem("access-token") === undefined
            ? false
            : true);
        setisSuccessLogin("dispNone");
        setisFailedLogin("dispBlock");

      }



    }
  };

  const inputUsernameChangeHandler = (e) => {

    setusername(e.target.value);
    setusernameRequired("dispNone");
    setusernameValid("dispNone");
  };

  const inputLoginPasswordChangeHandler = (e) => {

    setloginPassword(e.target.value);
    setloginPasswordRequired("dispNone");

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
          <div className="empty">Please fill out this field.</div>
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
          <div className="empty">Please fill out this field.</div>
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
