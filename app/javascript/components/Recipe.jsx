import React, {
  useState, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GET } from '../utils/httpMethods';

const Recipe = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState();

  useEffect(async () => {
    const response = await GET(`/api/recipe/show/${id}`);
    setRecipe(response);
  }, []);

  if (!recipe) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Chargement...</span>
      </div>
    );
  }

  return (
    <>
      <Link to="/recipes">Retour aux résultats</Link>
      <h3>{recipe.name}</h3>
      {recipe.image && <img src={recipe.image} alt="recipe" />}
      <div>
        <strong>Auteur: </strong>
        <span>{recipe.author}</span>
      </div>
      <div>
        <strong>Note: </strong>
        <span>{recipe.rate}</span>
      </div>
      <div>
        <strong>Difficulté: </strong>
        <span>{recipe.difficulty}</span>
      </div>
      <div>
        <strong>Nombre de personnes: </strong>
        <span>{recipe.people_quantity}</span>
      </div>
      <div>
        <strong>Temps de préparation: </strong>
        <span>{recipe.prep_time}</span>
      </div>
      <div>
        <strong>Temps de cuisson: </strong>
        <span>{recipe.cook_time}</span>
      </div>
      <div>
        <strong>Temps total: </strong>
        <span>{recipe.total_time}</span>
      </div>
      <div>
        <strong>Ingredients: </strong>
        <span>{recipe.ingredients?.map((ingredient) => ingredient.name).join(', ')}</span>
      </div>
      <div>
        <strong>Conseil de l'auteur: </strong>
        <span>{recipe.author_tip}</span>
      </div>
    </>
  );
};

Recipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Recipe;
