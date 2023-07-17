import {createStore} from 'vuex'

export default createStore({
    state: {
        modals: [],
        showNested: {},
        rootPermission: {},
        rootPermissionTitles: {},

        parents:[]
    },
    getters: {
        modals: (state) => state.modals,
        showNested: (state) => state.showNested,
        rootPermission: (state) => state.rootPermission,
        rootPermissionTitles: (state) => state.rootPermissionTitles,
        parents: (state) => state.parents,
        
    },
    mutations: {
        SET_MODAL: (state, response) => {
            state.modals.push(response);
        },
        DELETE_MODAL: (state, response) => {
            state.modals.splice(response, 1);
        },
        SET_ROOT_PERMISSIONTITLES: (state, rootPermissionTitles) => {
            state.rootPermissionTitles = rootPermissionTitles;
          },
        TOGGLE_ACTION: (state, { permission, actionKey }) => {
            permission.action[actionKey] = permission.action[actionKey] === 0 ? 1 : 0;
        },
        SET_PARENTS: (state, parents) => {
            state.parents = parents;
        },
    },
    actions: {
        modalAdd: ({commit}, modalData) => {
            commit("SET_MODAL", modalData);
        },
        modalClose: ({commit, state}, modalKey = state.modals.length - 1) => {
            commit("DELETE_MODAL", modalKey);
        },
        setRootPermissionTitles: ({ commit }, rootPermissionTitles) => {
            commit("SET_ROOT_PERMISSIONTITLES", rootPermissionTitles);
        },
        toggleAction: ({ commit }, payload) => {
            commit("TOGGLE_ACTION", payload);
        },

        findParents: ({ commit, state }, { key }) => {
            let result = [];
            function search(obj, key, path) {

                for (let k in obj) {
                    if (k === key) {
                        result.push(path);
                    } else if (typeof obj[k] === 'object') {
                        search(obj[k], key, path.concat(k));
                    }
                }
            }
      
            search(state.rootPermissionTitles, key, []);
            commit('SET_PARENTS', result);
            return result;
        },

    }
})
