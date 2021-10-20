import { nanoid } from "nanoid";
import React, { useState } from "react";
import TrainingModel from "../models/TrainingModel";
import TrainingsList from "./TrainingsList";
import moment from 'moment';
import TrainingAddForm from "./TrainingAddForm";

export default function Steps() {
  const [trainingList, setList] = useState([]);
  const [form, setForm] = useState({date: '', distance: '', id: ''});

  const handleSubmit = event => {
    event.preventDefault();

    if (moment(form.date, ["DD.MM.YYYY", "DD-MM-YYYY", "D.MM.YYYY"], true).isValid() && form.distance > 0) {
      if (trainingList.some(item => item.id === form.id)) {
        setList(trainingList.map(item => {
          if (item.id === form.id) {
            return {
              ...item,
              date: form.date,
              distance: form.distance
            }
          }
          return item;
        }))
      } else if (trainingList.some(item => item.date === moment(form.date,"DD-MM-YYYY").format("DD-MM-YYYY"))) {
        const newArr = trainingList.map(item => {
          if (item.date === moment(form.date,"DD-MM-YYYY").format("DD-MM-YYYY")) {
            return {
              ...item,
              distance: +item.distance + +form.distance
            }
          }
          return item;
        });
        setList(newArr);
      } else {
        setList(prevList => ([...prevList, new TrainingModel(nanoid(), moment(form.date,"DD-MM-YYYY").format("DD-MM-YYYY"), form.distance)]));
      }
      
      setForm(prevForm => ({prevForm, date: '', distance: '', id: ''}));
    }
  }

  const handleChange = evt => {
    const {name, value} = evt.target;
    setForm(prevForm => ({...prevForm, [name]: value}));
  }

  const handleRemove = id => {
    setList(trainingList.filter(item => item.id !== id));
  }

  const handleModify = id => {
    const modifyElement = trainingList.find(item => item.id === id);
    setForm({date: modifyElement.date, distance: modifyElement.distance, id: modifyElement.id});
  }

  return (
    <div className="Steps">
      <TrainingAddForm
        form={form} 
        onSubmit={handleSubmit} 
        onChange={handleChange}
      />
      {trainingList.length
        ? 
        <TrainingsList 
          items={trainingList} 
          onRemove={handleRemove} 
          onModify={handleModify}/>
        : 
        <span>Нет данных</span>
      }
    </div>
  );
}