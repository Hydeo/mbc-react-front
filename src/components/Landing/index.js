import React from 'react';

const LandingPage = () =>
  <div>
    <h1>Landing</h1>
    <p>The Landing Page is open to everyone, even though the user isn't signed in  {process.env.URL_BACKEND}.</p>
  </div>

export default LandingPage;
