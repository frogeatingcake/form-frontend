import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import Noir from './presets/Noir.js';
import Cyan from './presets/Cyan.js';




const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Cyan,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
 });

app.mount('#app')