import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { POST } from '../utils/httpMethods';
import handleEnter from '../utils/handleEnter';

const Home = () => {
  const history = useHistory();
  const [userName, setUserName] = useState();

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleLogin = async () => {
    const user = await POST('/api/user/create', { name: userName });
    history.push(`/user/${user.id}`);
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
        <input onChange={handleUserName} onKeyDown={handleEnter(handleLogin)} />
        <button type="button" onClick={handleLogin}>S'enregistrer</button>
      </div>
    </>
  );
};

export default Home;
