import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faInfoCircle, faEye, faEnvelope, faTimes, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'

// Add icons to library
library.add(faHome, faInfoCircle, faEye, faEnvelope, faTimes, faNewspaper, faInstagram, faFacebook, faTwitter)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
