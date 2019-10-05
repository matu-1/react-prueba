import React, { Component } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

export default class AlumnoEditar extends Component {
    state = {
        id: this.props.match.params.idalumno,
        ci: "",
        nombre: "",
        telefono: "",
        redirect: false
    }

    setCi(e){
        this.setState({
            ci: e.target.value,
        });
    }

    setNombre(e){
        this.setState({
            nombre: e.target.value,
        });
    }

    setTelefono(e){
        this.setState({
            telefono: e.target.value,
        });
    }

    componentDidMount(){
        const URL = 'http://192.168.0.15/ProyArqControlAsistencia/Servicio/SAlumno.php?accion=editar&idAlumno='+ this.props.match.params.idalumno;
        Axios.get(URL).then(response=>{
            this.setState({
                ci: response.data.datos.ci,
                nombre: response.data.datos.nombre,
                telefono: response.data.datos.telefono,
            });
             console.log("data",response.data.datos);
         }).catch(error=>{
             console.log(error);
         });
    }

    actualizarAlumno(e){
        const alumno = {
            accion: 'actualizar',
            ci: this.state.ci,
            nombre: this.state.nombre,
            telefono: this.state.telefono,
            idAlumno: this.state.id,
        };
        e.preventDefault();  //hace que no recargue la pagina => en algo bueno para probar su funcionamiento
        Axios.post('http://192.168.0.15/ProyArqControlAsistencia/Servicio/SAlumno.php',alumno)
        .then(response=>{
          console.log(response);
          Swal.fire({
              type: 'success',
              title: 'Se registro correctamente',
          });
        this.setState({redirect: true})
        
        }).catch(error=>{
          console.log(error);
        });

    }

    render() {
        if(this.state.redirect){
            return (<Redirect to="/alumno"/>)
        }
        return (
            <div>
                <div className="p-3">
                   <h3 className="text-primary">Editar Alumno</h3>  
                    <form onSubmit={this.actualizarAlumno.bind(this)} >
                       <div className="form-group row">
                            <label className="col-md-3 col-form-label" htmlFor="nombre">CI</label>
                            <div className="col-md-9">
                                <input  className="form-control" type="number" name="nombre" placeholder="CI" required value={this.state.ci} onChange={this.setCi.bind(this)}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label" htmlFor="categoria">Nombre</label>
                            <div className="col-md-9">
                                <input className="form-control" type="text" name="descripcion" placeholder="Nombre" required value={this.state.nombre} onChange={(e)=>this.setNombre(e)}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label" htmlFor="categoria">Telefono</label>
                            <div className="col-md-9">
                                <input className="form-control" type="number" name="descripcion" placeholder="Telefono" required value={this.state.telefono} onChange={(e)=>this.setTelefono(e)}/>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>

            </div>
        )
    }
}
