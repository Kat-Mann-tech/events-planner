// manages what events exist and how do we manage them

import { createContext, useState } from "react";  // creates context to be shared across components. UseState- whenever events are added, edited or deleted, React updates the state

export const EventContext = createContext();  //components access using useContext(EventContext)

function EventProvider({ children }) {  //everything in side eventprovider can access events, addEvent, editEvent and deleteEvent
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || [],  //looks in local storage for stored events, converts JSON into JS, uses an empty array if there's no events
  );

  const addEvent = (newEvent) => {  // newEvent contains info entered on the form
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents); //updates with the new list
    localStorage.setItem("events", JSON.stringify(updatedEvents)); //updates the local storage
  };

  const deleteEvent = (eventId) => {   //runs when the delete button's clicked
    const updatedEvents = events.filter((event) => event.id !== eventId);   // loops through the events and keeps the events apart from the one with the matching id
    setEvents(updatedEvents);  
    localStorage.setItem("events", JSON.stringify(updatedEvents));  
  };

  const editEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>   // maps through the events
      event.id === updatedEvent.id ? updatedEvent : event,  // is this the event being updated? If the id's match return updated event, otherwise return unchanged
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // creates provider- makes all of these available to anywhere using useContext(EventContext)
  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,
      }}
    >
      {children}  
    </EventContext.Provider>
  );
}

export default EventProvider;
