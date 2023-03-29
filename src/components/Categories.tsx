import { useSelector, useDispatch } from "react-redux";
import { selectCategory, setCategoryId } from '../redux/slices/filterSlice';

const Categories: React.FC = () => {

  const dispatch = useDispatch();

  const categories = ["Все", "Мясные", "Вегитарианские", "Гриль", "Острые", "Закрытые"];

  const categoryId = useSelector(selectCategory)

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

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
  )

}

export default Categories;

