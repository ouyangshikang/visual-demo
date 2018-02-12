// import Vue from 'vue';

export default {
    state: {
        isShow: false
    },
    mutations: {
        enableshow (state) {
            state.isShow = true;
        },
        disableshow (state) {
            state.isShow = false;
        }
    },
    actions: {
        enableshow ({commit}) {
            commit('enableshow');
        },
        disableshow ({commit}) {
            commit('disableshow');
        }
    }
};
