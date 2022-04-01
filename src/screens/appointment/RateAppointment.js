import React, { Component, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import {fetchcheckRatedorNot, fetchSubmitRating} from '../../util/fetch'
import { CardHeader } from '@mui/material';

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "600px",
    height: "400px",
    padding: "0%",
    transform: "translate(-50%, -50%)",
  },
};

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

const RateAppointment = (props) => {

  const [comments, setcomments] = useState(null);
  const [ratingValue, setratingValue] = useState(0);
  const [isValidRating, setisValidRating] = useState("dispNone");
  const [isAlreadyRated, setisAlreadyRated] = useState("dispNone");
  const [ratedSuccessfully, setratedSuccessfully] = useState("dispNone");

  const commentsChangeHandler = (e) => {
    setcomments(e.target.value);
  }

  const ratingChangeHandler = (event, newValue) => {
    setratingValue(newValue);
    setisValidRating("dispNone");
  };

  const rateAppointmentCloseHandler = () => {

    setcomments(null);
    setratingValue(0);
    setisValidRating("dispNone");
    setisAlreadyRated("dispNone");
    setratedSuccessfully("dispNone");


    props.handleClose();
  };

  const rateAppointmentClickHandler = async () => {

    const data = await fetchcheckRatedorNot(props.details.appointmentId);
    console.log("Rate Fetch Data = ", data)

    if (data === true) {
      setisValidRating("dispNone");
      setisAlreadyRated("dispBlock");
      setratedSuccessfully("dispNone");
    } 
    else {
      ratingValue === "" || ratingValue === 0
        ? setisValidRating("dispBlock")
        : setisValidRating("dispNone")

      if (ratingValue !== "" && ratingValue !== 0) {
        let data = {
          appointmentId: props.details.appointmentId,
          comments: comments,
          doctorId: props.details.doctorId,
          rating: ratingValue,
        };
        
        fetchSubmitRating(data);
      }
    }
  };


  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.isOpen}
      contentLabel="Login"
      onRequestClose={rateAppointmentCloseHandler}
      style={customStyles}
    >
      <div className="modal-head">Rate an Appointment</div>
      <div style={{ marginLeft: "10px" }}>
        <FormControl>
          <TextField
            multiline={true}
            rows={3}
            id="comments"
            label="Comments"
            type="text"
            comments={comments}
            onChange={commentsChangeHandler}
            variant="standard"
          />
        </FormControl>
        <br />
        <br />
        <FormControl required>
          <div>
            Rating : 
            <Rating
              name="simple-controlled"
              value={ratingValue}
              onChange={ratingChangeHandler}
            />
          </div>
          <FormHelperText className={isValidRating}>
            <span className="red">Submit a rating</span>
          </FormHelperText>
          <FormHelperText className={isAlreadyRated}>
            <span className="red">
              You have already rated for this appointment
            </span>
          </FormHelperText>
          <FormHelperText className={ratedSuccessfully}>
            <span className="red">Rated Successfully</span>
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
          onClick={rateAppointmentClickHandler}
        >
          RATE APPOINTMENT
        </Button>
      </div>
    </Modal>
  );

}

export default RateAppointment;
