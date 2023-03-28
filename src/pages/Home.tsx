import React from 'react';
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../Pagination';
import { setFilters, selectFilter } from '../redux/slices/filterSlice';
import { sortList } from "../components/Sort";
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';

const Home: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    // @ts-ignore
    dispatch(fetchPizzas({
      category,
      sortBy,
      order,
      currentPage
    }))

  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {

    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);

    }

    isMounted.current = true;

  }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {

    if (window.location.search) {

      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;

    }
  }, []);

  return (
    <div className='container'>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
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
