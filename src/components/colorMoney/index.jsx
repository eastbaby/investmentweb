import React from "react";
import classnames from 'classnames';
import "./index.less";


function ColorMoney(props) {
  const {
    value,
    type = 'num' // num, percent
  } = props

  let displayValue = value;
  if(type === 'num') {
    displayValue = value.toFixed(2);
  } else if(type === 'percent') {
    displayValue = `${(value * 100).toFixed(2)}%`;
  }

  return (
    <span className={classnames('color-money', {red: value > 0}, {green: value < 0})}>
      {displayValue}
    </span>
  );
}

export default ColorMoney;
