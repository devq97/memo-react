import React, {useEffect, useState} from 'react';
import axios from "axios";
import Demo from "./Components/Collapse";
import Header from './Components/Header';

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
    //setLoading(true);
    //fetchData().then();
  }, []);

  return (
    <div className="App w-100">
      {/* {loading ? <Loading animation="grow" variant="primary" /> : null} */}
      <Header />
      {/* <Asignacion
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
      /> : null}  */}
      <Demo />
    </div>
  );
}

export default App;
