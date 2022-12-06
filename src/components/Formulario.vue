<template>

  <section class="src-components-formulario">

    <h1>Formulario TP4</h1>

    <form autocomplete="off" class="" @submit.prevent="enviar()">

      <div class="container">
        <div class="row">
          
          <div class="col-lg-4 text-left">
            <input 
              class="form-control" 
              placeholder="Nombre" 
              type="text" 
              v-model.trim="formData.nombre" 
              @input="
                formDirty.nombre=true; 
                formValid.nombre = !isVacio(formData.nombre) && validateNombreMinLength() && validateNombreMaxLength();
              "
              required>
            <p class="text-danger">{{ isVacio(formData.nombre) && formDirty.nombre ? `(*) Campo requerido` : '' }}</p>
            <p class="text-danger">{{ !validateNombreMinLength() ? `(*) El nombre no puede ser menor a ${ MIN_NOMBRE_LENGTH } caracteres` : '' }}</p>
            <p class="text-danger">{{ !validateNombreMaxLength() ? `(*) El nombre no puede ser mayor a ${ MAX_NOMBRE_LENGTH } caracteres` : '' }}</p>
            <br>
          </div>
          
          <div class="col-lg-4 text-left">
            <input 
              class="form-control" 
              placeholder="Edad" 
              type="text" 
              v-model.number="formData.edad" 
              @input="
                formDirty.edad=true
                formValid.edad= isVacio(formData.edad) && validateMinEdad() && validateMaxEdad()
              " 

              required>
            <p class="text-danger">{{ isVacio(formData.edad) && formDirty.edad ? `(*) Campo requerido` : '' }}</p>
            <p class="text-danger">{{ !validateMinEdad() ? `(*) La edad no puede ser menor a ${ MIN_EDAD }` : '' }}</p>
            <p class="text-danger">{{ !validateMaxEdad() ? `(*) La edad no puede ser mayor a ${ MAX_EDAD }` : '' }}</p>
            <br>
          </div>

          <div class="col-lg-4 text-left">
            <input class="form-control" 
              placeholder="Email" 
              type="text" 
              v-model.trim="formData.email" 
              @input="
                formDirty.email=true;
                formValid.email= !isVacio(formData.email) && validateEmail();
              " 
              required>
            <p class="text-danger">{{ isVacio(formData.email) && formDirty.email ? `(*) Campo requerido` : '' }}</p>
            <p class="text-danger">{{ !validateEmail() ? `(*) Email invalido` : '' }}</p>
            <br>
          </div>
          <div class="col-lg-12 ">
            <button type="submit" class="btn btn-success float-right" :disabled="!isInvalid()">Enviar</button>
            <br>
          </div>
        </div>
      </div>

    </form>

    <h6>Form data</h6>
    <pre>{{formData}}</pre>
    <h6>Form dirty</h6>
    <pre>{{formDirty}}</pre>
    <h6>Form valid</h6>
    <pre>{{formValid}}</pre>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-formulario',
    props: [
      
    ],
    mounted () {

    },
    data () {
      return {
        MIN_NOMBRE_LENGTH: 3,
        MAX_NOMBRE_LENGTH: 15,
        MIN_EDAD: 18,
        MAX_EDAD: 120,
        formData: this.getInitialData(),
        formDirty:this.getInitialDataDirty(),
        formValid: this.getInitialDataValid(),
      }
    },
    methods: {
      getInitialData(){
        return {
          nombre: null,
          edad: null,
          email: null,
        }
      },
      getInitialDataDirty(){
        var formData = this.getInitialData();
        for(var d in formData){
          formData[d] = false;
        }
        return formData;
      },
      getInitialDataValid(){
        var formData = this.getInitialData();
        for(var d in formData){
          formData[d] = false;
        }
        return formData;
      },
      enviar(){
        console.log("Enviar", {...this.formData} );
      },
      isDirty(){
        //al menos 1 campo basureado
        var isDirty = false;
        var i = 0;
        var campos = Object.keys( this.formDirty );
        while(i < campos.length && !isDirty){
          if(this.formDirty[campos[i]]){
            isDirty = true;
          }
          i++;
        }
          
        return isDirty;
      },
      isInvalid(){
        
        var isInvalid = true;

        //hay al menos 1 campo invalido
        var array = Object.values(this.formValid).filter(e => { return e === false });

        if(array.length === 0){
          //si no hay campos invalidos el formulario es valido
          isInvalid = false;
        }

        return isInvalid;

      },
      validateEmail(){

        var valid = true;
        var email = this.formData.email;
        var dirty = this.formDirty.email;

        if(dirty){
          if(email){
            if(!email.includes('@')){
              valid = false;
            }
          }
        }

        return valid;
      },
      validateNombreMinLength(){

        var valid = true;
        var nombre = this.formData.nombre;
        var dirty = this.formDirty.nombre;

        if(dirty){
          if(nombre){
            if(nombre.length < this.MIN_NOMBRE_LENGTH){
              valid = false;
            }
          }
        }

        return valid;
      },
      validateNombreMaxLength(){

        var valid = true;
        var nombre = this.formData.nombre;
        var dirty = this.formDirty.nombre;

        if(dirty){
          if(nombre){
            if(nombre.length > this.MAX_NOMBRE_LENGTH){
              valid = false;
            }
          }
        }

        return valid;

      },
      validateMaxEdad(){
        
        var valid = true;
        var edad = this.formData.edad;
        var dirty = this.formDirty.edad;

        if(dirty){
          if(edad > this.MAX_EDAD){
            valid = false;
          }
        }
        
        return valid;
      },
      validateMinEdad(){

        var valid = true;
        var edad = this.formData.edad;
        var dirty = this.formDirty.edad;

        if(dirty){
          if(edad < this.MIN_EDAD){
            valid = false;
          }
        }
        return valid;
      },
      isVacio(str){
        var rta = true;
        if(str !== null && str !== undefined){
          if(str.toString().trim().length > 0){
            rta = false;
          }
        }
        return rta;
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  /*
    scoped = solo se aplican estos estilos al componente en el que se encuentra
    lang = css
  */
  .src-components-formulario {
    
  }
</style>
