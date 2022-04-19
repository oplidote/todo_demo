export default {
    namespaced: true,
    // vux 에 데이터 변수 설정
    state: {
        // message type list
        toasts: [],
        // toastBox 관련
        showToast: false,
    },
    mutations: {
        ADD_TOAST(state,payload){
            state.toasts.push(payload);
        },
        REMOVE_TOAST(state){
            state.toasts.shift();
        },
        UPDATE_TOAST_STATUS(state, payload) {
            state.showToast = payload;
        }
    },
    actions: {
        triggerToast({ commit }, { message,type}) {
            commit('UPDATE_TOAST_STATUS', true);
            commit('ADD_TOAST', {
                id: Date.now(),
                message,
                type
            });

            setTimeout(() => {
                commit('UPDATE_TOAST_STATUS', false);
                // commit('UPDATE_TOAST_MESSAGE', '');
                // commit('UPDATE_TOAST_ALERT_TYPE', '');
                commit('REMOVE_TOAST');
            }, 5000);
        }
    },
    getters: {
        toastSmileMessage(state) {
            return state.toastMessage + "^^~~";
        }
    }
}