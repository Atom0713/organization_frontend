import React, {useState} from 'react';
import {USERTYPE} from '../../constants'

export default function AddUserForm({setShowUserForm}) {
    // toggle add staff/player form
    const [role, setRole] = useState(1);

    //add user form input values
    // common
    const [firtName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [birthDate, setBirthDate] = useState()

    // staff
    const [positions, setPositions] = useState()

    //player
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [position, setPosition] = useState()


    const handleBackClick = () => {
        setShowUserForm(false);
    }

    const handleSubmit = (event) => {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
    const toggleFormChange = (event) => {
        setRole(USERTYPE[event.target.value]);
    }


    const addPlayerFormElements = () => {
        return (
        <>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">First Name</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" />
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Last Name</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" />
            </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Date of Birth</label>
                <div className="col-sm-9">
                    <input className="form-control" placeholder="dd/mm/yyyy" />
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Boy</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" />
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Kilo</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" />
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Mevki</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" />
                </div>
            </div>
        </div>
    </div>
    </>
    )}

    const addStaffFormElements = () => {

        return (
        <>
                <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">First Name</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" />
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Last Name</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" />
            </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Date of Birth</label>
                <div className="col-sm-9">
                    <input className="form-control" placeholder="dd/mm/yyyy" />
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Positions</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" />
                </div>
            </div>
        </div>
    </div>
        </>
    )}


  return (
    <div className="content-wrapper">
        <div className="page-header">
          <button onClick={handleBackClick} type="button" className="btn btn-primary btn-fw">Back</button>
        </div>
        <div className="row">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Role</label>
                                <div className="col-sm-4">
                                    <div className="form-check">
                                        <input onChange={toggleFormChange} className="form-check-input" type="checkbox" value="staff" id="flexCheckDefault" checked={role === USERTYPE["staff"]}/>
                                        <label className="form-check-label" for="flexCheckDefault">
                                            Staff
                                        </label>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="form-check">
                                        <input onChange={toggleFormChange} className="form-check-input" type="checkbox" value="player" id="flexCheckDefault" checked={role === USERTYPE["player"]}/>
                                        <label className="form-check-label" for="flexCheckDefault">
                                            Player
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="form-sample" onSubmit={handleSubmit}>
                        <p className="card-description"> Personal info </p>
                        {role === USERTYPE['player'] ? 
                        addPlayerFormElements():
                        addStaffFormElements()
                        }
                        <button type="submit" className="btn btn-primary btn-icon-text">
                            <i className="mdi mdi-file-check btn-icon-prepend"></i> 
                            Submit 
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}