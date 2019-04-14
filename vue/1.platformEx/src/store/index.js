import Vue from 'vue'
import Vuex from 'vuex'
import storeDemo from '@/store/storeDemo'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    storeDemo
  }
});
