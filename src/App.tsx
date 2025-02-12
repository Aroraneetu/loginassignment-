import React, { useState, FormEvent } from "react";
import "./style.css";

type ErrorMessages = {
  name: string;
  message: string;
};

const App: React.FC = () => {
  const [errorMessages, setErrorMessages] = useState<Partial<ErrorMessages>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<String>();

  // hard-coded credentials
  const database = [
    {
      username: "janis",
      password: "janis123"
    }
  ];

  const errors = {
    uname: "Invalid username",
    pass: "Invalid password"
  };

  const handleSubmit = (event: FormEvent) => {
    // Prevent page reload
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const uname = form.uname.value;
    const pass = form.pass.value;

    // Find user login info
    const userData = database.find((user) => user.username === uname);

    if (userData) {
      if (userData.password !== pass) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setLoggedUser(userData.username)
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname});
    }
  };

  //  JSX code for error message   
  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="main">
      <div className="form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
         {/* Add note about valid username and password */}
          {!isSubmitted && <div className="note">
            <p><strong>Note:</strong> Use the following credentials to login:</p>
            <ul>
              <li>Username: <code>janis</code>, Password: <code>janis123</code></li>
            </ul>
          </div>}
      </div>
    </div>
  );
  
};

export default App;
