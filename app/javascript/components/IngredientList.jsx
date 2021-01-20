import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DELETE, GET, POST } from '../utils/httpMethods';
import RecipeList from './RecipeList';
import handleEnter from '../utils/handleEnter';

const IngredientList = ({ userId }) => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const childRef = useRef();

  const fetchIngredients = async () => {
    const response = await GET(`/api/user-ingredient/index/${userId}`);
    if (response) {
      setIngredients(response);
    }
  };

  const addIngredient = async () => {
    const response = await POST('/api/user-ingredient/create', {
      user_id: userId,
      name,
    });
    if (response) {
      setIngredients([...ingredients, response]);
      setName('');
      childRef.current.reload();
    }
  };

  const deleteIngredient = async (id) => {
    const response = await DELETE(`/api/user-ingredient/destroy/${id}`);
    if (response) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== response.id));
      childRef.current.reload();
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="mt-1">
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
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          onKeyDown={handleEnter(addIngredient)}
        />
        <button type="button" onClick={addIngredient}>Ajouter</button>
      </div>
      <RecipeList userId={userId} ref={childRef} />
    </div>
  );
};

IngredientList.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default IngredientList;
