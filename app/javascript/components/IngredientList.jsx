import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DELETE, GET, POST } from '../utils/httpMethods';

const IngredientList = ({ userId }) => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');

  const fetchIngredients = async () => {
    const response = await GET(`/api/ingredient/index/${userId}`);
    if (response) {
      setIngredients(response);
    }
  };

  const addIngredient = async () => {
    const response = await POST('/api/ingredient/create', {
      user_id: userId,
      name,
    });
    if (response) {
      setIngredients([...ingredients, response]);
      setName('');
    }
  };

  const deleteIngredient = async (id) => {
    const response = await DELETE(`/api/ingredient/destroy/${id}`);
    if (response) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== response.id));
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <>
      <div>Ma liste :</div>
      <div>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            {ingredient.name}
            <button type="button" onClick={() => deleteIngredient(ingredient.id)}>Effacer</button>
          </div>
        ))}
      </div>
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        <button type="button" onClick={addIngredient}>Ajouter</button>
      </div>
    </>
  );
};

IngredientList.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default IngredientList;
