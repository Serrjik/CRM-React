// Страница "Заказы" (стартовая).
import React, { useState, useContext, useEffect } from "react";

import MainWrapper from "../MainWrapper";
import Filters from "./Filters";
import OrderTable from "./OrderTable";
import Pagination from "./Pagination";
import useDatabase from "../../database/useDatabase";

import OrderManagerPage from "../OrderManager/OrderManagerPage";

import { useHistory } from "react-router-dom";

import Context from "../../database/Context";

export default function ManagerPage({ page }) {
  // Пагинация.
  const [currentPage, setCurrentPage] = useState(1)
  console.log('currentPage: ', currentPage);
  
  const value = useContext(Context);
  // Максимальное количество заказов на странице.
  const limit = value.state.maxOrders

  const history = useHistory()
  const { getOrders } = useDatabase();

  // С какого заказа отображать заказы на выбранной странице.
  const offset = (currentPage - 1) * limit

  const orders = getOrders(0, 20)
  // console.log('orders: ', getOrders(0, 1000));
  const [displayedOrders, setDisplayedOrders] = useState([...orders])
  
  const handlerFilter = filters => {
    let filteredOrders = [...orders]
    // filteredOrders = [...orders]

    // console.log(filters);

    // 0: {type: "name", content: "Тимофей "}
    // 1: {type: "order", content: "Принтер"}
    // 2: {type: "status", content: "Новые"}
    // 3: {type: "minPrice", content: "1"}
    // 4: {type: "maxPrice", content: "5"}
    // 5: {type: "startDate", content: "2020-09-06"}
    // 6: {type: "finalDate", content: "2020-10-01"}

    // date: 1582739937251
    // fullname: "Тимофей Черешников 1"
    // good: "Бумага для принтера"
    // id: 1
    // price: 500
    // status: "process"
    
    console.log('filters: ', filters);

    for (const filter of filters) {
      if (filter.type === 'name') {
        console.log('filter by name fired')

        filteredOrders = filteredOrders.filter(order => order.fullname.toLowerCase().startsWith(filter.content.toLowerCase()))
      }

      if (filter.type === 'order') {
        console.log('filter by order fired')

        filteredOrders = filteredOrders.filter(order => order.good.toLowerCase() === filter.content.toLowerCase())
      }

      if (filter.type === 'status') {
        console.log('filter by status fired')

        filteredOrders = filteredOrders.filter(order => order.status.toLowerCase() === filter.content.toLowerCase())
      }

      if (filter.type === 'minPrice') {
        console.log('filter by minPrice fired')

        filteredOrders = filteredOrders.filter(order => order.price >= filter.content)
      }

      if (filter.type === 'maxPrice') {
        console.log('filter by order maxPrice')

        filteredOrders = filteredOrders.filter(order => order.price <= filter.content)
      }

      if (filter.type === 'startDate') {
        console.log('filter by startDate fired')

        
        filteredOrders = filteredOrders.filter(order => {
          console.log('Date.parse(filter.content): ', Date.parse(filter.content));
          return order.date >= Date.parse(filter.content)
        })
      }

      if (filter.type === 'finalDate') {
        console.log('filter by finalDate fired')

        filteredOrders = filteredOrders.filter(order => Date.parse(order.date) <= filter.content)
      }
    }
    
    console.log('filteredOrders: ', filteredOrders);
    setDisplayedOrders([...filteredOrders])
  };

  const handlerEdit = (orderId) => {
    history.push(`/order/${orderId}`)
  };

  // Количество страниц.
  // const commonPages = Math.ceil(filtredOrders.length / limit)

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
          <OrderTable onEdit={handlerEdit} orders={displayedOrders} />
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} /> {/* commonPages={commonPages} */}
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
