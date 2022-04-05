import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import BookAppointment from "../../screens/doctorList/BookAppointment";
import DoctorDetails from "../../screens/doctorList/DoctorDetails";
import { fetchTimeSlots, fetchDoctorsListAndSpeciality, fetchDoctorsListWithSpeciality, fetchDoctorDetails } from '../../util/fetch'

import Paper from "@mui/material/Paper";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TabContainer from '../../common/tabContainer/TabContainer';
import '../../common/common.css'

const DoctorList = () => {

  //Creating variables to store states
  const [bookAppointmentModalIsOpen, setBookAppointmentModalIsOpen] = useState(false);
  const [doctorDetailModalIsOpen, setDoctorDetailModalIsOpen] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [appointmentWithoutLogin, setAppointmentWithoutLogin] = useState(false);
  const [doctorName, setDoctorName] = useState(null);
  const [doctorList, setDoctorList] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [timeSlot, setTimeSlot] = useState(null);



  useEffect(() => {
    let data;
    async function fetchData() {
      // Getting Doctors List and Speciality Types
      data = await fetchDoctorsListAndSpeciality();
      return data;
    }

    fetchData().then((data) => {
      setDoctorList(data[0]);
      setSpeciality(data[1]);
    })
      .catch((e) => {
        console.log("Backend not running")
      })
  }, [])

  useEffect(() => {
    // Getting Doctors List based on speciality selected
    fetchDoctorsListWithSpeciality(selectedSpeciality).then((data) => {
      setDoctorList(data);
    }).catch((err) => {
      console.log("Backend not running");
    })
  }, [selectedSpeciality])

  // Speciality change Handler used to update Doctors list
  const specialityChangeHandler = (event) => {
    setSelectedSpeciality(event.target.value);
  }

  const handleAppointmentWithoutLoginClose = () => {
    setAppointmentWithoutLogin(false);
  };

  // Book appoointment Modal Opener
  const openBookAppointmentModalHandler = async (dName, dId) => {
    if (
      sessionStorage.getItem("access-token") !== null &&
      sessionStorage.getItem("access-token") !== undefined
    ) {
      setDoctorName(dName);
      setDoctorId(dId);
      setBookAppointmentModalIsOpen(true);

      var date = new Date().toISOString().slice(0, 10);
      try {
        //Fetching time slots based on Doctor Id and date
        let data = await fetchTimeSlots(dId, date)

        setTimeSlot(data.timeSlot);
      } catch (error) {
        console.log("Backend Not Running")
      }
    } else {
      setAppointmentWithoutLogin(true);
    }
  }

  // Book appointment modal closer
  const closeBookAppointmentModalHandler = () => {
    setBookAppointmentModalIsOpen(false);
  };

  // View Details Modal Opener
  const openDoctorDetailModalHandler = async (dId) => {
    setDoctorId(dId);
    const data = await fetchDoctorDetails(dId);
    setDoctorDetails(data);
    setDoctorDetailModalIsOpen(true);

  };

  // View Details Modal closer
  const closeDoctorDetailModalHandler = () => {
    setDoctorDetailModalIsOpen(false);
  };



  return (
    <TabContainer>
      <div>
        <div>
          <div className="large">
            Select Speciality:
          </div>
          <div
            className="select-container"
          >
            <FormControl variant="filled">

              <Select
                className="select-drop"
                value={selectedSpeciality}
                onChange={specialityChangeHandler}
              >
                <MenuItem key="none" value="none">
                  <em className="none-option">None</em>
                </MenuItem>
                {speciality &&
                  speciality.map((i) => {
                    return <MenuItem key={i} value={i}>{i}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </div>

          {doctorList &&
            doctorList
              .filter(
                (item) => item.speciality === selectedSpeciality
              )
              .map((i) => {
                return (
                  <div key={i.id}>
                    <div className="paper-container">
                      <Paper
                        className="paper"
                        elevation={3}
                      >
                        <div className="x-large">
                          Doctor Name : {i.firstName} {i.lastName}
                        </div>
                        <br />

                        <div className="large">Speciality : {i.speciality}</div>
                        <div className="large">
                          Rating :{" "}
                          <Rating
                            name="read-only"
                            value={i.rating}
                            readOnly
                          />
                        </div>

                        <Button
                          style={{ width: "40%", margin: "10px" }}
                          color="primary"
                          variant="contained"
                          onClick={() =>
                            openBookAppointmentModalHandler(
                              i.firstName + " " + i.lastName,
                              i.id
                            )
                          }
                        >
                          BOOK APPOINTMENT
                        </Button>

                        <Button
                          style={{ backgroundColor: "green", color: "white", width: "40%", margin: "10px" }}
                          variant="contained"
                          onClick={() =>
                            openDoctorDetailModalHandler(i.id)
                          }
                        >
                          VIEW DETAILS
                        </Button>

                      </Paper>
                    </div>
                  </div>
                );
              })}
          {doctorList &&
            doctorList
              .filter(
                (item) =>
                  selectedSpeciality === "" ||
                  selectedSpeciality === "none"
              )
              .map((i) => {
                return (
                  // <div key={i.id}>
                  <div key={i.id} className="paper-container">
                    <Paper
                      className="paper"
                      elevation={3}
                    >
                      {/* <div> */}
                      <div className="x-large">
                        Doctor Name : {i.firstName} {i.lastName}
                      </div>
                      <br />

                      <div className="large">Speciality : {i.speciality}</div>
                      <div className="large">
                        Rating :
                        <Rating
                          name="read-only"
                          value={i.rating}
                          readOnly
                        />
                      </div>
                      <Button
                        style={{ width: "40%", margin: "10px" }}
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          openBookAppointmentModalHandler(
                            i.firstName + " " + i.lastName,
                            i.id
                          )
                        }
                      >
                        BOOK APPOINTMENT
                      </Button>
                      <Button
                        style={{ backgroundColor: "green", color: "white", width: "40%", margin: "10px" }}
                        variant="contained"
                        onClick={() =>
                          openDoctorDetailModalHandler(i.id)
                        }
                      >
                        VIEW DETAILS
                      </Button>
                    </Paper>
                  </div>
                );
              })}
        </div>

        <BookAppointment
          isOpen={bookAppointmentModalIsOpen}
          handleClose={closeBookAppointmentModalHandler}
          dName={doctorName}
          dId={doctorId}
          timeslot={timeSlot}
        />

        <Dialog
          open={appointmentWithoutLogin}
          onClose={handleAppointmentWithoutLoginClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"localhost:3000"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please login to book appointment!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ backgroundColor: "blue", color: "white", width: "5vw" }}
              variant="contained"
              onClick={handleAppointmentWithoutLoginClose}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <DoctorDetails
          isOpen={doctorDetailModalIsOpen}
          handleClose={closeDoctorDetailModalHandler}
          // dName={doctorName}
          dDetails={doctorDetails}
        />
      </div>
    </TabContainer>
  );
}


export default DoctorList;
