import React from 'react';
import TrainingItem from './TrainingItem';
import moment from 'moment';

export default function StepsTable(props) {
  const { items, onRemove: handleRemove, onModify: handleModify } = props;
  
  return (
    <table className="Steps-table">
        <thead className="table-head">
          <tr>
            <td>Дата (ДД.ММ.ГГГГ)</td>
            <td>Пройдено, км</td>
            <td>Действия</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {items
            .sort((a, b) => moment(b.date, ["DD.MM.YYYY", "DD-MM-YYYY", "D.MM.YYYY"]).unix() - moment(a.date, ["DD.MM.YYYY", "DD-MM-YYYY", "D.MM.YYYY"]).unix())
            .map(item => <TrainingItem key={item.id} item={item} onRemove={handleRemove} onModify={handleModify}/>)
          }
        </tbody>
      </table>
  )
}