import React, {
  useState, useEffect, forwardRef, useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { GET } from '../utils/httpMethods';

const RecipeList = forwardRef(({ userId }, ref) => {
  const [recipeList, setRecipeList] = useState();
  const [loading, setLoading] = useState(false);

  const sortRecipes = (a, b) => {
    if (a.matching_ingredients.length === b.matching_ingredients.length) {
      return 0;
    }
    return a.matching_ingredients.length < b.matching_ingredients.length ? 1 : -1;
  };

  const fetchAvailableRecipes = async () => {
    setLoading(true);
    const recipes = await GET(`/api/recipe/index/${userId}`);
    if (recipes) {
      setRecipeList(recipes.sort(sortRecipes));
    }
    setLoading(false);
  };

  useImperativeHandle(ref, () => ({
    reload() {
      fetchAvailableRecipes();
    },
  }));

  useEffect(async () => {
    fetchAvailableRecipes();
  }, []);

  if (loading || !recipeList) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Chargement...</span>
      </div>
    );
  }

  if (recipeList && recipeList.length === 0) {
    return (
      <div>
        Aucun résultat
      </div>
    );
  }

  return (
    <table className="table mt-1">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Temps</th>
          <th scope="col">Ingrédients</th>
          <th scope="col">Note</th>
          <th scope="col">Auteur</th>
        </tr>
      </thead>
      <tbody>
        {recipeList.map((recipe, id) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <tr key={`recipe-${id}`}>
            <td>{recipe.name}</td>
            <td>{recipe.total_time}</td>
            <td>{recipe.ingredients.join(', ')}</td>
            <td>{recipe.rate}</td>
            <td>{recipe.author}</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
});

RecipeList.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default RecipeList;
