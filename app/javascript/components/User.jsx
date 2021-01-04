import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { GET } from '../utils/httpMethods';
import IngredientList from './IngredientList';

const User = ({ match: { params: { id } } }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(async () => {
    if (!id) {
      history.push('/');
    } else {
      const response = await GET(`/api/user/show/${id}`);
      setUser(response);
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
      <div>
        {`Bienvenue ${user.name}`}
        <button
          type="button"
          onClick={() => history.push('/')}
        >
          Déconnexion
        </button>
      </div>
      <IngredientList userId={user.id} />
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
