import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const [userName, setUserName] = useState();

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleLogin = () => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName }),
    }).then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
      .then((response) => history.push(`/user/${response.id}`))
      .catch((error) => console.error(error.message));
  };

  return (
    <>
      <h1 className="display-4">Mes recettes</h1>
      <p className="lead">
        Besoin de cuisiner, pas le temps de faire les courses ?
      </p>
      <p className="lead">
        Dites-nous ce que vous avez et nous proposerons une recette !
      </p>
      <hr />
      <div className="d-flex flex-column">
        Entrez votre nom d'utilisateur:
        <input onChange={handleUserName} />
        <button type="button" onClick={handleLogin}>S'enregistrer</button>
      </div>
    </>
  );
};

export default Home;
