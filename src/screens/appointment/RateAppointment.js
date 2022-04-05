import React, { useState } from "react";
import Modal from "react-modal";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import { checkRatedOrNot, submitRating } from '../../util/fetch'
import { Card, CardContent, CardHeader } from '@mui/material';
import "../../common/common.css";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "50%",
    height: "400px",
    padding: "0%",
    transform: "translate(-50%, -50%)",
  },
};

const RateAppointment = (props) => {

  //Creating variables to store states
  const [comments, setComments] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [isRatingValid, setIsRatingValid] = useState("dispNone");
  const [isAlreadyRated, setIsAlreadyRated] = useState("dispNone");
  const [ratedSuccessfully, setRatedSuccessfully] = useState("dispNone");

  // Comments state updater
  const commentsChangeHandler = (e) => {
    setComments(e.target.value);
  }

  // Rating state updater
  const ratingChangeHandler = (event, newValue) => {
    setRatingValue(newValue);
    setIsRatingValid("dispNone");
  };

  // Rate appointment modal closer
  const rateAppointmentCloseHandler = () => {
    setComments(null);
    setRatingValue(0);
    setIsRatingValid("dispNone");
    setIsAlreadyRated("dispNone");
    setRatedSuccessfully("dispNone");
    // closing modal through props
    props.handleClose();
  };

  // Rating Submission Handler
  const rateAppointmentClickHandler = async () => {
    // Checking whether appointment has been rated before or not
    const data = await checkRatedOrNot(props.details.appointmentId);

    if (data === true) {
      setIsRatingValid("dispNone");
      setIsAlreadyRated("dispBlock");
      setRatedSuccessfully("dispNone");
    }
    else {
      ratingValue === "" || ratingValue === 0
        ? setIsRatingValid("dispBlock")
        : setIsRatingValid("dispNone")

      if (ratingValue !== "" && ratingValue !== 0) {
        let ratingData = {
          appointmentId: props.details.appointmentId,
          comments: comments,
          doctorId: props.details.doctorId,
          rating: ratingValue,
        };
        // Submitting Rating
        const status = await submitRating(ratingData);
        if (status === 200) {
          setRatedSuccessfully("dispBlock");
        }
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
      <Card className="card">
        <CardHeader
          title="Rate an Appointment"
          className="card-header"
        ></CardHeader>
        <CardContent className="card">
          <FormControl>
            <TextField
              multiline={true}
              rows={4}
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
            <FormHelperText className={isRatingValid}>
              <span className="red">Select a rating</span>
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

          <Button
            variant="contained"
            size="medium" color="primary"
            style={{ marginLeft: "0px", marginTop: "40px" }}
            onClick={rateAppointmentClickHandler}
          >
            RATE APPOINTMENT
          </Button>

        </CardContent>
      </Card>
    </Modal>
  );

}

export default RateAppointment;
