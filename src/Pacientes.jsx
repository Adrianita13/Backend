import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Service from './Service';
import Swal from 'sweetalert2';

function Pacientes() {

  const service = new Service();
  
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalBuscarPorId, setModalBuscarPorId] = useState(false);
  const [modalVerDomicilio, setModalVerDomicilio] = useState(false);

  async function fetchData(){
    const datosAPI = await service.get("/pacientes");
  
    setData(datosAPI);
  }
  useEffect(() => {
   
    fetchData();
    },[])

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState({
    id: '',
    nombre: '',
    apellido: '',
    dni: '',
    fechaIngreso: '',
    domicilio:{}
    
  
  });

  const seleccionarPaciente = (elemento, accion) => {
    setPacienteSeleccionado(elemento);
    switch(accion) {
      case "Editar": setModalEditar(true)
      break;
      case "Eliminar": setModalEliminar(true)
      break;
      case "Ver Domicilio": setModalVerDomicilio(true)
      break;

      default: break;

    }
    
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setPacienteSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const editar = async () => {
    const datosPacientes = await service.put(pacienteSeleccionado, "/pacientes")
    setModalEditar(false);
   
  }

  const eliminar = async () => {
    const datosPacientes = await service.delete("/pacientes" + "/" + pacienteSeleccionado.id)
    setModalEliminar(false);
    fetchData()
   
  }

  const buscar = async () => {
    const datosPacientes = await service.get("/pacientes" + "/" + pacienteSeleccionado.id)
    if(typeof datosPacientes== "object") {
      setModalBuscarPorId(false);
      setData([datosPacientes])
     
    }
  
    
  }

  const abrirModalBuscarPorId = () => {
    setPacienteSeleccionado(null);
    setModalBuscarPorId(true);
  
  }

  const abrirModalAltaPaciente = () => {
    setPacienteSeleccionado(null);
    setModalInsertar(true);
    fetchData()
  }

  
  const altaPaciente = async() => {
    const {nombre, apellido, dni, fechaIngreso, calle, numero, localidad, provincia} = pacienteSeleccionado;
    const pacienteNuevo= {nombre, apellido, dni, fechaIngreso, domicilio : {calle, numero, localidad, provincia}};
   const datosPacientes = await service.post(pacienteNuevo, "/pacientes")
    setModalInsertar(false);
    Swal.fire("Paciente agregado exitosamente")
 
  }


  return (

      <div className="App">
        
        <h2> PACIENTES </h2>
        <br />
        <button className="btn btn-success" onClick={() => abrirModalAltaPaciente()}>Insertar</button>
        {"               "}
        <button className="btn btn-success" onClick={() => abrirModalBuscarPorId()}>Buscar un paciente</button>
        {"               "}
        <button className="btn btn-success" onClick={() => fetchData()}> Buscar todos los pacientes </button>
        <br />
        <br />
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>FechaIngreso</th>
              <th>Domicilio</th>

            </tr>
          </thead>
          <tbody>
            {data.map((paciente, index) => (
              <tr key= {index}>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>{paciente.dni}</td>
                <td>{paciente.fechaIngreso}</td>
                <td> <button className="btn btn-primary" onClick={() => seleccionarPaciente(paciente.domicilio, 'Ver Domicilio')}>Ver Domicilio</button> </td>
                <td><button className="btn btn-primary" onClick={() => seleccionarPaciente(paciente, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={() => seleccionarPaciente(paciente, 'Eliminar')}>Eliminar</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>


        <Modal isOpen={modalVerDomicilio}>
          <ModalHeader>
            <div>
              <h3>Ver Domicilio</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Calle</label>
              <input
                className="form-control"

                type="text"
                name="Calle"
                value={pacienteSeleccionado && pacienteSeleccionado.calle}
              />
              <br />

              <label>Numero</label>
              <input
                className="form-control"
                type="text"
                name="Numero"
                value={pacienteSeleccionado && pacienteSeleccionado.numero}
                onChange={handleChange}
              />
              <br />

              <label>Localidad</label>
              <input
                className="form-control"
                type="text"
                name="Localidad"
                value={pacienteSeleccionado && pacienteSeleccionado.localidad}
                onChange={handleChange}
              />
              <br />
              <label>Provincia</label>
              <input
                className="form-control"
                type="text"
                name="Provincia"
                value={pacienteSeleccionado && pacienteSeleccionado.provincia}
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => setModalVerDomicilio(false)}
            >
              Ok
            </button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Paciente</h3>
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
                value={pacienteSeleccionado && pacienteSeleccionado.id}
              />
              <br />

              <label>Paciente</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                value={pacienteSeleccionado && pacienteSeleccionado.nombre}
                onChange={handleChange}
              />
              <br />

              <label>Apellido</label>
              <input
                className="form-control"
                type="text"
                name="apellido"
                value={pacienteSeleccionado && pacienteSeleccionado.apellido}
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
            Estás Seguro que deseas eliminar el paciente {pacienteSeleccionado && pacienteSeleccionado.nombre}
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
            Ingresa el id del paciente buscado

            <label>ID</label>
              <input
                className="form-control"
                type="text"
                name="id"
                value={pacienteSeleccionado && pacienteSeleccionado.id}
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
              <h3>Insertar Paciente</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
             
              <label>Nombre</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                value={pacienteSeleccionado ? pacienteSeleccionado.nombre : ''}
                onChange={handleChange}
              />
              <br />

              <label>Apellido</label>
              <input
                className="form-control"
                type="text"
                name="apellido"
                value={pacienteSeleccionado ? pacienteSeleccionado.apellido : ''}
                onChange={handleChange}
              />
              <label>DNI</label>
              <input
                className="form-control"
                type="text"
                name="dni"
                value={pacienteSeleccionado ? pacienteSeleccionado.dni : ''}
                onChange={handleChange}
              />
              <label>fechaIngreso</label>
              <input
                className="form-control"
                type="text"
                name="fechaIngreso"
                value={pacienteSeleccionado ? pacienteSeleccionado.fechaIngreso : ''}
                onChange={handleChange}
              />
              <br/>
              <hr/>
              <p> Domicilio </p>
              
              <label>Calle</label>
              <input
                className="form-control"
                type="text"
                name="calle"
                value={pacienteSeleccionado ? pacienteSeleccionado.calle : ''}
                onChange={handleChange}
              />
               <label>Numero</label>
              <input
                className="form-control"
                type="text"
                name="numero"
                value={pacienteSeleccionado ? pacienteSeleccionado.numero : ''}
                onChange={handleChange}
              />

              <label>Localidad</label>
              <input
                className="form-control"
                type="text"
                name="localidad"
                value={pacienteSeleccionado ? pacienteSeleccionado.localidad : ''}
                onChange={handleChange}
              />    
                <label>Provincia</label>
              <input
                className="form-control"
                type="text"
                name="provincia"
                value={pacienteSeleccionado ? pacienteSeleccionado.provincia : ''}
                onChange={handleChange}
              />    
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary"
              onClick={() => altaPaciente()}>
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

export default Pacientes;
