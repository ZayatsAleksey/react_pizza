import React, {Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";

const Cart = React.lazy(() => import(/* webpackChunkname: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkname: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkname: "NotFound" */ './pages/NotFound'));

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="cart" element={<Suspense fallback={<div>Загрузка...</div>}><Cart/></Suspense>}/>
        <Route path="pizza/:id" element={<Suspense fallback={<div>Загрузка...</div>}><FullPizza/></Suspense>}/>
        <Route path="*" element={<Suspense fallback={<div>Загрузка...</div>}><NotFound/></Suspense>}/>
      </Route>
    </Routes>
  );

}

export default App;
