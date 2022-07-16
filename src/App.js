import './App.css';
import "@aws-amplify/ui-react/styles.css";
import React, { useState, useEffect } from "react";
import Amplify, { Auth, Hub } from 'aws-amplify';
import config from './aws-exports';

import Header from './Header';

import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

Amplify.configure(config);

function App() {
  const [user ,setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log(event)
          console.log(data)
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }



  return (
    <div className="App">
      {/* <div> */}
      {user ? (

    
        <div>

          <Header />

          <p>This is what I see when signed in</p>
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        </div>


      ) : (
        
        <div>
          <h1>Please sign in to view the dashboard</h1>
          <button onClick={() => Auth.federatedSignIn({customProvider: "AmazonFederate"})}>Signin With Midway</button>
        </div>
      )}
    {/* </div> */}
    
    </div>
  );
}

export default App;


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1>Hello from V2</h1>
//       </header>
//     </div>
//   );
// }

// export default App;