import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {
  getstudents,
  getcompanies,
  getnotification,
  sendnotification,
  sendnotificationtoall,
  deletenotification
} from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";

class SendNotification extends Component {
  state = {
    message: "",
    errors: {},
    userid: null
  };
  componentDidMount() {
    this.props.getstudents();
    this.props.getcompanies();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onClick = (e, id) => {
    e.preventDefault();
    this.setState({ userid: id });
    this.props.getnotification(id);
  };

  onSubmit = (e, id, message) => {
    e.preventDefault();
    this.props.sendnotification(id, message);
    this.setState({ message: "" });
  };

  sendMessageToAll = (e, message, history) => {
    e.preventDefault();
    this.props.sendnotificationtoall(message, history);
    this.setState({ message: "" });
  };

  onDeleteMessage = (e, id, message) => {
    e.preventDefault();
    this.props.deletenotification(id, message);
    console.log(id, message);
  };

  render() {
    const {
      allstudents,
      allcompanies,
      loading,
      notifications
    } = this.props.profile;

    let studentdata;
    let companydata;
    let allnotification = <p>No Notifications Found</p>;

    const { errors, userid, message } = this.state;

    // students

    if (allstudents == null) {
      studentdata = "No Students Found";
    } else {
      studentdata = (
        <ul
          className="list-group"
          className="list-group"
          style={{ color: "blue", cursor: "pointer" }}
        >
          {allstudents.map(student => (
            <li
              onClick={e => this.onClick(e, student.user)}
              className="list-group-item"
            >
              {student.name}
            </li>
          ))}
        </ul>
      );
    }

    // companies

    if (allcompanies == null) {
      companydata = "No Students Found";
    } else {
      companydata = (
        <ul className="list-group" style={{ color: "blue", cursor: "pointer" }}>
          {allcompanies.map(company => (
            <li
              onClick={e => this.onClick(e, company.user)}
              className="list-group-item"
            >
              {company.companyname}
            </li>
          ))}
        </ul>
      );
    }

    // allnotification

    if (loading) {
      allnotification = <Spinner />;
      if (notifications !== null && notifications === "No Notification Found") {
        allnotification = "No Notification Found";
      }
    } else {
      allnotification = (
        <ul
          className="list-group"
          style={{ overflowY: "auto", height: "380px" }}
        >
          {notifications &&
            notifications.message &&
            notifications.message.length !== 0 &&
            notifications.message.map(notification => (
              <li className="list-group-item clearfix">
                {notification}
                <span class="float-right button-group">
                  <button
                    type="button"
                    onClick={e => {
                      this.onDeleteMessage(
                        e,
                        notifications.user,
                        notifications.message.indexOf(notification)
                      );
                    }}
                    class="btn btn-danger btn-sm "
                  >
                    <i class="fa fa-trash-alt" aria-hidden="true" /> Delete
                  </button>
                </span>
              </li>
            ))}
        </ul>
      );
    }

    return (
      <div className="container">
        <Link
          to="/dashboard"
          className="btn btn-light"
          style={{ marginBottom: "30px" }}
        >
          Go Back
        </Link>
        <div className="row">
          <div className="col-md-3 col-md-offset-1">
            <div>
              <h3 className=" text-muted">Company</h3>
              {companydata}
            </div>
            <div>
              <br />
              <h3 className=" text-muted">Student</h3>
              {studentdata}
              <input
                type="submit"
                value="Send Notification To All"
                disabled={message.length === 0}
                className="btn btn-danger btn-block mt-4"
                onClick={e => {
                  this.sendMessageToAll(e, message, this.props.history);
                }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="chat">
              <div>
                <h3 className=" text-muted">All Notification</h3>
                {allnotification}
              </div>
              <form
                onSubmit={e => {
                  this.onSubmit(e, userid, message);
                }}
                style={{ marginBottom: "15px" }}
              >
                <label style={{ marginTop: "20px" }} htmlFor="message">
                  <h4 className=" text-muted">Enter Notification</h4>
                </label>

                <TextAreaFieldGroup
                  name="message"
                  value={this.state.message}
                  onChange={this.onChange}
                />

                <input
                  type="submit"
                  value="Send Notification"
                  disabled={message.length === 0}
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SendNotification.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getstudents: PropTypes.func.isRequired,
  getcompanies: PropTypes.func.isRequired,
  getnotification: PropTypes.func.isRequired,
  sendnotification: PropTypes.func.isRequired,
  sendnotificationtoall: PropTypes.func.isRequired,
  deletenotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getstudents,
    getcompanies,
    getnotification,
    sendnotification,
    sendnotificationtoall,
    deletenotification
  }
)(withRouter(SendNotification));
