import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const User = ({ match: { params: { id } } }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    if (!id) {
      history.push('/');
    } else {
      fetch(`/api/user/show/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((response) => {
          setUser(response);
        })
        .catch((error) => console.error(error.message));
    }
  }, []);

  if (!user) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Chargement...</span>
      </div>
    );
  }

  return (
    <div>
      {`Bienvenue ${user.name}`}
    </div>
  );
};

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default User;
