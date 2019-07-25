export default {
  state:{
    a:1
  },
  getters:{
    a: state => state.a
  },
  actions:{
    action1: function(oContext){
      oContext.commit('mutation1', "2");
    }
  },
  mutations:{
    mutation1: function(state, newState){
      state.a = newState;
    }
  }
}
