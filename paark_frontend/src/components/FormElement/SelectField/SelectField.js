import React, { useState } from "react";
import "./SelectField.scss";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import _ from "lodash";
import "lodash.product";

const SelectField = ({ field: { onChange } }) => {
  const [hourValue, setHourValue] = useState(null);
  const formatHour = (hour, minute) => {
    return `${_.padStart(hour, 2, "0")}:${_.padStart(minute, 2, "0")}`;
  };

  const hourList = () => {
    const hours = _.range(9, 24);
    const minutes = [0, 30];
    const product = _.product(hours, minutes);
    return product.map(([hour, minute]) => formatHour(hour, minute));
  };

  return (
    <DropdownButton
      className="time-picker"
      onClick={() => hourList()}
      title={hourValue ? hourValue : "Heure d'arrivé"}
      variant={"outline-primary"}
      rootCloseEvent="mousedown"
    >
      <Col className="time-picker__hour">
        {hourList().map((option, key) => (
          <Dropdown.Item
            className="time-picker__hour__option"
            key={key}
            onClick={(e) => {
              setHourValue(e.target.innerText);
              onChange(e.target.innerText);
            }}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Col>
    </DropdownButton>
  );
};

export default SelectField;
