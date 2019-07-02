import axios from "axios";
import { getcurrentprofile } from "./profileActions";

import {
  GET_ERRORS,
  VIEW_JOB,
  JOB_LOADING,
  GET_ALL_JOB,
  ALL_APPLIED_JOBS,
  CLEAR_ALL_JOBS
} from "./types";

// Add job
export const addjob = (newJob, history) => dispatch => {
  axios
    .post("/companies/jobposting", newJob)
    .then(() => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get  Job by id
export const viewjob = id => dispatch => {
  dispatch(setjobloading());
  axios
    .get(`/commons/jobposting/${id}`)
    .then(res =>
      dispatch({
        type: VIEW_JOB,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// delete job by id
export const deletejob = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/commons/jobposting/${id}`)
      .then(res => dispatch(getcurrentprofile()))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

// // admin delete job by id
// export const admindeletejob = (id, history) => dispatch => {
//   if (window.confirm("Are you sure? This can NOT be undone!")) {
//     axios
//       .delete(`/commons/jobposting/${id}`)
//       .then(res => history.push("/getalljobs"))
//       .catch(err => {
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         });
//       });
//   }
// };

// Apply job
export const applyjob = (c_id, j_id) => dispatch => {
  axios
    .post(`/students/applyjob/${c_id}/${j_id}`)
    .then(res => {
      alert("Job Applied Successfully");
    })
    .catch(err => {
      alert("You Have Already Applied To This Job");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// get all jobs
export const getalljobs = () => dispatch => {
  dispatch(setjobloading());
  axios
    .get("/commons/getalljobs")
    .then(res =>
      dispatch({
        type: GET_ALL_JOB,
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

// get all applied jobs
export const getallappliedjobs = () => dispatch => {
  dispatch(setjobloading());
  axios
    .get("/students/allapplyjobsbystudent")
    .then(res =>
      dispatch({
        type: ALL_APPLIED_JOBS,
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

// job loading
export const setjobloading = () => {
  return {
    type: JOB_LOADING
  };
};

// Clear ALL JOBS
export const clearalljobs = () => {
  return {
    type: CLEAR_ALL_JOBS
  };
};
