import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'mdb-vue-ui-kit/css/mdb.min.css';

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
