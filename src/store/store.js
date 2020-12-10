import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    listaJuegos: [
      { id: "328b9c72-0d7a-4733-a894-6848a640cd73", codigo: "0001", nombre: "Sekiro", stock: "10", precio: 30000, destacado: true, caratula: "https://allgamerschile.com/wp-content/uploads/2020/03/shadows_die_twice-4816853.jpg", cantidad: 0 },

      { id: "8c5590dc-42bc-4ae6-bac3-1351c7b3a219", codigo: "0002", nombre: "Fifa 21", stock: "10", precio: 25000, destacado: false, caratula: "https://www.somosxbox.com/wp-content/uploads/2020/07/fifa21-pre-xone-front-norating-rgb.png", cantidad: 0 },

      { id: "507fe540-cde6-4060-925c-c8d75737675b", codigo: "0003", nombre: "Gears of War 4", stock: "10", precio: 15000, destacado: true, caratula: "https://thesamstore.com/wp-content/uploads/2019/07/gears-of-wars-4.jpg", cantidad: 0 },

      { id: "a9937a03-dfb6-4f90-b476-b26c68784b3a", codigo: "0004", nombre: "Mario Tennis Aces", stock: "10", precio: 35000, destacado: false, caratula: "https://media.vandal.net/m/56344/mario-tennis-aces-20183915612_29.jpg", cantidad: 0 },

      { id: "e10f726a-4ae5-4539-b4c2-c9d024c071d1", codigo: "0005", nombre: "Bloodborne", stock: "10", precio: 10000, destacado: false, caratula: "https://uvejuegos.com/img/caratulas/53216/0_portada16339.jpeg", cantidad: 0 },

      { id: "0a343f47-2767-457c-8136-ea7bea4e1802", codigo: "0006", nombre: "Forza Horizon 4", stock: "10", precio: 20000, destacado: true, caratula: "https://gameplanet-53f8.kxcdn.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/f/o/forza-4-ue.jpg", cantidad: 0 },
    ],

    titulo: 'TIENDA 32-BITS',
    subtitulo: 'Juegos de PC y consola',
    codigoJuego: null,
    productosVendidos: 0,
    boleta: [],
    ventasTotales: [],
    idCompra: ''
  },

  getters: {
    enviarTitulo(state){
      return state.titulo;
    },

    enviarSubtitulo(state){
      return state.subtitulo;
    },

    enviarJuegoConStock(state){
      return state.listaJuegos.filter(resultado => resultado.stock > 0);
    },
    enviarProductosVendidos(state){
      return state.productosVendidos;
    },

    enviarLista(state){
      return state.listaJuegos.filter(resultado => {
        if (state.codigoJuego){
          return resultado.codigo == state.codigoJuego
        }else{
          return resultado;
        }
      });
    },

    juegosTotales(state, getters){
      return getters.enviarLista.length;
    },

    stockTienda(state, getters){
      return getters.enviarLista.map(total => parseInt(total.stock))
    },

    totalStock(state, getters){
      return getters.stockTienda.reduce((suma, tiendaStock) =>{
        return suma + tiendaStock;
      },0)
    },

    enviarBoleta(state){
      return state.boleta
    },

    enviarTotalBoleta(state,getters){
      let precios = getters.enviarBoleta.map(resultado => parseFloat(resultado.precio) * resultado.cantidad)
      return precios.reduce((suma,inicial) => {
        return suma + inicial;
      },0);
    },

    enviarCantidadVendida(state,getters){
      let cantidad = getters.enviarBoleta.map(resultado => resultado.cantidad);
      return cantidad.reduce((suma,inicial) => {
        return suma + inicial;
      },0)
    }
  },

  mutations: {
    mutBusqueda(state, valor){
      state.codigoJuego = valor;
    },

    mutListaJuegos(state, index){
      state.listaJuegos.splice(index, 1);
    },

    mutLista(state,juego){
      let juegos = state.listaJuegos.find(result => result.id == juego.id)
      juegos.nombre = juego.nombre;
      juegos.precio = juego.precio;
      juegos.codigo = juego.codigo;
      juegos.destacado = juego.destacado;
      juegos.stock = juego.stock;
    },

    mutDestacado(state,index){
      state.listaJuegos[index].destacado = !state.listaJuegos[index].destacado;
    },

    mutJuegos(state,juego){
      let valor = [];
      for (let index = 0; index < 11; index++) {
        valor.push(Math.floor(Math.random() * 100));
      }
      let id = valor.join('');
      juego.id = id;
      state.listaJuegos.push(juego);
    },

    restarStock(state,item){
      let resultado = state.listaJuegos.find(result => result.id == item.id);
      resultado.stock--;
      ++resultado.cantidad;
      state.productosVendidos++;
      let resulBoleta = state.boleta.find(boleta => boleta.id == resultado.id)
      if (!resulBoleta) {
        state.boleta.push(resultado); 
      }else{
        resulBoleta.cantidad = resultado.cantidad;
      }
    },

    sumarStock(state,item){
      let resultado = state.listaJuegos.find(result => result.id == item.id);
      resultado.stock++;
      --resultado.cantidad;
      state.productosVendidos--;
      if (resultado.cantidad == 0) {
        let resulBoleta = state.boleta.findIndex(boleta => boleta.id == resultado.id);
        state.boleta.splice(resulBoleta,1); 
      }else{
        let resulBoleta = state.boleta.find(boleta => boleta.id == resultado.id);
        resulBoleta.cantidad = resultado.cantidad;
      }
    },

    borrarProducto(state,item){
      let resultado = state.listaJuegos.find(result => result.id == item.id);
      resultado.stock += resultado.cantidad;
      state.productosVendidos -= resultado.cantidad;
      resultado.cantidad = 0;
      let producto = state.boleta.findIndex(result => result.id == item.id);
      state.boleta.splice(producto,1);
    },

    total(state){
      state.ventasTotales.push(state.boleta);
      state.boleta = [];
      state.productosVendidos = 0;
    }
  },

  actions: {
    valorBusqueda({commit},valor){
      commit('mutBusqueda', valor);
    },

    borrandoJuego({commit}, index){
      commit('mutListaJuegos', index);
    },

    guardarJuego({commit},juego){
      commit('mutLista',juego)
    },
    actualizarDestacado({commit},index){
      commit('mutDestacado',index);
    },

    guardarProducto({commit},juego){
      commit('mutJuegos',juego)
    },

    venderProducto({commit},item){
      commit('restarStock',item);
    },

    restarProducto({commit},item){
      commit('sumarStock',item);
    },

    totalVentaProductos({commit, state, getters}){
      state.boleta.totalVenta = getters.enviarTotalBoleta;
      state.boleta.cantidadTotal = getters.enviarCantidadVendida;
      commit('total');
    },

    eliminando({commit},item){
      commit('borrarProducto',item);
    }
  }
})