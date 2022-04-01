import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
// import Select from "react-select";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Stack from "@mui/material/Stack";
import BookAppointment from "../../screens/doctorList/BookAppointment";
import DoctorDetails from "../../screens/doctorList/DoctorDetails";
import{ fetchBookAppointmentModalHandler, DoctorsAndSpeciality, fetchingDoctorsWithSpeciality, DoctorDetailModalHandler} from '../../util/fetch'

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

class DoctorList extends Component {
  constructor() {
    super();
    this.state = {
      bookAppointmentModalIsOpen: false,
      doctorDetailModalIsOpen: false,
      doctorName: null,
      doctorId: null,
      selectedSpeciality: "",
      doctorList: null,
      speciality: null,
      timeSlot: null,
      doctorDetails: null,
      withoutLoginAppointment: false,
    };
    this.closeBookAppointmentModalHandler =
      this.closeBookAppointmentModalHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const data= await DoctorsAndSpeciality();
    this.setState({ doctorList: data[0], speciality: data[1] });
  }

  handleChange = (event) => {
    this.setState({ selectedSpeciality: event.target.value }, async () => {
      const data = await fetchingDoctorsWithSpeciality(this.state.selectedSpeciality);
      this.setState({ doctorList: data });
    });
  };

  handleWithoutLoginAppointmentClose = () => {
    this.setState({
      withoutLoginAppointment: false,
    });
  };

  openBookAppointmentModalHandler = (data1, data2) => {
    if (
      localStorage.getItem("access-token") !== null &&
      localStorage.getItem("access-token") !== undefined
    ) {
      this.setState(
        {
          bookAppointmentModalIsOpen: true,
          doctorName: data1,
          doctorId: data2,
        },
        async () => {
          var date = new Date().toISOString().slice(0, 10);
          let data = await fetchBookAppointmentModalHandler(this.state.doctorId, date);
          this.setState({ timeSlot: data.timeSlot });

        }
      );
    } else {
      this.setState({
        withoutLoginAppointment: true,
      });
    }
  };

  closeBookAppointmentModalHandler = () => {
    this.setState({ bookAppointmentModalIsOpen: false });
  };

  openDoctorDetailModalHandler = (data1, data2) => {
    this.setState(
      {
        doctorDetailModalIsOpen: true,
        doctorName: data1,
        doctorId: data2,
      },
      async () => {
        let data = await DoctorDetailModalHandler(this.state.doctorId);
        this.setState({ doctorDetails: data });
      }
    );
  };

  closeDoctorDetailModalHandler = () => {
    this.setState({ doctorDetailModalIsOpen: false });
  };



  render() {
    return (
      <TabContainer>
        <div className="container">
          <div className="row">
            <div className="col-md-3" style={{ marginRight: "155px" }}>
              Select Speciality:
            </div>
            <div
              className="col-md-6"
              style={{
                width: "300px",
                margin: "auto",
              }}
            >
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={this.state.selectedSpeciality}
                  onChange={this.handleChange}
                  style={{ width: "300px" }}
                >
                  <MenuItem value="none">
                    <em style={{ opacity: "0" }}>None</em>
                  </MenuItem>
                  {this.state.speciality &&
                    this.state.speciality.map((i) => {
                      return <MenuItem value={i}>{i}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </div>

            {this.state.doctorList &&
              this.state.doctorList
                .filter(
                  (item) => item.speciality === this.state.selectedSpeciality
                )
                .map((i) => {
                  return (
                    <div key={i.doctorId}>
                      <div className="col-md-4" style={{ marginTop: "10px" }}>
                        <Paper
                          elevation={3}
                          style={{ width: "40%", margin: "auto" }}
                        >
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                              paddingTop: "1px",
                            }}
                          >
                            <h3 style={{ marginTop: "10px" }}>
                              Doctor Name : {i.firstName}
                            </h3>

                            <div>Speciality : {i.speciality}</div>
                            <div>
                              Rating :{" "}
                              <Rating
                                name="read-only"
                                value={i.rating}
                                readOnly
                              />
                            </div>
                          </div>
                          <Stack
                            spacing={2}
                            direction="row"
                            style={{
                              marginLeft: "20px",
                              marginTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            <Button
                              style={{
                                backgroundColor: "blue",
                                color: "white",
                                width: "40%",
                              }}
                              variant="contained"
                              onClick={() =>
                                this.openBookAppointmentModalHandler(
                                  i.firstName,
                                  i.id
                                )
                              }
                            >
                              BOOK APPOINTMENT
                            </Button>
                            <Button
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                width: "40%",
                              }}
                              variant="contained"
                              onClick={() =>
                                this.openDoctorDetailModalHandler(i.firstName)
                              }
                            >
                              VIEW DETAILS
                            </Button>
                          </Stack>
                        </Paper>
                      </div>
                    </div>
                  );
                })}
            {this.state.doctorList &&
              this.state.doctorList
                .filter(
                  (item) =>
                    this.state.selectedSpeciality === "" ||
                    this.state.selectedSpeciality === "none"
                )
                .map((i) => {
                  return (
                    <div key={i.doctorId}>
                      <div className="col-md-4" style={{ marginTop: "10px" }}>
                        <Paper
                          elevation={3}
                          style={{ width: "40%", margin: "auto" }}
                        >
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                              paddingTop: "1px",
                            }}
                          >
                            <h3 style={{ marginTop: "10px" }}>
                              Doctor Name : {i.firstName}
                            </h3>

                            <div>Speciality : {i.speciality}</div>
                            <div>
                              Rating :
                              <Rating
                                name="read-only"
                                value={i.rating}
                                readOnly
                              />
                            </div>
                          </div>
                          <Stack
                            spacing={2}
                            direction="row"
                            style={{
                              marginLeft: "20px",
                              marginTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            <Button
                              style={{
                                backgroundColor: "blue",
                                color: "white",
                                width: "40%",
                              }}
                              variant="contained"
                              onClick={() =>
                                this.openBookAppointmentModalHandler(
                                  i.firstName,
                                  i.id
                                )
                              }
                            >
                              BOOK APPOINTMENT
                            </Button>
                            <Button
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                width: "40%",
                              }}
                              variant="contained"
                              onClick={() =>
                                this.openDoctorDetailModalHandler(
                                  i.firstName,
                                  i.id
                                )
                              }
                            >
                              VIEW DETAILS
                            </Button>
                          </Stack>
                        </Paper>
                      </div>
                    </div>
                  );
                })}
          </div>

          <BookAppointment
            isOpen={this.state.bookAppointmentModalIsOpen}
            handleClose={this.closeBookAppointmentModalHandler}
            dName={this.state.doctorName}
            dId={this.state.doctorId}
            timeslot={this.state.timeSlot}
          />

          <Dialog
            open={this.state.withoutLoginAppointment}
            onClose={this.handleWithoutLoginAppointmentClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"localhost:3000"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please login to book an appointment!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  width: "5vw",
                }}
                variant="contained"
                onClick={this.handleWithoutLoginAppointmentClose}
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>

          <DoctorDetails
            isOpen={this.state.doctorDetailModalIsOpen}
            handleClose={this.closeDoctorDetailModalHandler}
            dName={this.state.doctorName}
            dDetails={this.state.doctorDetails}
          />
        </div>
      </TabContainer>
    );
  }
}

export default DoctorList;
