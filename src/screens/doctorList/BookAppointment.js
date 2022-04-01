import React, { Component, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";
import FormControl from "@mui/material/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@mui/material/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fetchHandleDateChangeFetchingTimeSlots, fetchBookAppointmentClickHandler, fetchBookingAppointmenWithDetails } from '../../util/fetch'


//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "600px",
    height: "560px",
    padding: "0%",
    transform: "translate(-50%, -50%)",
  },
};

const BookAppointment = (props) => {

  const [selectedDate, setselectedDate] = useState(new Date());
  const [selectedTimeSlot, setselectedTimeSlot] = useState("")
  const [timeSlot, settimeSlot] = useState(null);
  const [priormedicalhistory, setpriormedicalhistory] = useState(null);
  const [symptoms, setsymptoms] = useState(null);
  const [isValidTimeSlot, setisValidTimeSlot] = useState("dispNone");
  const [bookedAppointment, setbookedAppointment] = useState("dispNone");
  const [openSlotUnavailable, setopenSlotUnavailable] = useState(false);


  const priormedicalhistoryChangeHandler = (e) => {

    setpriormedicalhistory(e.target.value);
    setbookedAppointment("dispNone");

  };

  const symptomsChangeHandler = (e) => {

    setsymptoms(e.target.value);
    setbookedAppointment("dispNone");

  };

  const bookAppointmentClickHandler = async () => {
    selectedTimeSlot === "" || selectedTimeSlot === "none"
      ? setisValidTimeSlot("dispBlock")
      : setisValidTimeSlot("dispNone");

    if (
      selectedTimeSlot !== "" &&
      selectedTimeSlot !== "none"
    ) {

      const result = await fetchBookAppointmentClickHandler();


      const options = {
        doctorId: props.dId,
        doctorName: props.dName,
        userId: localStorage.getItem("uuid"),
        // userName: data.firstName + " " + data.lastName,
        userName: result,
        userEmailId: localStorage.getItem("uuid"),
        timeSlot: selectedTimeSlot,
        appointmentDate: selectedDate,
        symptoms: symptoms,
        priormedicalhistory: priormedicalhistory,
      };

      console.log("Booking data=", options);

      const responsesse = await fetchBookingAppointmenWithDetails(options);

      console.log("responsesse = ", responsesse)
      if (responsesse >= 400) {

        setopenSlotUnavailable(true);
        setbookedAppointment("dispNone");

      } else {

        setbookedAppointment("dispBlock");

      }

    }
  };

  const handleChange = (event) => {

    setselectedTimeSlot(event.target.value);
    setisValidTimeSlot("dispNone");
    setbookedAppointment("dispNone");

  };

  const handleSlotUnavailableClose = () => {

    setopenSlotUnavailable(false);

  };

  const bookAppointmentCloseHandler = () => {


    setselectedDate(new Date());
    setselectedTimeSlot("");
    settimeSlot(null);
    setsymptoms(null);
    setisValidTimeSlot("dispNone");
    setbookedAppointment("dispNone");


    props.handleClose();
  };

  const handleDateChange = async (date) => {
    setselectedDate(date);

    var date = selectedDate.toISOString().slice(0, 10);
    
    const response = await fetchHandleDateChangeFetchingTimeSlots(props.dId, date);
    console.log("asaf = ", response);
    settimeSlot( response.timeSlot);
  };


  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.isOpen}
      contentLabel="Login"
      onRequestClose={bookAppointmentCloseHandler}
      style={customStyles}
    >
      <div className="modal-head">Book an Appointment</div>
      <div style={{ marginLeft: "10px" }}>
        <FormControl>
          <h3>
            Doctor Name: {props.dName} : {props.dId}
          </h3>
        </FormControl>
        <br />
        <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Date Picker Inline"
              style={{ width: "80%", padding: "0px" }}
              value={selectedDate}
              onChange={(date) => handleDateChange(date)}
              format="MM/dd/yyyy"
              minDate={new Date()}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <br />
        <br />
        <FormControl variant="standard">
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Timeslot
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedTimeSlot}
            onChange={handleChange}
            style={{ width: "150px", height: "50px" }}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            {selectedDate !== new Date() &&
              timeSlot &&
              timeSlot.map((i) => {
                return <MenuItem key={i} value={i}>{i}</MenuItem>;
              })}
            {timeSlot === null &&
              props.timeslot !== null &&
              props.timeslot.map((i) => {
                return <MenuItem key={i} value={i}>{i}</MenuItem>;
              })}
          </Select>
          <FormHelperText className={isValidTimeSlot}>
            <span className="red">Select a time slot</span>
          </FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <TextField
            multiline={true}
            rows={3}
            id="medicalHistory"
            label="Medical History"
            type="text"
            priormedicalhistory={priormedicalhistory}
            onChange={priormedicalhistoryChangeHandler}
            variant="standard"
          />
        </FormControl>
        <br />
        <FormControl>
          <TextField
            multiline={true}
            rows={3}
            id="symptoms"
            label="Symptoms"
            type="text"
            symptoms={symptoms}
            onChange={symptomsChangeHandler}
            variant="standard"
          />
          <FormHelperText className={bookedAppointment}>
            <span className="red">Appointment Booked Successfully</span>
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <Button
          style={{
            backgroundColor: "blue",
            color: "white",
            width: "15vw",
          }}
          variant="contained"
          onClick={bookAppointmentClickHandler}
        >
          BOOK APPOINTMENT
        </Button>
        <Dialog
          open={openSlotUnavailable}
          onClose={handleSlotUnavailableClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"localhost:3000"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Either the slot is already booked or not available
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                backgroundColor: "lightblue",
                color: "white",
                width: "5vw",
              }}
              variant="contained"
              onClick={handleSlotUnavailableClose}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Modal>
  );
}


export default BookAppointment;
