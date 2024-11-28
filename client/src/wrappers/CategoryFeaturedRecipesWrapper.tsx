import { Swiper, SwiperSlide } from "swiper/react";
import FeatureRecipeCard from "../components/FeatureRecipeCard";
import { useEffect, useState } from "react";
import { Category } from "../types/type";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CategoryFeaturedRecipesWrapper() {

  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/category/${slug}`)
      .then(response => {
        setCategory(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [slug])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error Loading: {error} </p>
  }

  if (!category) {
    return <p>Category not FOund</p>
  }

  return (
    <section id="MadeByPeople" className="mt-[30px]">
      <div className="flex items-center justify-between px-5">
        <h2 className="font-bold">Made by People</h2>
      </div>

      <div className="swiper w-full mt-3">
        <Swiper
          className="w-full mt-3"
          direction="horizontal"
          spaceBetween={16}
          slidesPerView="auto"
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}>

          {category.recipes.length > 0 ? (
            category.recipes.map((recipe) => (
              <SwiperSlide key={recipe.id} className="!w-fit">
                <FeatureRecipeCard recipe={recipe} />
              </SwiperSlide>
            ))) : (<p>Recipe not found from this category </p>)
          }
        </Swiper>
      </div>
    </section>
  );
}