import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";
import { AuthContext } from "../contexts/AuthContext";
import "../CSS/AddEvent.css";
import ProtectedMessage from "../components/ProtectedMessage";

function AddEvent() {
  const navigate = useNavigate();

  const { addEvent } = useContext(EventContext);  // gets the function that adds events to the EventContext
  const { user } = useContext(AuthContext);  // gets the logged in user so events can be linked to that person

  if (!user) {  // if they're not a user/ logged in get the protected message
    return <ProtectedMessage />;
  }

  //event object- stores everything entered into the form- starts as empty
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    description: "",
    location: "",
  });

  // runs every time the user types or changes a form field
  const handleChange = (event) => {   // (event) contains info about the field being changed
    setFormData({   //updates the form state
      ...formData,  // copies all existing form values- without this, every field would reset when typing
      [event.target.name]: event.target.value,  // updates only the field currently being edited
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();   // when the user clicks on save event, this stops the browser refreshing

    const newEvent = {
      id: Date.now(),  // uses a time stamp as an identifier
      userId: user.username,  // links the event to the user
      ...formData,  // adds all the entered form values
    };

    addEvent(newEvent);  // send the new event to event context

    navigate("/dashboard");  // redirects to the dashboard after saving
  };

  return (
    <div className="event-form-container">

      <h1>Add Event</h1>

      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={formData.eventName}  // comes from state
          onChange={handleChange}  //updates state
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Save Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
