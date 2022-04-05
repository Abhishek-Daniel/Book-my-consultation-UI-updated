const baseUrlForFetchingData = "http://localhost:8080/";

// Function to fetch Doctors List and Speciality Categories
async function fetchDoctorsListAndSpeciality() {
    const url1 = baseUrlForFetchingData + "doctors/";
    const url2 = baseUrlForFetchingData + "doctors/speciality";
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const data1 = await response1.json();
    const data2 = await response2.json();
    return [data1, data2];
}

// Function to fetch Doctors list based on speciality selected
async function fetchDoctorsListWithSpeciality(speciality) {
    let url = baseUrlForFetchingData + "doctors/?speciality=" + speciality;
    if (speciality === "none") {
        url = baseUrlForFetchingData + 'doctors/?speciality=';
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to fetch Doctor Details based on doctor Id
async function fetchDoctorDetails(doctorId) {
    let url = `http://localhost:8080/doctors/` + doctorId;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Backend Not Running")
    }
}

// Function to fetch Time slots based on doctor Id and Date selected
async function fetchTimeSlots(doctorId, date) {
    const url = baseUrlForFetchingData + 'doctors/' + doctorId + '/timeSlots?date=' + date;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to get Full Username from database
async function getFullUsername() {


    const opt = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access-token"),
        },
    };

    const response = await fetch(`http://localhost:8080/users/${sessionStorage.getItem("uuid")}`, opt);
    const data = await response.json();
    const name = await data.firstName + " " + data.lastName;
    return name;

}

// Function to book Appointment
async function bookAppointment(dataForBookingAppointment) {
    const request = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access-token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForBookingAppointment),
    };

    console.log(dataForBookingAppointment);

    const response = await fetch(baseUrlForFetchingData + "appointments/", request);
    const status = await response.status;
    return status;
}

// Function to fetch appointments list
async function fetchAppointmentsList() {
    const opt = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access-token"),
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(`http://localhost:8080/users/${sessionStorage.getItem("uuid")}/appointments`, opt);
    const data = await response.json();
    return data;
}

// Function to login
async function login(username, loginPassword) {

    const options = {
        method: "POST",
        headers: {
            Authorization:
                "Basic " +
                btoa(`${username}:${loginPassword}`),
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(baseUrlForFetchingData + "auth/login", options);
    const status = response.status;
    const data = await response.json();

    return [data, status];
}

// Function to register
async function register(registrationData) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
    };
    const response = await fetch(baseUrlForFetchingData + "users/register", requestOptions);
    const status = await response.status;
    const data = await response.json();
    return [status, data];
}

// Function to logout
async function logout() {
    const options = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access-token"),
        },
    };

    fetch(baseUrlForFetchingData + "auth/logout", options).catch((e) => {
        console.log("Backend Not running")
    })
}

// Function to check appointment has been rated or not 
async function checkRatedOrNot(appointmentId) {
    const opt1 = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access-token"),
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(`http://localhost:8080/ratings/` + appointmentId, opt1);
    const data = await response.json();
    return data;
}

// Function to submit rating
async function submitRating(ratingData) {
    const opt2 = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access-token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
    };

    const response = await fetch(baseUrlForFetchingData + "ratings", opt2);
    const status = response.status;
    return status;
}

export { submitRating, checkRatedOrNot, logout, register, login, fetchAppointmentsList, fetchTimeSlots, bookAppointment, getFullUsername, fetchDoctorsListWithSpeciality, fetchDoctorsListAndSpeciality, fetchDoctorDetails };