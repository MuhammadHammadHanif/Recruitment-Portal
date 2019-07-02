import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateJob from "./components/createuserprofile/company/CreateJob";
import JobDetail from "./components/createuserprofile/common/JobDetail";
import AllStudent from "./components/createuserprofile/common/AllStudent";
import StudentProfile from "./components/createuserprofile/common/StudentProfile";
import CompanyProfile from "./components/createuserprofile/common/CompanyProfile";
import GetAllJobs from "./components/createuserprofile/common/GetAllJobs";
import CreateCompanyProfile from "./components/createuserprofile/company/CreateCompanyProfile";
import CreateStudentProfile from "./components/createuserprofile/student/CreateStudentProfile";
import AllCompanies from "./components/createuserprofile/admin/AllCompanies";
import SendNotification from "./components/createuserprofile/admin/SendNotification";
import AddExperience from "./components/createuserprofile/student/AddExperience";
import AddEducation from "./components/createuserprofile/student/AddEducation";
import DeleteExperienceEducation from "./components/createuserprofile/student/DeleteExperienceEducation";
import AllAppliedJobs from "./components/createuserprofile/student/AllAppliedJobs";
import JobAppliedByStudents from "./components/createuserprofile/company/JobAppliedByStudents";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import store from "./store";

import "./App.css";

// check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={Landing} />
          <div className="container">
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/createcompanyprofile"
                component={CreateCompanyProfile}
              />
              <PrivateRoute exact path="/addjob" component={CreateJob} />
              <PrivateRoute exact path="/jobdetail/:id" component={JobDetail} />
              <PrivateRoute exact path="/allstudents" component={AllStudent} />
              <PrivateRoute
                exact
                path="/studentprofile/:id"
                component={StudentProfile}
              />
              <PrivateRoute
                exact
                path="/jobappliedbystudents"
                component={JobAppliedByStudents}
              />
              <PrivateRoute
                exact
                path="/companyprofile/:id"
                component={CompanyProfile}
              />
              <PrivateRoute
                exact
                path="/createstudentprofile"
                component={CreateStudentProfile}
              />
              <PrivateRoute
                exact
                path="/addexperience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/addeducation"
                component={AddEducation}
              />
              <PrivateRoute
                exact
                path="/allappliedjob"
                component={AllAppliedJobs}
              />
              <PrivateRoute
                exact
                path="/deleteexperienceeducation"
                component={DeleteExperienceEducation}
              />
              <PrivateRoute
                exact
                path="/allcompanies"
                component={AllCompanies}
              />
              <PrivateRoute
                exact
                path="/sendnotification"
                component={SendNotification}
              />
              <PrivateRoute exact path="/getalljobs" component={GetAllJobs} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
