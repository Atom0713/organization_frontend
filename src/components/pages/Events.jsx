import React, { useState, useEffect } from "react";
import { AddEvent } from "../forms/";
import { fetchEvents, fetchUser } from "../../api/";
import { OrderedDarkWithImageTable } from "../tables";
import { BlueButton } from "../buttons";
import { Event, Layout } from "../";
import { USERROLES } from "../constants";
import { Spinner } from "../spinner";

export default function Events() {
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [state, setState] = useState({});

  useEffect(() => {
    Promise.all([
      fetchUser(),
      fetchEvents()
    ])
    .then((response) => {
      setIsLoading(false);
      setState({
        user: response[0],
        events: response[1]
      });
      })
      .catch((error) => setError(error.message));
  }, []);

  const handleAddEventClick = () => {
    setShowAddEventForm(true);
  };

  if (error)
    return (
      <div className="row">
        <h1>{error}</h1>
      </div>
    );

  if (showAddEventForm)
    return <AddEvent setShowAddEventForm={setShowAddEventForm} user={state.user} />;

  return (
    isLoading ? <Spinner /> :
    <Layout user={state.user}>
      {[USERROLES.ADMIN, USERROLES.STAFF].includes(state.user.role.id) &&
      !showAddEventForm
        ? BlueButton(handleAddEventClick, "Add event")
        : null}
      {state.events && (
        <OrderedDarkWithImageTable
          title={"Events"}
          headers={["Name", "Description", "Location", "Date", "Completed"]}
          order={["name", "description", "location", "date", "completed"]}
          data={state.events}
          link={true}
          url={"/event"}
          component={Event}
        />
      )}
    </Layout>
  );
}
