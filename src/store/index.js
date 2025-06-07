import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
        },
        logout(state) {
            state.currentUser = null;
            localStorage.removeItem('currentUser');
        }
    },
    actions: {
        login({ commit }, user) {
            commit('setCurrentUser', user);
        },
        logout({ commit }) {
            commit('logout');
        }
    }
});