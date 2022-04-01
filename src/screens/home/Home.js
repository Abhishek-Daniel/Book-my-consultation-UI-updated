import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import DoctorList from "../../screens/doctorList/DoctorList";
import Appointment from "../../screens/appointment/Appointment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import "bootstrap/dist/css/bootstrap.min.css";
import {fetchAppointmentsForAppointmentTab} from '../../util/fetch'

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

//creating Home component
const Home =(props)=> {
  const [value, setValue] = useState(0);
  const [loggedIn, setloggedIn] = useState(localStorage.getItem("access-token") === null ? false : true);
  const [appointmentList,setappointmentList] = useState(null);

  useEffect(async()=>{
    if (loggedIn) {
      const data = await fetchAppointmentsForAppointmentTab();
       setappointmentList( data);
    }
  },[loggedIn])

  const loggedInStateChange = async () => {
        setloggedIn(
          localStorage.getItem("access-token") === null ||
            localStorage.getItem("access-token") === undefined
            ? false
            : true);
      
        if (loggedIn) {
          console.log("In logged in state change")
          const data = await fetchAppointmentsForAppointmentTab();
          console.log(props)
          console.log("In logged in state change")
          setappointmentList( data);
        }
      
    
  };

  const tabChangeHandler = (event, value) => {
    setValue(value);
  }

  const tab1handle = () => {
    console.log(appointmentList);
  }


    return (
      <div>
        <Header
          baseUrl={props.baseUrl}
          stateChange={loggedInStateChange}
          homeLoggedin={setloggedIn}
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

        {value === 1 && loggedIn === true &&(
          tab1handle()
        )}

      </div>
    );
  }


export default Home;
