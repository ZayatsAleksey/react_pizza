import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from '../redux/store';
import { PizzaBlock, Categories, Sort, Pagination, Skeleton } from "../components";
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const {categoryId, sort, searchValue ,currentPage} = useSelector(selectFilter);

  const {items, status} = useSelector(selectPizzaData);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => (
      <PizzaBlock key={obj.id} {...obj}/>
    ));

  const getPizzas = async () => {

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        currentPage: String(currentPage),
      })
    )

  }

  React.useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Пиццы:</h2>
      {
        status === "error"
        ? <div className='content__error-info'>
            <h2>Произошла ошибка 😕</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
          </div>
        : <div className="content__items">
            {status === "loading"
              ? skeletons
              : pizzas
            }
          </div>
      }
      <Pagination/>
    </div>
  )

}

export default Home;

