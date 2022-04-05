import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import DoctorList from "../../screens/doctorList/DoctorList";
import Appointment from "../../screens/appointment/Appointment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { fetchAppointmentsList } from '../../util/fetch';
import TabContainer from "../../common/tabContainer/TabContainer";


//creating Home constant
const Home = (props) => {
  //Creating variables to store states
  const [value, setValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("access-token") === null ? false : true);
  const [appointmentList, setAppointmentList] = useState(null);

  // UseEffect funtion to update Appointment List in Appointment Tab when user is logged in
  useEffect(() => {
    if (loggedIn) {
      let data;
      async function fetchData() {
        // Getting appointments list for user
        data = await fetchAppointmentsList();
        return data;
      }

      fetchData().then((data) => {
        setAppointmentList(data)
      })
        .catch((e) => {
          console.log("Backend not running")
        })

    }
  }, [loggedIn])

  // Logged In state updater
  const loggedInStateChange = async () => {
    setLoggedIn(
      sessionStorage.getItem("access-token") === null ||
        sessionStorage.getItem("access-token") === undefined
        ? false
        : true);
  }

  // Doctor List and Appointment tab handler
  const tabChangeHandler = async (event, value) => {
    setValue(value);
    try {
      if (loggedIn) {
        // Getting appointments list for user
        const data = await fetchAppointmentsList();
        setAppointmentList(data);
      }
    } catch (error) {
      console.log("Backend not running")
    }
  }

  return (
    <div>
      <Header
        baseUrl={props.baseUrl}
        stateChange={loggedInStateChange}
        homeLoggedin={setLoggedIn}
      />
      <Tabs
        className="tabs"
        value={value}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        onChange={tabChangeHandler}
      >
        <Tab label="DOCTORS" />
        <Tab label="APPOINTMENT" />
      </Tabs>

      {value === 0 && <DoctorList />}
      {value === 1 && loggedIn === false && (
        <TabContainer>
          <h4>Login to see appointments</h4>
        </TabContainer>
      )}

      {value === 1 && loggedIn === true && (
        <Appointment list={appointmentList} />
      )}

    </div>
  );
}


export default Home;
