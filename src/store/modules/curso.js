import { client } from '../actions';

const url = '/api/curso/cursos/';
const cursos = {
  title: 'Lista de Cursos',
  data: [],
};

const actions = {
  LOAD_COURSES_PROFESSOR: ({ commit, state }, { id }) => {
    client.get(`${url}?docente=${id}`).then((response) => {
      state.code = response.status;
      state.available = true;
      commit('SUCCESSFUL_INFORMATION', { info: response.status });
      commit('SET_COURSES_LIST', { list: response.data.results });
    }).catch((error) => {
      commit('ERROR_INFORMATION', { information: error.config });
    });
  },
};

const mutations = {
  SET_COURSES_LIST: (state, { list }) => {
    state.data = list;
  },
};

const getters = {

};
export default {
  state: cursos,
  mutations,
  actions,
  getters,
};
