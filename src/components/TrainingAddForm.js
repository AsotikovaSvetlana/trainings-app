import React, { useState } from "react";
import moment from 'moment';

export default function StepsForm(props) {
  const [error, setError] = useState({dateErr: false, distanceErr: false});
  const { form, onChange, onSubmit } = props;

  const handleBlur = () => {
    setError({dateErr: false, distanceErr: false});

    if (!moment(form.date, ["DD.MM.YYYY", "DD-MM-YYYY", "D.MM.YYYY"], true).isValid()) {
      setError(prevError => ({...prevError, dateErr: true}))
    }
    
    if (!form.distance || form.distance <= 0) {
      setError(prevError => ({...prevError, distanceErr: true}))
    }
  }

  return (
    <form className="Steps-form" onSubmit={(evt) => onSubmit(evt)}>
      <div className="Steps-fields">
        <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
        <input id="date" name="date" type="text" value={form.date} onChange={(evt) => onChange(evt)} onBlur={handleBlur}/>
        {error.dateErr && <span className="error">Укажите дату</span>}
      </div>
      <div className="Steps-fields">
        <label htmlFor="distance">Пройдено, км</label>
        <input id="distance" name="distance" type="number" value={form.distance} onChange={(evt) => onChange(evt)} onBlur={handleBlur}/>
        {error.distanceErr && <span className="error">Укажите расстояние</span>}
      </div>
      <button className="Steps-button" type="submit">Ok</button>
    </form>
  );
}