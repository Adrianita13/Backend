import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Service from './Service';
import Swal from 'sweetalert2';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Pacientes from './Pacientes';
import Odontologos from './Odontologos';


export default function App() {

    return (
        <>
            <h1> Bienvenidos a la clínica odontológica </h1>
         
            <Link to="/paciente"> Pacientes </Link>
            <Link to="/odontologo"> Odontologos </Link>
        </>
    )
}