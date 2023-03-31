import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const FullPizza: React.FC = () => {
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const {id} = useParams();

  React.useEffect(() => {

    async function fetchPizza() {
      try {
        const {data} = await axios.get("https://635917c1ff3d7bddb998b12a.mockapi.io/items/" + id);
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchPizza();

  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className='container'>
      <div className='single_pizza'>
        <div className='single_pizza_image'>
          <img src={pizza.imageUrl}/>
        </div>
        <div className='single_pizza_info'>
          <h2>{pizza.title} {pizza.price} ₽</h2>
        </div>
        <Link to="/">
          <button className='button button--outline button--add'>
            Назад
          </button>
        </Link>
      </div>
    </div>
  )

}

export default FullPizza;
