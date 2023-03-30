import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../redux/filter/selectors";
import { setCategoryId } from '../redux/filter/slice';

const Categories: React.FC = React.memo(
  () => {

  const dispatch = useDispatch();

  const categories = ["Все", "Мясные", "Вегитарианские", "Гриль", "Острые", "Закрытые"];

  const categoryId = useSelector(selectCategory)

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
            className={categoryId === index ? "active" : ""}
            onClick={() => onChangeCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )}
)

export default Categories;

