import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import RateAppointment from "../appointment/RateAppointment";
import TabContainer from '../../common/tabContainer/TabContainer'
import Paper from "@mui/material/Paper";
import '../../common/common.css';


const Appointment = (props) => {

  const [rateAppointmentModalIsOpen, setRateAppointmentModalIsOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const openRateAppointmentModalHandler = (data) => {
    setRateAppointmentModalIsOpen(true);
    setAppointmentDetails(data);
  };

  const closeRateAppointmentModalHandler = () => {
    setRateAppointmentModalIsOpen(false);
  };


  return (
    <TabContainer>
      {props.list &&
        props.list.map((i) => {
          return (

            <div key={i.appointmentId} className="paper-container-large">

              <Paper
                className="paper-large"
                elevation={3}
              >
                <div className="x-large">
                  Doctor Name : {i.doctorName}
                </div>

                <div className="large">Date : {i.appointmentDate} </div>
                <div className="large">Symptoms : {i.symptoms} </div>
                <div className="large">Prior Medical History : {i.priorMedicalHistory} </div>

                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  style={{ marginLeft: "0px", marginTop: "50px", }}
                  onClick={() => openRateAppointmentModalHandler(i)}>
                  RATE APPOINTMENT
                </Button>

              </Paper>
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
