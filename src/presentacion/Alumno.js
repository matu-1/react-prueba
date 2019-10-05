import React, { Component } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import $ from "jquery";

export default class Alumno extends Component {
    state = {
        alumnos: [],
        ci: "",
        nombre: "",
        telefono: ""
    }
    componentDidMount(){
        Axios.get('http://192.168.0.15/ProyArqControlAsistencia/Servicio/SAlumno.php?accion=mostrar').then(response=>{
            this.setState({alumnos:response.data.datos});
             console.log("data",response.data.datos);
         }).catch(error=>{
             console.log(error);
         });

        //  $("#responsive tr").click(function(){
        //     $(this).addClass('table-active').siblings().removeClass('table-active');    
        //     var value=$(this).find('td:first').html();
        //     alert(value);    
        //  });

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

    limpiarEntradas(){
        this.setState({
            ci: "",
            nombre: "",
            telefono: ""
        });
    }

    registrarAlumno(e){
        const alumno = {
            accion: 'registrar',
            ci: this.state.ci,
            nombre: this.state.nombre,
            telefono: this.state.telefono,
        };
        e.preventDefault();  //hace que no recargue la pagina => en algo bueno para probar su funcionamiento
        Axios.post('http://192.168.0.15/ProyArqControlAsistencia/Servicio/SAlumno.php',alumno)
        .then(response=>{
          console.log(response);
        //   const id= this.state.alumnos[this.state.alumnos.length-1].id;
        //   alumno.id=id+1;
        //   this.setState({
        //       alumnos: this.state.alumnos.concat(alumno)
        //   })
          Swal.fire({
              type: 'success',
              title: 'Se registro correctamente',
          });
       
          this.limpiarEntradas();
          this.componentDidMount();
        
        }).catch(error=>{
          console.log(error);
        });
    }

    borrarAlumno(alumno, index){
        const parametros = {
            accion: 'borrar',
            idAlumno: alumno.id,
        };
        Axios.post('http://192.168.0.15/ProyArqControlAsistencia/Servicio/SAlumno.php', parametros)
        .then(response=>{
          console.log(response);
          Swal.fire({
              type: 'success',
              title: 'Se elimino correctamente',
          });
        //   this.componentDidMount();
          this.state.alumnos.splice(index,1)
          this.setState({
            alumnos:this.state.alumnos
          })
        
        }).catch(error=>{
          console.log(error);
        });
    }
    
    editar(e, index){
        $(e.target.parentNode).addClass('bg-warning').siblings().removeClass('bg-warning');    
        // console.log(this.state.alumnos[index])
        this.setState({
            ci: this.state.alumnos[index].ci,
            nombre: this.state.alumnos[index].nombre,
            telefono: this.state.alumnos[index].telefono
        })
    }
    render() {
        const alumnos = this.state.alumnos;
        return (
            <div>
                <div className="p-3">
                   <h3 className="text-primary">Registrar Alumno</h3>  
                   <img src="04.png" alt="ma"/>
                    <form onSubmit={this.registrarAlumno.bind(this)} >
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

                <div className="p-3">
                    <div className="table-responsive">
                        <table id="responsive" className="table table-bordered dt-responsive nowrap">
                            <thead>
                                <tr>
                                    <th>Nro.</th>
                                    <th>CI</th>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    alumnos.map((data,index)=>(
                                        <tr key={index} onClick={(e)=>this.editar(e, index)}>
                                            <td>{index+1}</td>
                                            <td>{data.ci}</td>
                                            <td>{data.nombre}</td>
                                            <td>{data.telefono}</td>
                                            <td>
                                                <button  className="btn btn-primary btn-sm mr-1" type="button" onClick={()=>this.borrarAlumno(data,index)} >Borrar</button>
                                                <Link className="btn btn-danger btn-sm" to={"/alumno/" + data.id} >Editar </Link>
                                            </td>
                                        </tr>
                                    ))
                                }    
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
