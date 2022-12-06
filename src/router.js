import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import Formulario from './components/Formulario.vue';
import FormularioVue from './components/FormularioVue.vue';
import Api from './components/Api.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '',             component: HelloWorld },
    { path: '/formulario',  component: Formulario },
    { path: '/formulario-vue',  component: FormularioVue },
    { path: '/api',  component: Api },
  ], 
});