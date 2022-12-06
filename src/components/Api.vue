<template >

  <section class="src-components-api">
    <h1>API MockAPI TP4</h1>
    <div class="p-4">
      <select class="form-control" v-model="option">
        <option value="" selected disabled></option>
        <option value="0">XMLHttpRequest</option>
        <option value="1">FETCH</option>
        <option value="2">AXIOS</option>
      </select>
      <p>Seleccion:{{option}}</p>
    </div>
    <br>
    <button type="button" class="btn btn-success" @click="cargarDatos()">Cargar datos</button>
    &nbsp;&nbsp;
    <button type="button" class="btn btn-secondary" @click="limpiarTabla()">Limpiar tabla</button>
    <br>
    <br>
    <table v-if="data" class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Teléfono</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(item, index) in data" :key=index>
            <td>{{item.id}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.email}}</td>
            <td>{{item.telefono}}</td>
          </tr>
      </tbody>
    </table>
    <h6>Datos MockAPI</h6>
    <pre>{{data}}</pre>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-api',
    props: [],
    mounted () {

    },
    data () {
      return {
        API_URL: "https://6366f216f5f549f052ce96e7.mockapi.io/TP_PNT2_ORT/usuarios",
        option: '',
        data: [],
      }
    },
    methods: {
      limpiarTabla(){
        this.data = [];
      },
      cargarDatos(){
        if(this.option === '0'){
          this.sendXMLHttpRequest();
        }else if(this.option === '1'){
          this.sendFetch();
        }else if(this.option === '2'){
          this.sendAxios()
        }else{
          console.error("Opcion no seleccionada!");
        }
      },
      cargarDatosEnTabla(data){
        this.data = data;
        console.log(this.data);
      },
      sendXMLHttpRequest(){
        console.log(this.option, 'XMLHttpRequest');
        const req = new XMLHttpRequest();
        req.addEventListener("load", () => {
          //console.log(req.response);
          if(req.status===200){
            var data = JSON.parse(req.response);
            this.cargarDatosEnTabla(data);
          }
        });
        req.open("GET", this.API_URL);
        req.send();
      },
      sendFetch(){
        console.log(this.option, 'FETCH');
        fetch(this.API_URL)
          .then(response => response.json())
          .then(response => this.cargarDatosEnTabla(response))
          .catch(error => console.error(error))
      },
      sendAxios(){
        console.log(this.option, 'AXIOS');  
        this.axios(this.API_URL)
          .then(res => {this.cargarDatosEnTabla(res.data)})
          .catch(error => console.log(error));
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-api {

  }
</style>
