import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


Vue.prototype.serverUrl="https://www.imovietrailer.com/superhero"  //挂在到Vue上可以全局使用




const app = new Vue({
    ...App
})
app.$mount()
