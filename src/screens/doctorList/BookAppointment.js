import React, { useState } from "react";
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
import { Card, CardContent, CardHeader } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import browserlogo from '../../assets/browserlogo.png';
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fetchTimeSlots, fetchBookAppointmentClickHandler, bookAppointment } from '../../util/fetch'
import TabContainer from "../../common/tabContainer/TabContainer";
import "../../common/common.css"

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "50%",
    height: "670px",
    padding: "0%",
    transform: "translate(-50%, -50%)"
  },
};

const BookAppointment = (props) => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [timeSlot, setTimeSlot] = useState(null);
  const [priormedicalhistory, setPriorMedicalHistory] = useState(null);
  const [symptoms, setSymptoms] = useState(null);
  const [isTimeSlotValid, setIsTimeSlotValid] = useState("dispNone");
  const [bookedAppointment, setBookedAppointment] = useState("dispNone");
  const [openSlotUnavailable, setOpenSlotUnavailable] = useState(false);


  const priormedicalhistoryChangeHandler = (e) => {

    setPriorMedicalHistory(e.target.value);
    setBookedAppointment("dispNone");

  };

  const symptomsChangeHandler = (e) => {

    setSymptoms(e.target.value);
    setBookedAppointment("dispNone");

  };

  const bookAppointmentClickHandler = async () => {
    selectedTimeSlot === "" || selectedTimeSlot === "none"
      ? setIsTimeSlotValid("dispBlock")
      : setIsTimeSlotValid("dispNone");

    if (
      selectedTimeSlot !== "" &&
      selectedTimeSlot !== "none"
    ) {

      const result = await fetchBookAppointmentClickHandler();


      const dataForBookingAppointment = {
        doctorId: props.dId,
        doctorName: props.dName,
        userId: sessionStorage.getItem("uuid"),
        userName: result,
        userEmailId: sessionStorage.getItem("uuid"),
        timeSlot: selectedTimeSlot,
        appointmentDate: selectedDate,
        symptoms: symptoms,
        priorMedicalHistory: priormedicalhistory,
      };

      const response = await bookAppointment(dataForBookingAppointment);

      if (response >= 400) {

        setOpenSlotUnavailable(true);
        setBookedAppointment("dispNone");

      } else {

        setBookedAppointment("dispBlock");

      }

    }
  };

  const handleChange = (event) => {

    setSelectedTimeSlot(event.target.value);
    setIsTimeSlotValid("dispNone");
    setBookedAppointment("dispNone");

  };

  const handleSlotUnavailableClose = () => {

    setOpenSlotUnavailable(false);

  };

  const bookAppointmentCloseHandler = () => {

    setSelectedDate(new Date());
    setSelectedTimeSlot("");
    setTimeSlot(null);
    setSymptoms(null);
    setIsTimeSlotValid("dispNone");
    setBookedAppointment("dispNone");

    props.handleClose();
  };

  const handleDateChange = async (dateData) => {
    setSelectedDate(dateData);

    var date = selectedDate.toISOString().slice(0, 10);

    const response = await fetchTimeSlots(props.dId, date);
    setTimeSlot(response.timeSlot);
  };

  return (
    <TabContainer>
      <Modal
        ariaHideApp={false}
        isOpen={props.isOpen}
        contentLabel="Login"
        onRequestClose={bookAppointmentCloseHandler}
        style={customStyles}
      >
        <Card className="card">
          <CardHeader
            className="card-header"
            title="Book an Appointment"
          ></CardHeader>
          <CardContent className="card">
            <FormControl>
              <TextField
                value={props.dName}
                type="text"
                variant="standard"
                label="Doctor Name"
                required
                disabled
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  label="Date Picker Inline"
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
              <InputLabel style={{ fontSize: "12px" }} variant="standard" htmlFor="uncontrolled-native">Timeslot</InputLabel>
              <Select
                label="TimeSlot"
                className="time-slot-select"
                value={selectedTimeSlot}
                onChange={handleChange}
                style={{ marginTop: "-10px" }}
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
              <FormHelperText className={isTimeSlotValid}>
                <span className="red">Select a time slot</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormControl>
              <TextField
                multiline={true}
                rows={4}
                id="medicalHistory"
                label="Medical History"
                type="text"
                priormedicalhistory={priormedicalhistory}
                onChange={priormedicalhistoryChangeHandler}
                variant="standard"
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              <TextField
                multiline={true}
                rows={4}
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
              color="primary"
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
              <DialogTitle id="alert-dialog-title"
                className="dialogue-box-title">
                <img
                  className="logo-dialogue-box"
                  src={browserlogo}
                  alt="Browser Logo"
                />
                <span>localhost:3000</span>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Either the slot is already booked or not available
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className="dialogue-box-button"
                  style={{ backgroundColor: "#00ddff", color: "white", width: "2vw" }}
                  variant="contained"
                  onClick={handleSlotUnavailableClose}
                  autoFocus
                >
                  OK
                </Button>

              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      </Modal>
    </TabContainer>
  );
}


export default BookAppointment;
