import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { EventContext } from "../contexts/EventContext";
import "../CSS/Dashboard.css";
import { useNavigate } from "react-router-dom";
import ProtectedMessage from "../components/ProtectedMessage";

function Dashboard() {
  const { user } = useContext(AuthContext);  // gets logged in user info
  const { events, deleteEvent } = useContext(EventContext);   // gets the EventContext
  const navigate = useNavigate();  // allows to move between pages- used by Edit button

  if (!user) {   // if not logged in use ProtectedMessage
    return <ProtectedMessage />;
  }

  const userEvents = events.filter((event) => event.userId === user.username);  // filters the events in local storage so the Dashboard only displays events belonging to the current user- otherwise every user would see everyones events

  const today = new Date().toISOString().split("T")[0];   // toISOString() converts to ISO format- the 'T' separates the time and date- [0] takes the first item so holds todays date

  const todayEvents = userEvents.filter((event) => event.date === today);  // holds only todays events

  const sortedTodayEvents = [...todayEvents].sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`),  // converts to date and time template literals- then date A - date B- if the result is negative then A comes first- basically sorts so the earliest event appears first
  );

  const upcomingEvents = userEvents.filter((event) => event.date > today);  // filters after today

  const sortedUpcomingEvents = [...upcomingEvents].sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`),
  );

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <h2>Welcome, {user.name}</h2>

      <p>
        You have {todayEvents.length} event(s) today and {upcomingEvents.length}{" "}  
        upcoming event(s).   {/* counts the events to display */}
      </p>

      <h2>Today's Events</h2>

      {todayEvents.length === 0 ? (    // displays if no events today
        <p>No events today.</p>
      ) : (
        sortedTodayEvents.map((event) => (  //loops through every item in an array and return something for each one
          <div key={event.id} className="event-card">
            <h3>{event.eventName}</h3>

            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>

            <button
              className="edit-button"
              onClick={() => navigate(`/edit-event/${event.id}`)}  //takes the user to the Edit Event page for that event using the id
            >
              Edit Event
            </button>

            <button
              className="delete-button"
              onClick={() => deleteEvent(event.id)}  // deletes the event using the event id
            >
              Delete Event
            </button>
          </div>
        ))
      )}

      <h2>Upcoming Events</h2>

      {upcomingEvents.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        sortedUpcomingEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.eventName}</h3>

            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>

            <button
              className="edit-button"
              onClick={() => navigate(`/edit-event/${event.id}`)}
            >
              Edit Event
            </button>

            <button
              className="delete-button"
              onClick={() => deleteEvent(event.id)}
            >
              Delete Event
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
