import React from "react";
import { Button, Input, InputGroup } from "reactstrap";

function MultipleInputItem({ isLast, id, type, onChange, onAdd, onRemove, value }) {
  return (
    <InputGroup>
      <Input
        type={type}
        onChange={onChange}
        required
        value={value}
      />
      {isLast ? (
        <Button size="sm" outline color="primary" onClick={onAdd}>
          <i className="fa fa-plus"></i>
        </Button>
      ) : (
        <Button size="sm" outline color="danger" onClick={onRemove}>
          <i className="fa fa-minus"></i>
        </Button>
      )}
    </InputGroup>
  );
}

export default MultipleInputItem;
