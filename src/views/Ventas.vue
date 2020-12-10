<template>
  <div class="ventas">
    <h2 class="p-4 text-left">Ventas</h2>
      <div class="container text-center">
        <div class="card text-dark d-inline-block m-4" style="width: 18rem;" v-for="(juegos, index) in enviarLista" :key="index">
          <img :src="juegos.caratula" class="card-img-top" alt="Sin Caratula">
          <div class="card-body">
            <h6 class="card-title">{{juegos.nombre}}</h6>
            <p class="card-text">${{juegos.precio}}</p>
            <button type="button" class="btn btn-primary" @click="venderProducto(juegos)">Vender</button>
            <hr>
            <h6 class="card-text">Stock: {{juegos.stock}}</h6>
          </div>
        </div>
      </div>
      <div class="my-5">
        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="mostrar = !mostrar">Carrito: <span class="badge bg-secondary">{{enviarProductosVendidos}}</span> item(s)</button>
        </div>
        <div v-if="mostrar && enviarProductosVendidos > 0">
          <table class="table table-striped mt-3 bg-light container">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(juegos,index) in enviarBoleta" :key="index">
                <td>{{index+1}}</td>
                <td>{{juegos.nombre}}</td>
                <td>${{juegos.precio}}</td>
                <td>{{juegos.cantidad}}</td>
                <td><button type="button" class="btn btn-danger" @click="eliminando(juegos)">Eliminar</button></td>
                <td><button type="button" class="btn btn-warning" @click="restarProducto(juegos)">Restar</button></td>
              </tr>
            </tbody>
            <tfoot>
                <tr>
                  <th colspan="3" class="text-right">Total Venta: ${{enviarTotalBoleta}}</th>
                  <br>
                  <th>Total Productos: {{enviarCantidadVendida}}</th>
                </tr>
            </tfoot>
            </table>
          </div>
          <div v-else-if="!mostrar && enviarProductosVendidos <= 0">
            <div class="alert alert-warning container mt-2" role="alert">No hay productos en el carro...</div>
          </div>
        </div>
        <div class="my-5 text-center" v-if="mostrar && enviarProductosVendidos > 0">
            <button type="button" class="btn btn-secondary btn-lg" @click="totalVenta">Facturar</button>
        </div>
    <div class="footer text-center bg-info text-light p-3">
        <p>Página realizada por Sebastian Araos™</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'Ventas',
  data() {
        return {
            mostrar: false,
        }
    },

  computed:{
    ...mapGetters(['enviarLista', 'enviarProductosVendidos', 'enviarBoleta', 'enviarTotalBoleta','enviarCantidadVendida'])
  },

  methods: {
    ...mapActions(['venderProducto', 'restarProducto','eliminando']),
    totalVenta(){
      Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, buy it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Sold!',
            'Your products has been sold.',
            'success'
          );
        this.$store.dispatch('totalVentaProductos');
        }
      })
    }
  },
}

</script>

<style>
  .ventas{
    background-image: url('../assets/fondoventas.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    color: white;
  }

  h6{
    font-size: 12px;
  }

  .ventas img{
    height: 400px;
  }
  .card{
    margin: 0 auto;
  }

  
</style>