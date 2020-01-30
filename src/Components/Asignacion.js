import React from "react";
import {Table, Form} from 'react-bootstrap';
import axios from 'axios';
import Celda from "./Celda";

const Asignacion = ({responsables, setResponsables, setLoading, setShow}) => {

  const handleSelect = e => {
    setLoading(true);
    const id = e.target.id.split('_');
    const index = responsables.findIndex(c => {
      return c.id === parseInt(id[1]);
    });

    const resp = [...responsables];

    const { nameResp, nameAsig, estadoResp, estadoAsig } = responsables[index];
    const data = {
      nameResp: nameResp,
      estadoResp: parseInt((id[0] === 'resp') ? resp[index].estadoResp = e.target.value : estadoResp),
      nameAsig: nameAsig,
      estadoAsig: parseInt((id[0] === 'asig') ? resp[index].estadoAsig = e.target.value : estadoAsig)
    };

    const respu = axios.patch(`https://memo-project.herokuapp.com/responsables/${index+1}`, data)
      .then( (response) => {
        console.log(response);
        if(response.status === 200) {
          setShow(true)
        }
        setLoading(false);
      });

    (id[0] === 'asig') ? resp[index].estadoAsig = e.target.value : resp[index].estadoResp = e.target.value;
    setResponsables(resp);
  };

  return (
    <Form>
      <Table responsive bordered hover striped>
        <thead>
        <tr>
          <th>#</th>
          <th>Responsable - Asignado</th>
          <th>Estado</th>
          <th>Responsable - Asignado</th>
          <th>Estado</th>
        </tr>
        </thead>
        <tbody>
        {
          responsables.map((responsable) => {
            return <Celda
              key={responsable.id}
              responsable={responsable}
              handleSelect={handleSelect}
            />
          })
        }
        </tbody>
      </Table>
    </Form>
  )
};

export default Asignacion;