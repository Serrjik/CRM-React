import React, { useState, useEffect } from "react";

export default function Filters(props) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const filters = []

    if (userName) {
      filters.push({
        type: 'name',
        content: userName
      })
    }

    props.onFilter(filters)
  }, [props.onFilter, userName])

  return (
    <div className="form-row p-2">
      <div className="form-group col">
        <label>ФИО:</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="form-control"
          type="text"
          placeholder="ФИО"
        />
      </div>
      <div className="form-group col">
        <label>Заказ:</label>
        <select className="form-control">
          <option></option>
          <option></option>
        </select>
      </div>
      <div className="form-group col">
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
        <input className="form-control" type="number" placeholder="От" />
        <input className="form-control" type="number" placeholder="До" />
      </div>
      <div className="form-group col">
        <label>Дата:</label>
        <input className="form-control" type="date" />
        <input className="form-control" type="date" />
      </div>
    </div>
  );
}
