import { Link, useParams } from "react-router-dom";
import RecipeCardResults from "../components/RecipeCardResults";
import { useEffect, useState } from "react";
import { Category } from "../types/type";
import axios from "axios";

export default function CategoryLatestRecipesWrapper() {

  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/category/${slug}`)
      .then((response) => {
        setCategory(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      })
  }, [slug]);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error Loading: {error}</p>
  }

  if (!category) {
    return <p>Category not found</p>
  }


  return (
    <section id="LatestRecipes" className="px-5 mt-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Latest Recipes</h2>
      </div>
      <div className="flex flex-col gap-[18px] mt-[18px]">
        {category.recipes.length > 0 ? (
          category.recipes.map((recipe) => (
            <Link to={`recipe/${recipe.slug}`} key={recipe.id}>
              <RecipeCardResults  recipe={recipe} />
            </Link>
          ))
        ) : (<p>Belum ada data terkait</p>)}
      </div>
    </section>
  );
}