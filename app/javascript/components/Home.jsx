import React, { useState } from 'react';

const Home = () => {
  const [userName, setUserName] = useState();

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleLogin = () => {
    console.log(userName);
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
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
        </div>
      </div>
    </div>
  );
};

export default Home;
