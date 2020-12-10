<template>
<div>
  <div class="busqueda">
    <div class="row">
      <div class="col-lg-8 col-xl-8 pl-5">
        <h2 class="pt-3 text-left">Búsqueda</h2>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Ingresa el código del juego que buscas" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="codigoJuego">
            <button type="button" class="btn btn-primary ml-4" data-toggle="modal" data-target="#exampleModal">Agregar Juego</button>
          </div>
          <div>
            <table class="table bg-light">
              <thead>
                <tr class="bg-info text-light">
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Destacado</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(juegos, index) in enviarLista" :key="index" :style="juegos.destacado == true ? 'backgroundColor: gray' : 'backgroundColor: white'">
                    <th>{{juegos.codigo}}</th>
                    <td>{{juegos.nombre}}</td>
                    <td>{{juegos.stock}}</td>
                    <td>${{juegos.precio}}</td>
                    <td><button type="button" class="btn destacado" @click="destacadoUpdate(index)"><img :src="juegos.destacado == true ? 'https://i.pinimg.com/originals/f5/e1/8e/f5e18ef76a9db18ea49289f3ade43ae2.png' : 'https://vignette.wikia.nocookie.net/mario-fanon/images/e/e5/Estrella_Malvada.png/revision/latest?cb=20141013174717&path-prefix=es'" alt="imagen"></button></td>
                    <td><button type="button" class="btn btn-light" @click="editando(juegos)">Editar</button></td>
                    <td><button type="button" class="btn btn-danger" @click="borrarJuego(index)">Borrar</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
        <p class="text-left">Variedad total de Juegos: {{juegosTotales}}</p>
        <p class="text-left">Stock total de Juegos: {{totalStock}}</p>
      </div>
      <div class="mt-5">
                <!-- Modal -->
                <div class="modal fade text-dark" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Agregando Juego</h5>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="codigo" class="form-label">Código</label>
                                        <input type="text" class="form-control" v-model="codigo">
                                    </div>
                                    <div class="mb-3">
                                        <label for="nombre" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" v-model="nombre">
                                    </div>
                                    <div class="mb-3">
                                        <label for="stock" class="form-label">Stock</label>
                                        <input type="text" class="form-control" v-model="stock">
                                    </div>
                                    <div class="mb-3">
                                        <label for="precio" class="form-label">Precio</label>
                                        <input type="text" class="form-control" v-model="precio">
                                    </div>
                                    <div class="mb-3">
                                        <label for="caratula" class="form-label">Caratula</label>
                                        <input type="text" class="form-control" v-model="caratula">
                                    </div>
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" v-model="destacado">
                                        <label class="form-check-label" for="exampleCheck1">Juego Destacado</label>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="guardarNuevo">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  </div>
  <div class="footer text-center bg-info text-light p-3">
        <p>Página realizada por Sebastian Araos™</p>
  </div>
</div>
  
</template>

<script>
import {mapGetters} from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'Busqueda',
  data(){
    return {
      codigoJuego: '',
      codigo: '',
      nombre: '',
      stock: 0,
      precio: 0,
      caratula: '',
      destacado: false,
    }
  },

  computed:{
    ...mapGetters(['enviarLista', 'juegosTotales', 'totalStock']),
    /*mostrarLista(){
      return this.$store.getters.enviarLista.filter(resultado => {
        if (this.codigoJuego){
          return resultado.codigo == this.codigoJuego
        }else{
          return resultado.codigo;
        }
        });
    },
    TotalJuegos(){
      return this.$store.getters.juegosTotales
    },
    TotalStockTienda(){
      return this.$store.getters.totalStock
    },*/
  },

  watch: {
      codigoJuego(vNuevo){
        this.$store.dispatch('valorBusqueda', vNuevo);
      }
  },

  methods: {
    borrarJuego(index){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('borrandoJuego',index);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
        }
      })
    },

    editando(juegos){
      this.$router.push({name: 'Editar', params: {idLista: juegos.id}});
    },

    destacadoUpdate(index){
      this.$store.dispatch('actualizarDestacado',index);
    },

    guardarNuevo(){
      if (this.stock >= 0 && this.nombre.length >= 2 && this.codigo && this.precio >= 0) {
        let juego = {
          codigo : this.codigo,
          nombre : this.nombre,
          stock : this.stock,
          precio : this.precio,
          caratula: this.caratula,
          destacado : this.destacado,
        }
        this.$store.dispatch('guardarProducto',juego);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Perfect...',
            showConfirmButton: true,
            timer: 2000
          })
      } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'You have an error in the form',
            showConfirmButton: true,
            timer: 2000
          })
      }
    }
  },
}

</script>

<style>
  .busqueda{
    background-image: url('../assets/fondobusqueda.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    color: white;
  }

  .input-group{
    width: 1000px;
  }
  .table img{
    width: 20px;
  }
  
</style>