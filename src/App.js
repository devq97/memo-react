import React, {useEffect, useState} from 'react';
import Header from "./Components/Header";
import Asignacion from "./Components/Asignacion";
import axios from "axios";
import Loading from "./Components/Loading";
import Notificacion from "./Components/Notificacion";

function App() {

  const [responsables, setResponsables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      axios.get('https://memo-project.herokuapp.com/responsables')
        .then(res => {
          const responsables = res.data;
          setResponsables(responsables);
          setLoading(false);
        })
    };
    setLoading(true);
    fetchData().then();
  }, []);

  return (
    <div className="App w-100">
      {loading ? <Loading animation="grow" variant="primary" /> : null}
      <Header/>
      <Asignacion
        responsables={responsables}
        setResponsables={setResponsables}
        setLoading={setLoading}
        setShow={setShow}
      />
      {(show) ? <Notificacion
        mensaje="Se ha registrado el cambio correctamente."
        titulo="Correcto"
        clase="bg-success"
        show={show}
        setShow={setShow}
      /> : null}
    </div>
  );
}

export default App;
