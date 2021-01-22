import React, {
  useState, useEffect,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GET } from '../utils/httpMethods';
import { useAuthentication } from '../hooks/useAuthentication';

const RecipeList = () => {
  const [userIngredients, setIngredients] = useState([]);
  const [recipeList, setRecipeList] = useState();
  const [totalResults, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 20;
  const [offset, setOffset] = useState(0);

  const { user } = useAuthentication();
  const history = useHistory();

  const fetchIngredients = async () => {
    const response = await GET(`/api/user-ingredient/index/${user.id}`);
    if (response) {
      setIngredients(response);
    }
  };

  const sortRecipes = (a, b) => {
    if (a.matching_ingredients.length === b.matching_ingredients.length) {
      return 0;
    }
    return a.matching_ingredients.length < b.matching_ingredients.length ? 1 : -1;
  };

  const fetchAvailableRecipes = async () => {
    setLoading(true);
    const { recipes, total } = await GET(`/api/recipe/index/${user.id}?limit=${limit}&offset=${offset}`);
    if (total > 0) {
      setTotal(total);
      setRecipeList(recipes.sort(sortRecipes));
    }
    setLoading(false);
  };

  useEffect(async () => {
    fetchAvailableRecipes({ offset, limit });
  }, [offset, limit]);

  useEffect(async () => {
    if (!user) {
      history.push('/');
    }
    fetchIngredients();
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
    <>
      <Link to={`/user/${user.id}`}>Retourner sur mon profil</Link>
      <table className="table mt-1" data-pagination="true">
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
            <tr key={`recipe-${id}`} onClick={() => history.push(`/recipe/${recipe.id}`)}>
              <td>{recipe.name}</td>
              <td>{recipe.total_time}</td>
              <td>
                {recipe.ingredients
                  .map((ingredient) => (userIngredients.some((ui) => (ingredient.name.includes(ui.name.toLowerCase())))
                    ? <strong key={ingredient.id}>{`${ingredient.name}, `}</strong>
                    : <span key={ingredient.id}>{`${ingredient.name}, `}</span>))}
              </td>
              <td>{recipe.rate}</td>
              <td>{recipe.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="recipes navigation">
        <ul className="pagination">
          <li key="prev" className="page-item">
            <button
              className="page-link"
              type="button"
              disabled={offset <= 0}
              onClick={() => setOffset(offset - limit)}
            >
              Précédent
            </button>
          </li>
          <li key="next" className="page-item">
            <button
              className="page-link"
              disabled={offset >= totalResults - limit}
              type="button"
              onClick={() => setOffset(offset + limit)}
            >
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default RecipeList;
