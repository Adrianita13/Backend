import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Service from './Service';
import Swal from 'sweetalert2';
import Pacientes from './Pacientes';
import Odontologos from './Odontologos';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Clinica from './Clinica';

export default function App() {

  return (

    <BrowserRouter>
    <Switch>
    <Route exact path= "/"> <Clinica/> </Route>
    <Route path="/paciente"> <Pacientes /> </Route>
    <Route path="/odontologo"> <Odontologos /> </Route>
    </Switch>
    </BrowserRouter>
  )

}