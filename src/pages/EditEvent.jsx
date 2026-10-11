import { useContext, useState } from "react";  // the page needs to access EventContext and AuthContext, state stores the form data
import { useNavigate, useParams } from "react-router-dom";  // params reads the values/ id's from the url
import { EventContext } from "../contexts/EventContext";
import ProtectedMessage from "../components/ProtectedMessage";
import "../CSS/EditEvent.css";
import { AuthContext } from "../contexts/AuthContext";

function EditEvent() {
  const { id } = useParams();   // gets the id from the url as a string
  const navigate = useNavigate();   // gets used after the event has updated
  const { user } = useContext(AuthContext);

  if (!user) {
    return <ProtectedMessage />;
  }

  const { events, editEvent } = useContext(EventContext);  

  const eventToEdit = events.find((event) => event.id === Number(id));  // searches through the events array, finds the one with the matching id- converts string to number

  const [formData, setFormData] = useState({   // creates the state
    eventName: eventToEdit.eventName,
    date: eventToEdit.date,
    time: eventToEdit.time,
    description: eventToEdit.description,
    location: eventToEdit.location,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,   // copies existing values
      [event.target.name]: event.target.value,  // updates the property in formData
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();   // stops the browser refreshing

    editEvent({
      ...eventToEdit,  // combines the original event with the updated form values
      ...formData,
    });

    navigate("/dashboard");   // return to the dashboard when completed
  };

  return (
    <div className="event-form-container">
      <h1>Edit Event</h1>

      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
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
          value={formData.location}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;
