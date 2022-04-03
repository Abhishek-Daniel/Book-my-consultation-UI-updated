import React from "react";
import Modal from "react-modal";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import TabContainer from "../../common/tabContainer/TabContainer";
import "../../common/common.css";

//creating custom styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "350px",
    height: "400px",
    padding: "0%",
    transform: "translate(-50%, -50%)",
    overflowY: "hidden"
  },
};



const DoctorDetails = (props) => {
  
  return (
    <TabContainer>
    <Modal
      ariaHideApp={false}
      isOpen={props.isOpen}
      contentLabel="Login"
      onRequestClose={props.handleClose}
      style={customStyles}
    >

      <Card style={{ height: "100%" }}>
            <CardHeader
              className="card-header"
              title="Doctor Details"
            ></CardHeader>
            <CardContent style={{ height: "100%" }}>
          {props.dDetails && (
            <div className="x-large">Dr: {props.dDetails.firstName} {props.dDetails.lastName}</div>
          )}
          {props.dDetails && (
            <div className="large">Total Experience: {props.dDetails.totalYearsOfExp} years</div>
          )}
          {props.dDetails && (
            <div className="large">Speciality: {props.dDetails.speciality}</div>
          )}
          {props.dDetails && (
            <div className="large">Date of Birth: {props.dDetails.dob}</div>
          )}
          {props.dDetails && (
            <div className="large">City: {props.dDetails.address.city}</div>
          )}
          {props.dDetails && (
            <div className="large">Email: {props.dDetails.emailId}</div>
          )}
          {props.dDetails && (
            <div className="large">Mobile: {props.dDetails.mobile}</div>
          )}
          {props.dDetails && (
            <div className="large">Rating:

              <Rating
                name="read-only"
                value={props.dDetails.rating}
                readOnly
              />
              </div>
          )}
        </CardContent>
      </Card>
      <br />
          <br />
    </Modal>
    </TabContainer>
  );

}

export default DoctorDetails;
