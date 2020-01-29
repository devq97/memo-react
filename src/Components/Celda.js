import React from "react";
import {Col, Form} from "react-bootstrap";

const Celda = ({responsable, handleSelect}) => {
  return (
    <tr>
      <th>{responsable.id}</th>
      <th>{responsable.nameResp}</th>
      <th className="text-center">
        <Form.Group as={Col} controlId={"resp_" + responsable.id}>
          <Form.Control as="select" onChange={handleSelect} value={responsable.estadoResp}>
            <option>-- Seleccione --</option>
            <option value="0">No Presentado</option>
            <option value="1">Presentado</option>
            <option value="2">No se los Sabe</option>
            <option value="3">Es Rebelde</option>
          </Form.Control>
        </Form.Group>
      </th>
      <th>{responsable.nameAsig}</th>
      <th className="text-center">
        <Form.Group as={Col} controlId={"asig_" + responsable.id}>
          <Form.Control as="select" onChange={handleSelect} value={responsable.estadoAsig}>
            <option>-- Seleccione --</option>
            <option value="0">No Presentado</option>
            <option value="1">Presentado</option>
            <option value="2">No se los Sabe</option>
            <option value="3">Es Rebelde</option>
          </Form.Control>
        </Form.Group>
      </th>
    </tr>
  )
}

export default Celda;