import React from 'react';
import Routes from '../routes/Index';

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        {Routes}
      </div>
    </div>
  </div>
);
