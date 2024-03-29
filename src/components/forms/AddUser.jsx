import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../api/user";
import { fetchAllRoles, fetchPositions } from "../../api/";
import { BlueButton } from "../buttons";
import { USERROLES } from "../constants";
import { Layout } from '../';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import './custom_css/DatePicker.css';
import { formatDate } from "../../utils/formatDate";
import { Spinner } from "../spinner";

export default function AddUser({ setShowUserForm, user }) {
  const [role, setRole] = useState(user.role.id);
  const [addUserBody, setAddUserBody] = useState({"role_id": user.role.id});
  const navigate = useNavigate();

  // data fetch on page loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [state, setState] = useState({});
  const [userRoles, setUserRoles] = useState({});
  const [value, onChange] = useState(new Date(946728338000));


  useEffect(() => {
    Promise.all([
      fetchAllRoles(),
      fetchPositions()
    ])
    .then((response) => {
      let roles = response[0].data
      if (user.role.id !== USERROLES.ADMIN){
        roles = roles.filter(function( obj ) {
          return obj.id !== USERROLES.ADMIN;
        });
      }
      setUserRoles(roles);
      setState({
        positions: response[1]
      })
      setAddUserBody(addUserBody)
      setIsLoading(false);
    })
      
  }, [user.role.id]);

  if (error)
    return (
      <div>
        <h1>OOPS!</h1>
      </div>
    );

  if (isLoading)
    return <Spinner />;

  const handleBackClick = () => {
    setShowUserForm(false);
  };
  const handleChange = (event) => {
    let value = event.target.value
    if (event.target.name === "position_id"){
      value = parseInt(value)
    } 
    addUserBody[event.target.name] = value;
    setAddUserBody(addUserBody);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUserBody['dob'] = formatDate(value)
    addUser(addUserBody)
      .then((response) => 
      {
        navigate(`/me/${response.id}`);
      })
      .catch((error) => setError(error.message));
  };

  const toggleFormChange = (event) => {
    setRole(USERROLES[event.target.value]);
    if (!(event.target.value === USERROLES.ADMIN)){
      setAddUserBody({"role_id": USERROLES[event.target.value], "position_id": state.positions[0].id});
    }else {
      setAddUserBody({"role_id": USERROLES[event.target.value]});
    }
  };

  const commonFormElemenets = () => {
    return (
      <>
      <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Fist name *</label>
              <div className="col-sm-9">
                <input
                  name="first_name"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Last name *</label>
              <div className="col-sm-9">
                <input
                  name="last_name"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Email *</label>
              <div className="col-sm-9">
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Date of Birth *</label>
              <div className="col-sm-9">
              <DatePicker
                onChange={onChange}
                value={value}
              />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const selectPosition =() => {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Mevki *</label>
            <div className="col-sm-9">
              <select className="js-example-basic-single" style={{width:"100%"}} onChange={handleChange} name="position_id">
                {state.positions && state.positions.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const addAdminFormElements = () => {
    return commonFormElemenets()
  };

  const addPlayerFormElements = () => {
    return (
      <>
        {commonFormElemenets()}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Boy (cm) *</label>
              <div className="col-sm-9">
                <input
                  name="height"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Kilo (kg) *</label>
              <div className="col-sm-9">
                <input
                  name="weight"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        {selectPosition()}
      </>
    );
  };

  const addStaffFormElements = () => {
    return (
      <>
        {commonFormElemenets()}
        {selectPosition()}
      </>
    );
  };

  return (
    <Layout user={user}>
      {BlueButton(handleBackClick, "Back")}
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-9">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Role</label>
                    {userRoles &&
                      userRoles.map((item) => (
                        <div key={item.id} className="col-sm-3">
                          <div className="form-check">
                            <input
                              onChange={toggleFormChange}
                              className="form-check-input"
                              type="checkbox"
                              value={item.name.toUpperCase()}
                              id="flexCheckDefault"
                              checked={role === item.id}
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              {item.name}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <form className="form-sample" onSubmit={handleSubmit}>
                <p className="card-description"> Personal info </p>
                {role === USERROLES.ADMIN && addAdminFormElements()}
                {role === USERROLES.STAFF && addStaffFormElements()}
                {role === USERROLES.PLAYER && addPlayerFormElements()}
                <button
                  type="submit"
                  className="btn btn-primary btn-icon-text"
                >
                  <i className="mdi mdi-file-check btn-icon-prepend"></i>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
