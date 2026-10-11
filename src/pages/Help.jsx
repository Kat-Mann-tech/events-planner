// decided users don't need to be logged in to read the help page

import "../CSS/Help.css";

function Help() {
  return (
    <div className="help-container">
      <h1>Help</h1>

      <div className="help-card">
        <h2>Getting Started</h2>
        <p>
          Create an account using the Register page and then log in to access
          your personal dashboard.
        </p>
      </div>

      <div className="help-card">
        <h2>Creating an Account</h2>
        <p>
          Enter your name, email address, username and password. All fields are
          required and your email address must be valid.
        </p>
      </div>

      <div className="help-card">
        <h2>Adding an Event</h2>
        <p>
          Select Add Event from the navigation menu and complete the event
          details including the event name, date, time, location and
          description.
        </p>
      </div>

      <div className="help-card">
        <h2>Editing an Event</h2>
        <p>
          Select the Edit Event button on any event card to update the event
          details.
        </p>
      </div>

      <div className="help-card">
        <h2>Deleting an Event</h2>
        <p>
          Select the Delete Event button to permanently remove an event from
          your planner.
        </p>
      </div>

      <div className="help-card">
        <h2>Organising Your Events</h2>
        <ul>
          <li>Keep event descriptions clear and concise.</li>
          <li>Check event dates and times before saving.</li>
          <li>Review upcoming events regularly to stay organised.</li>
        </ul>
      </div>
    </div>
  );
}

export default Help;
