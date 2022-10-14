import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEvent } from "../../../api/events";
import { fetchEventComments } from "../../../api/comment";
import { fetchEventAttendance } from "../../../api/attendance";
import { BlueButton } from "../../buttons";
import Attandance from "../../forms/Attandance";
import Comment from "../../forms/Comment";

import { AttendanceOrderedDarkWithImageTable } from "../../tables";

import AphexChart from '../../charts/pieChart';

export default function Event() {
  const { id } = useParams();

  // data fetch on page loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [event, setEvent] = useState({});
  const [comments, setComments] = useState({})
  const [attendance, setAttendance] = useState({})


  const [showAtandanceForm, setShowAttendanceForm] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchEvent(id),
      fetchEventComments(id),
      fetchEventAttendance(id),
    ])
    .then((response) => {
      setEvent(response[0].data);
      setComments(response[1].data);
      setAttendance(response[2].data.attendance);
      
      setIsLoading(false);
    })
    .catch((error) => setError(error.message));
  }, []);

  const handleAddAttendanceClick = () => {
    setShowAttendanceForm(true);
  };

  if (error)
    return (
      <div className="row">
        <h1>{error}</h1>
      </div>
    );

  if (isLoading)
    return (
      <div className="row">
        <h1>Loading...</h1>
      </div>
    );

  if (showAtandanceForm)
    return ( /* Reload page when Attendance returns here*/
      <>
        <Attandance setShowAttendanceForm={setShowAttendanceForm} event_id={id} />
      </>
    );

  const getAttendance = () => {
    let counter = 0;
    for (let i = 0; i <= attendance.length -1 ; i++) {
      if (attendance[i].present) {
          counter++;
      }
    }
      return counter
  };

  const attendanceChart = (
    <>
      <h4 className="card-title">Attendance</h4>
      <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
        <AphexChart total={attendance.length} attended={getAttendance()}
        />
      </div>
    </>
  )

  return (
    <>
      {!event.completed && BlueButton(handleAddAttendanceClick, "Get attandance")}
      <div className="row">
        <div className="col-md-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-md-center text-muted">{event.name}</h4>
              <h4 className="card-title">Description</h4>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <p className="text-muted text-break mb-0">{event.description}</p>
                </div>
              </div>
              <h4 className="card-title">Date</h4>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <p className="text-muted mb-0">{event.date}</p>
                </div>
              </div>
              {event.completed && attendanceChart}
            </div>
          </div>
        </div>
        <div className="col-md-8 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title mb-1">Event comments</h4>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="preview-list">
                    {comments.map((comment, index) => (
                      <div key={index} className={index === comments.length - 1 ? "preview-item" : "preview-item border-bottom"}>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow text-xl-left">
                            <p className="text-break mb-0">
                            {comment.comment}
                            </p>
                          </div>
                          <div className="me-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">
                             Author: {comment.author}
                            </p>
                            <p className="text-muted mb-0">Date: {comment.date} </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comment event_id={id}/>
      {event.completed &&
        <AttendanceOrderedDarkWithImageTable
          title={"Attendance"}
          headers={["Name", "Present", "Absence comment"]}
          data={attendance}
          link={true}
          url={"/me"}
        />
      }
    </>
  );
}
