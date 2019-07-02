import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_STUDENTS,
  VIEW_PROFILE,
  CLEAR_VIEW_PROFILE,
  GET_COMPANIES,
  GET_NOTIFICATION
} from "./types";

// Get current profile
export const getcurrentprofile = () => dispatch => {
  dispatch(setprofileloading());
  axios
    .get("/commons/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get Notification
export const getnotification = id => dispatch => {
  dispatch(setprofileloading());
  axios
    .get(`/commons/getnotification/${id}`)
    .then(res =>
      dispatch({
        type: GET_NOTIFICATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NOTIFICATION,
        payload: null
      })
    );
};

// sEND Notification
export const sendnotification = (id, message) => dispatch => {
  const newMsg = {
    message
  };
  dispatch(setprofileloading());
  axios
    .post(`/admins/sendnotification/${id}`, newMsg)
    .then(res =>
      dispatch({
        type: GET_NOTIFICATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Notification
export const deletenotification = (id, message) => dispatch => {
  dispatch(setprofileloading());
  axios
    .delete(`/admins/deletenotification/${id}/${message}`)
    .then(res =>
      dispatch({
        type: GET_NOTIFICATION,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// sEND Notification to all
export const sendnotificationtoall = (message, history) => dispatch => {
  if (window.confirm("Are you sure? You want to send notification to all!")) {
    const newMsg = {
      message
    };

    axios
      .post(`/admins/sendnotificationtoall`, newMsg)
      .then(res => {
        alert("Succesfully send message to all users");
        history.push("/sendnotification");
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Get all student
export const getstudents = () => dispatch => {
  dispatch(setprofileloading());
  axios
    .get("/commons/allstudentprofile")
    .then(res =>
      dispatch({
        type: GET_STUDENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all companies
export const getcompanies = () => dispatch => {
  dispatch(setprofileloading());
  axios
    .get("/admins/getallcompanies")
    .then(res =>
      dispatch({
        type: GET_COMPANIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get student view profile
export const getstudentviewprofile = id => dispatch => {
  dispatch(setprofileloading());
  axios
    .get(`/commons/studentprofile/${id}`)
    .then(res =>
      dispatch({
        type: VIEW_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get company view profile
export const getcompanyviewprofile = id => dispatch => {
  dispatch(setprofileloading());
  axios
    .get(`/commons/companyprofile/${id}`)
    .then(res =>
      dispatch({
        type: VIEW_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create Company Profile
export const createcompanyprofile = (profile, history) => dispatch => {
  axios
    .post("/companies/profile", profile)
    .then(() => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create student Profile
export const createstudentprofile = (profile, history) => dispatch => {
  axios
    .post("/students/profile", profile)
    .then(() => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addexperience = (expData, history) => dispatch => {
  axios
    .post("/students/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete experience
export const deleteexperience = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    dispatch(setprofileloading());
    axios
      .delete(`/students/experience/${id}`)
      .then(res => dispatch(getcurrentprofile()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// delete education
export const deleteeducation = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/students/education/${id}`)
      .then(res => dispatch(getcurrentprofile()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// delete student by id
export const deletestudent = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    dispatch(setprofileloading());
    axios
      .delete(`/admins/deletestudent/${id}`)
      .then(res => dispatch(getstudents()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// delete company by id
export const deletecompany = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    dispatch(setprofileloading());
    axios
      .delete(`/admins/deletecompany/${id}`)
      .then(res => dispatch(getcompanies()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Add education
export const addeducation = (eduData, history) => dispatch => {
  axios
    .post("/students/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setprofileloading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearcurrentprofile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Clear view Profile
export const clearviewprofile = () => {
  return {
    type: CLEAR_VIEW_PROFILE
  };
};
