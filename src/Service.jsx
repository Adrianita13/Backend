import Swal from 'sweetalert2';

const url = "http://localhost:8080";

export default class Service {

    parse = (text) => {
        try{
            const json = JSON.parse(text)
            return json
          } catch(err) {
              Swal.fire(text)
            return text;
          }      
    }


    get = async (endpoint) => {
        try {
            const resp = await fetch(url+endpoint);
            const text = await resp.text();
            return this.parse(text);
        }
        catch(error){
            console.error(error);
        }
    }

    post = async (data, endpoint) => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try {
            const resp = await fetch(url+endpoint, settings);
            const text = await resp.text();
            return this.parse(text);
        }
        catch(error){
            console.error(error);
        }
    }

    put = async (data, endpoint) => {
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try {
            const resp = await fetch(url+endpoint, settings);
            const text = await resp.text();
            return this.parse(text);
        }
        catch(error){
            console.error(error);
        }
    }

    delete = async (endpoint) => {
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
            
        }
        try {
            const resp = await fetch(url+endpoint, settings);
            const text = await resp.text();
            return this.parse(text);
        }
        catch(error){
            console.error(error);
        }
    }



}