<template>

  <section class="src-components-formulario-vue">

    <h1>Formulario Vue (Avanzado) TP4</h1>
      <div class="container">
        <vue-form :state="formstate" @submit.prevent="enviar()" class="row" >
          
            <validate tag="label" class="col-lg-12 text-left">
              <span>Nombre*</span>
              <input 
                autocomplete="off" 
                type="text"
                class="form-control" 
                v-model.trim="formData.nombre" 
                name="nombre"
                required
                :minlength="MIN_NOMBRE_LENGTH"
                :maxlength="MAX_NOMBRE_LENGTH"
              />
              
              <!-- :maxlength="MAX_NOMBRE_LENGTH" -->
      
            <field-messages name="nombre" show="$dirty">
              <div class="text-success" >Success!</div>
              <div slot="required" class="text-danger"  >(*) Nombre es un campo requerido</div>
              <div slot="minlength" class="text-danger" >(*) Nombre debe tener al menos {{MIN_NOMBRE_LENGTH}} caracteres</div>
              <div slot="test" class="text-danger">(*) Nombre no debe superar los {{MAX_NOMBRE_LENGTH}} caracteres</div> 
            </field-messages>
            <p>Cant. disponibles: {{ MAX_NOMBRE_LENGTH - formData.nombre.length}}</p>
          </validate>


         
          <br>
          <validate tag="label" class="col-lg-12 text-left">

              <span>Edad*</span>
              <input 
                autocomplete="off" 
                
                class="form-control" 
                v-model.number="formData.edad" 
                name="edad"
                required
                :min="MIN_EDAD"
                :max="MAX_EDAD"
              />
      
            <field-messages name="edad" show="$dirty">
              <div class="text-success" >Success!</div>
              <div slot="required" class="text-danger"  >(*) Edad es un campo requerido</div>
              <div slot="min" class="text-danger">(*) Edad no puede se inferior a {{MIN_EDAD}}</div>
              <div slot="max" class="text-danger">(*) Edad no puede ser superior a {{MAX_EDAD}}</div>
            </field-messages>

          </validate>

          <br>
          <validate tag="label" class="col-lg-12 text-left">

              <span>Email*</span>
              <input 
                autocomplete="off" 
                type="email"
                class="form-control" 
                v-model.trim="formData.email" 
                name="email"
                required
              />
      
            <field-messages name="email" show="$dirty">
              <div class="text-success">Success!</div>
              <div slot="required" class="text-danger">(*) Email es un campo requerido</div>
              <div slot="email" class="text-danger">(*) Email invalido </div>
            </field-messages>

          </validate>
          
          <div class="col-lg-12">
            <button type="submit" class="btn btn-success float-right" :disabled="formstate.$invalid">Enviar</button>
          </div>


      </vue-form>
      </div>
        
      
      
      <br>
      <br>
      <p>Form Data</p>
      <pre>{{formData}}</pre>
      <p>Form State</p>
      <pre>{{formstate}}</pre>

  </section>

</template>

<script >

  export default  {
    name: 'src-components-formulario-vue',
    props: [],
      /*  formData: {
          nombre: null,
          edad: null,
          email: null,
      }, */
    mounted () {

    },
    data(){
      return {
        MIN_NOMBRE_LENGTH: 5,
        MAX_NOMBRE_LENGTH: 15,
        MIN_EDAD: 18,
        MAX_EDAD: 120,
        formstate: {},
        formData: {
          nombre: '',
          email: null,
          edad: null
        }
      }
    },
    methods: {
      enviar: function(){
        console.log("Enviar", {...this.formData} );
        this.formstate._reset();
      },
      isMaxCaracteres(value, max){
        var rta = 0
        if(value){
          return value.toString().length < max
        }
        return rta;
      },
      /* getInitialData: function(){
        
        return this.formData = {
          nombre: null,
          edad: null,
          email: null,
        }
        
      }, */
    },
    computed: {

    }
}


</script>

<style>
  .src-components-formulario-vue {

  }
</style>
