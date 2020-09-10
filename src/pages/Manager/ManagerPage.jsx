// Страница "Заказы" (стартовая).
import React, { useState } from "react";

import MainWrapper from "../MainWrapper";
import Filters from "./Filters";
import OrderTable from "./OrderTable";
import Pagination from "./Pagination";
import useDatabase from "../../database/useDatabase";

import OrderManagerPage from "../OrderManager/OrderManagerPage";

import { useHistory } from "react-router-dom";

export default function ManagerPage({ page }) {
  const history = useHistory()
  const { getOrders } = useDatabase();

  const [filtredOrders, setFiltredOrders] = useState(getOrders());

  const handlerFilter = (filters) => {
    console.log(filters);
  };

  const handlerEdit = (orderId) => {
    history.push(`/order/${orderId}`)
  };

  let output = null

  switch (page) {
    case 'order':
      // output = 'Редактирование заказа'
      output = <OrderManagerPage />
      break;
  
    default:
      output = 
        <main
          role="main"
          className="col-md-9 ml-sm-auto col-lg-10 px-4 d-flex flex-column"
        >
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Заказы</h1>
          </div>

          <Filters onFilter={handlerFilter} />
          <OrderTable onEdit={handlerEdit} orders={filtredOrders} />
          <Pagination />
        </main>
      break;
  }

  return (
    <MainWrapper>
      {output}
    </MainWrapper>
  );
}

// Сделать чтобы при клике на "Редактировать мы попадали на форму редактирования".
// Ориентироваться по id в адресной строке.
// В функции handlerEdit компонента ManagerPage.

// /order/1/edit

// Фильтрация, пагинация, редактирование заполнить.
