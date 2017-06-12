import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    connected: false,
    stations: [],
    playing: null,
    loading: null,
  },
  getters:{
    stations(state){
      return state.stations
    },
    playing (state){
      return state.playing
    },
    loading (state) {
      return state.loading
    }
  },
  mutations: {
    SOCKET_CONNECT: (state) => {
      console.log('Socket connected ...', new Date())
      state.connected = true
    },
    SOCKET_DISCONNECT: (state) => {
      console.log('Socket disconnected ...')
      state.connected = false
    },
    SOCKET_STATIONSLIST: (state, payload) => {
      console.log('GOT STATIONS', payload) // TODO: REMOVE
      state.stations = payload;
    },
    SOCKET_TITLE: (state, title) => {
      console.log('TITLE', title) // TODO: REMOVE
    },
    SOCKET_LOADING: (state, payload) => {
      console.log('LOADING', payload) // TODO: REMOVE
      state.loading = payload;
    }
  }
})