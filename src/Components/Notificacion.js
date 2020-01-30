import React from "react";
import Toast from "react-bootstrap/Toast";

const Notificacion = ({setShow, show, mensaje, titulo, clase}) => {
  return (
    <Toast className="notification" delay={2000} autohide onClose={() => setShow(false)} show={show}>
      <Toast.Header className={clase + " text-light"}>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded mr-2"
          alt=""
        />
        <strong className="mr-auto">{titulo}</strong>
      </Toast.Header>
      <Toast.Body>{mensaje}</Toast.Body>
    </Toast>
  )
};

export default Notificacion;