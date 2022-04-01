import React, { Component, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Stack from "@mui/material/Stack";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import RateAppointment from "../appointment/RateAppointment";
import TabContainer from '../../common/tabContainer/TabContainer'
import Paper from "@mui/material/Paper";


const Appointment = (props) => {

  const [rateAppointmentModalIsOpen, setrateAppointmentModalIsOpen] = useState(false);
  const [doctorName, setdoctorName] = useState("");
  const [appointmentDetails, setappointmentDetails] = useState(null);

  const openRateAppointmentModalHandler = (data) => {
    setrateAppointmentModalIsOpen(true);
    setdoctorName(data);
    setappointmentDetails(data);
  };

  const closeRateAppointmentModalHandler = () => {
    setrateAppointmentModalIsOpen(false);
  };
  
  console.log("proppppos = ", props)
  
    return (
      <TabContainer>
        {props.list &&
          props.list.map((i) => {
            return (
              <div key={i.appointmentId}>
                <div className="col-md-4" style={{ marginTop: "10px" }}>
                  <Paper
                    elevation={3}
                    style={{ width: "98%", margin: "auto" }}
                  >
                    <div
                      style={{
                        textAlign: "left",
                        marginLeft: "10px",
                        paddingTop: "1px",
                      }}
                    >
                      <h3 style={{ marginTop: "10px" }}>
                        Doctor Name : {i.doctorName}
                      </h3>

                      <div>Date : {i.appointmentDate} </div>
                      <div>Symptoms : {i.symptoms} </div>
                      <div>Prior Medical History : {i.priorMedicalHistory} </div>
                      {/* <div>
                        Rating : <Rating name="read-only" value="5" readOnly />
                      </div> */}
                    </div>
                    <Stack
                      spacing={2}
                      direction="row"
                      style={{
                        marginLeft: "10px",
                        marginTop: "-10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          width: "fit-content",
                          marginTop: "20px",
                        }}
                        variant="contained"
                        onClick={() => openRateAppointmentModalHandler(i)}
                      >
                        RATE APPOINTMENT
                      </Button>
                    </Stack>
                  </Paper>
                </div>
              </div>
            );
          })}
        <RateAppointment
          isOpen={rateAppointmentModalIsOpen}
          handleClose={closeRateAppointmentModalHandler}
          details={appointmentDetails}
        />
      </TabContainer>
    );
  
}

export default Appointment;
