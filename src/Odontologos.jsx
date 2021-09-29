import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Service from './Service';
import Swal from 'sweetalert2';

function Odontologos() {

  const service = new Service();
  
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalBuscarPorId, setModalBuscarPorId] = useState(false);


  async function fetchData(){
    const datosAPI = await service.get("/odontologos");
  
    setData(datosAPI);
  }
  useEffect(() => {
   
    fetchData();
    },[])

  const [odontologoSeleccionado, setOdontologoSeleccionado] = useState({
    id: '',
    nombre: '',
    apellido: '',
    matricula: '',
    

  });

  const seleccionarOdontologo = (elemento, accion) => {
    setOdontologoSeleccionado(elemento);
    switch(accion) {
      case "Editar": setModalEditar(true)
      break;
      case "Eliminar": setModalEliminar(true)
      break;
      default: break;

    }
    
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setOdontologoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const editar = async () => {
    const datosOdontologo = await service.put(odontologoSeleccionado, "/odontologos")
    setModalEditar(false);
   
  }

  const eliminar = async () => {
    const datosOdontologo = await service.delete("/odontologos" + "/" + odontologoSeleccionado.id)
    setModalEliminar(false);
    fetchData()
   
  }

  const buscar = async () => {
    const datosOdontologo = await service.get("/odontologos" + "/" + odontologoSeleccionado.id)
    if(typeof datosOdontologo== "object") {
      setModalBuscarPorId(false);
      setData([datosOdontologo])
     
    }
  
    
  }

  const abrirModalBuscarPorId = () => {
    setOdontologoSeleccionado(null);
    setModalBuscarPorId(true);
  
  }

  const abrirModalAltaOdontologo = () => {
    setOdontologoSeleccionado(null);
    setModalInsertar(true);
    fetchData()
  }

  
  const altaOdontologo = async() => {
    const {nombre, apellido, matricula} = odontologoSeleccionado;
   await service.post(odontologoSeleccionado, "/odontologos")
    setModalInsertar(false);
    Swal.fire("Odontologo agregado exitosamente")
    fetchData()
  }

  return (

      <div className="App">
        
        <h2> ODONTOLOGOS </h2>
        <br />
        <button className="btn btn-success" onClick={() => abrirModalAltaOdontologo()}>Insertar</button>
        {"               "}
        <button className="btn btn-success" onClick={() => abrirModalBuscarPorId()}>Buscar un Odontologo</button>
        {"               "}
        <button className="btn btn-success" onClick={() => fetchData()}> Buscar todos los odontologos </button>
        <br />
        <br />
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Matricula</th>
             
            </tr>
          </thead>
          
          <tbody>
            {data.map((odontologo, index) => (
              <tr key= {index}>
                <td>{odontologo.id}</td>
                <td>{odontologo.nombre}</td>
                <td>{odontologo.apellido}</td>
                <td>{odontologo.matricula}</td>
               
                
                <td><button className="btn btn-primary" onClick={() => seleccionarOdontologo(odontologo, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={() => seleccionarOdontologo(odontologo, 'Eliminar')}>Eliminar</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>


        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Odontologo</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="id"
                value={odontologoSeleccionado && odontologoSeleccionado.id}
              />
              <br />

              <label>Odontologo</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                value={odontologoSeleccionado && odontologoSeleccionado.nombre}
                onChange={handleChange}
              />
              <br />

              <label>Apellido</label>
              <input
                className="form-control"
                type="text"
                name="apellido"
                value={odontologoSeleccionado && odontologoSeleccionado.apellido}
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => editar()}>
              Actualizar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setModalEditar(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estás Seguro que deseas eliminar el odontólogo {odontologoSeleccionado && odontologoSeleccionado.nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => eliminar()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setModalEliminar(false)}
            >
              No
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalBuscarPorId}>
          <ModalBody>
            Ingresa el id del odontólogo buscado

            <label>ID</label>
              <input
                className="form-control"
                type="text"
                name="id"
                value={odontologoSeleccionado && odontologoSeleccionado.id}
                onChange={handleChange}
              />

          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => buscar()}>
              Buscar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setModalBuscarPorId(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Odontologo</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
             
              <label>Nombre</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                value={odontologoSeleccionado ? odontologoSeleccionado.nombre : ''}
                onChange={handleChange}
              />
              <br />

              <label>Apellido</label>
              <input
                className="form-control"
                type="text"
                name="apellido"
                value={odontologoSeleccionado ? odontologoSeleccionado.apellido : ''}
                onChange={handleChange}
              />
              <label>Matricula</label>
              <input
                className="form-control"
                type="text"
                name="matricula"
                value={odontologoSeleccionado ? odontologoSeleccionado.dni : ''}
                onChange={handleChange}
              />
              
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary"
              onClick={() => altaOdontologo()}>
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setModalInsertar(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
      );
}

export default Odontologos;
