import React, { useState, useEffect } from "react";

export default function Filters(props) {
  const [userName, setUserName] = useState("");
  const [order, setOrder] = useState("");
  const [status, setStatus] = useState("");
  const [minPrice, setMinPrice] = useState("");

  useEffect(() => {
    const filters = []

    if (userName) {
      filters.push({
        type: 'name',
        content: userName
      })
    }

    if (order) {
      filters.push({
        type: 'order',
        content: order
      })
    }

    if (status) {
      filters.push({
        type: 'status',
        content: status
      })
    }

    if (minPrice) {
      filters.push({
        type: 'minPrice',
        content: minPrice
      })
    }

    props.onFilter(filters)
  }, [props.onFilter, userName, order, status, minPrice])

  return (
    <div className="form-row p-2">
      <div className="form-group col">
        <label>ФИО:</label>
        <input
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="form-control"
          type="text"
          placeholder="ФИО"
        />
      </div>
      <div className="form-group col">
        <label>Заказ:</label>
        <select 
          className="form-control"
          onChange={e => setOrder(e.target.value)}
        >
          <option value="" selected>Все</option>
          <option value="Принтер">Принтер</option>
          <option value="Бумага для принтера">Бумага для принтера</option>
          <option value="Краски для принтера">Краски для принтера</option>
          <option value="Катриджи для принтера">Катриджи для принтера</option>
          <option value="Полимерная ванна">Полимерная ванна</option>
        </select>
      </div>
      <div 
        className="form-group col"
        onChange={e => setStatus(e.target.value)}
      >
        <label>Статус:</label>
        <select className="form-control">
          <option defaultValue>Все</option>
          <option>Новые</option>
          <option>На исполнение</option>
          <option>Возврат</option>
          <option>Заархивированные</option>
        </select>
      </div>
      <div className="form-group col">
        <label>Сумма:</label>
        <input 
          className="form-control" 
          type="number" 
          min="0" 
          placeholder="От" 
          onChange={e => setMinPrice(e.target.value)}
        />
        <input className="form-control" type="number" min="0" placeholder="До" />
      </div>
      <div className="form-group col">
        <label>Дата:</label>
        <input className="form-control" type="date" />
        <input className="form-control" type="date" />
      </div>
    </div>
  );
}
