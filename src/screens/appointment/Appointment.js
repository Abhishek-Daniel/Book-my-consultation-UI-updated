import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Stack from "@mui/material/Stack";
import RateAppointment from "../appointment/RateAppointment";
import TabContainer from '../../common/tabContainer/TabContainer'
import Paper from "@mui/material/Paper";
import { makeStyles } from '@material-ui/core/styles';
import '../../common/common.css';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Appointment = (props) => {

  const [rateAppointmentModalIsOpen, setrateAppointmentModalIsOpen] = useState(false);
  const [appointmentDetails, setappointmentDetails] = useState(null);
  const openRateAppointmentModalHandler = (data) => {
    setrateAppointmentModalIsOpen(true);
    setappointmentDetails(data);
  };

  const closeRateAppointmentModalHandler = () => {
    setrateAppointmentModalIsOpen(false);
  };

  const classes = useStyles();

  return (
    <TabContainer>
      {props.list &&
        props.list.map((i) => {
          return (
            <div key={i.appointmentId}>
              <div className="col-md-4" style={{marginTop:"40px"}}>
                <Paper
                  elevation={3}
                  style={{ margin: "15px",
                  textAlign: "left",
                  padding: "20px",
                  cursor: "pointer" }}
                >
                    <div className="x-large"
                    style={{ marginTop: "0px" }}
                    >
                      Doctor Name : {i.doctorName}
                    </div>

                    <div className="large">Date : {i.appointmentDate} </div>
                    <div className="large">Symptoms : {i.symptoms} </div>
                    <div className="large">Prior Medical History : {i.priorMedicalHistory} </div>
                  <Stack
                    spacing={2}
                    direction="row"
                    style={{
                      marginTop: "-10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <Button variant="contained" size="medium" color="primary" style={{marginLeft:"0px", marginTop:"50px", }} onClick={() => openRateAppointmentModalHandler(i)} className={classes.margin}>
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
