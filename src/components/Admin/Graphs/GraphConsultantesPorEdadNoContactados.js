import React, { useState, useEffect } from "react";
import { List, Button } from "antd";
import { Bar } from "react-chartjs-2";

export default function GraphbarGenero(props) {
  const { consultants, setReloadConsultants } = props;
  console.log(consultants);
  let de3a12 = [];
  let de12a18 = [];
  let de18a25 = [];
  let de25a35 = [];
  let de35a45 = [];
  let de45a60 = [];
  let de60enAdelante = [];
  for (var dataObj in consultants) {
    console.log(dataObj);
    if (((dataObj.edad > 3) &&(dataObj.edad <12))&& (dataObj.intentos_contacto === 0)) {
      de3a12.push(dataObj.edad);
    }
    if (((dataObj.edad > 12) &&(dataObj.edad < 18))&& (dataObj.intentos_contacto === 0)) {
      de12a18.push(dataObj.edad);
    }
    if (((dataObj.edad > 18) &&(dataObj.edad < 25))&& (dataObj.intentos_contacto === 0)) {
      de18a25.push(dataObj.edad);
    }
    if (((dataObj.edad > 25) &&(dataObj.edad < 35))&& (dataObj.intentos_contacto === 0)) {
      de25a35.push(dataObj.edad);
    }
    if (((dataObj.edad > 35) &&(dataObj.edad < 45))&& (dataObj.intentos_contacto === 0)) {
      de35a45.push(dataObj.edad);
    }

    if (((dataObj.edad > 45) &&(dataObj.edad <60))&& (dataObj.intentos_contacto === 0)) {
      de45a60.push(dataObj.edad);
    }
  if ((dataObj.edad > 60)&& (dataObj.intentos_contacto === 0) ) {
    de60enAdelante.push(dataObj.edad);
    }
}

  let data = {
    labels: [ "3-12 ", "12-18", "18-25", "25-35", "35-45", "45-60", "60-"],
    datasets: [
      {
        label:"Total de consultantes no contactados por edad",
        data:[ de3a12, de12a18, de18a25, de25a35, de35a45, de45a60 ,de60enAdelante],
        backgroundColor: ["#9d0208"]
      }
    ]
  };

  return <Bar
    options={{
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }}
   data={data} />;
}
