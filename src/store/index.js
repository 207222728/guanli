/**
 * index.js Created by SmallFour on 2019/9/28/9:07
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 状态管理对象
  state: {
    done: true,
    token:[]
  },
  // mutations
  mutations: {

  }
})

export default store
