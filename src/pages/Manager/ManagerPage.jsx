// Страница "Заказы" (стартовая).
import React, { useState, useContext } from "react";

import MainWrapper from "../MainWrapper";
import Filters from "./Filters";
import OrderTable from "./OrderTable";
import Pagination from "./Pagination";
import useDatabase from "../../database/useDatabase";

import OrderManagerPage from "../OrderManager/OrderManagerPage";

import { useHistory } from "react-router-dom";

import Context from "../../database/Context";

export default function ManagerPage({ page }) {
  const history = useHistory()
  const { getOrders } = useDatabase();

  const [filtredOrders, setFiltredOrders] = useState(getOrders(0, 1000));

  const handlerFilter = filters => {
    // console.log(filters);

// 0: {type: "name", content: "Тимофей "}
// 1: {type: "order", content: "Принтер"}
// 2: {type: "status", content: "Новые"}
// 3: {type: "minPrice", content: "1"}
// 4: {type: "maxPrice", content: "5"}
// 5: {type: "startDate", content: "2020-09-06"}
// 6: {type: "finalDate", content: "2020-10-01"}

    let orders = []
    // const orders = [...filtredOrders]
    // console.log(orders)

// date: 1582739937251
// fullname: "Тимофей Черешников 1"
// good: "Бумага для принтера"
// id: 1
// price: 500
// status: "process"

    for (const filter of filters) {
      if (filter.type === 'name') {
        console.log('filter by name fired')

        orders = filtredOrders.filter(order => {
          return order.fullname.toLowerCase().startsWith(filter.content.toLowerCase())
        })
      }
    }

    // console.log(orders)

    // setFiltredOrders([...orders])
  };

  const handlerEdit = (orderId) => {
    history.push(`/order/${orderId}`)
  };

  // Пагинация.
  const value = useContext(Context);
  // Максимальное количество заказов на странице.
  const maxOrders = value.state.maxOrders
  // Количество страниц.
  const commonPages = Math.ceil(filtredOrders.length / maxOrders)

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
          <Pagination commonPages={commonPages} />
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
