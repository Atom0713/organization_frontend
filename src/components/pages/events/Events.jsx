import React, { useState, useEffect } from 'react';
import AddEvent from '../../forms/AddEvent';
import { fetchEvents } from '../../../api/events';
import { OrderedDarkWithImageTable } from '../../tables';
import { BlueButton } from '../../buttons';
import Event from '../event/Event';

export default function Events({userRole}) {
    // TODO: 
    // 1. Fetch events (paginate)
    // 2. Save new event (send all users notification: make it an option?)
    const [showAddEventForm, setShowAddEventForm] = useState(false);

    // data fetch on page loading
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [state, setState] = useState({});

    useEffect(() => {
        fetchEvents()
        .then(response =>
            {
                setState(response)
                setIsLoading(false)
            }
        )
        .catch(error => setError(error.message));
    }, [])

    const handleAddEventClick = () => {
        setShowAddEventForm(true);
    }

    if (error) return (
        <div>
            <h1>{error}</h1>
        </div>
    )


    if (isLoading) return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
    
    if (showAddEventForm) return (
        <AddEvent setShowAddEventForm={setShowAddEventForm}/>
    )

    return (
        <>
            {['admin', 'staff'].includes(userRole) && !showAddEventForm ? 
                BlueButton(handleAddEventClick, "Add event")
                : null
            }
            {state.events && <OrderedDarkWithImageTable
                title={'Events'}
                headers={['Name', 'Date', 'Description']}
                order={['name', 'date', 'description']}
                data={state.events}
                link={true}
                url={"/event"}
                component={Event}/>
            }
        </>
    )
}
