import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthenticationContext = createContext(null);

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export const useAuthentication = () => useContext(AuthenticationContext);
