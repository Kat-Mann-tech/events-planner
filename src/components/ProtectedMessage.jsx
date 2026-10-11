import { Link } from "react-router-dom";


// instead of writing 'please log in' created a reusable component that can be 
// used when the user isn't logged in- displays the message and the log in link

function ProtectedMessage() {
  return (
    <div>
      <h1>Please log in</h1>

      <p>You need to be logged in to access this page.</p>

      <Link to="/">Go to Login</Link>
    </div>
  );
}

export default ProtectedMessage;
