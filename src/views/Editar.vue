<template>
    <div class="container">
        <h2 class="mt-5">Editando el Producto: {{this.nombre}}</h2>
        <form @submit.prevent="guardarEditar">
            <div class="mb-3">
                <label for="id" class="form-label">Id</label>
                <input type="text" disabled class="form-control" v-model="idJuego">
            </div>
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
            <button type="submit" class="btn btn-success">Guardar</button>
            <button type="button" class="btn btn-primary mx-4" @click="$router.go(-1)">Regresar</button>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: 'Editar',
    data() {
        return {
            idJuego: '',
            codigo: '',
            nombre: '',
            stock: '',
            precio: '',
            destacado: false,
        }
    },
    props: {
        idLista: {
            type: String,
            required: true
        }
    },
    mounted() {
        let juegos = this.$store.getters.enviarLista.find(result => result.id == this.idLista);
        if(juegos){
            this.codigo = juegos.codigo;
            this.nombre = juegos.nombre;
            this.stock = juegos.stock;
            this.precio = juegos.precio;
            this.destacado = juegos.destacado;
            this.idJuego = juegos.id;
        }else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2000
            }).then(()=>{
                this.$router.push({name: 'Busqueda'})
            })
        }
    },
    methods: {
        guardarEditar(){
            let juego = {
                codigo : this.codigo,
                nombre : this.nombre,
                stock : this.stock,
                precio : this.precio,
                destacado : this.destacado,
                id: this.idJuego
            }
            this.$store.dispatch('guardarJuego',juego);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2000
            }).then(()=>{
                this.$router.push({name: 'Busqueda'});
            })
        }
    },
}
</script>

<style>
form{
    width: 700px;
    margin: 0 auto;
}
</style>