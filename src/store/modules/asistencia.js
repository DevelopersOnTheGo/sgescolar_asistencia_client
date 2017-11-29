import { client } from '../actions';

const url = '/api/asistencia/cursos_asistencia/';
const url1 = '/api/asistencia/asistencias/';
const cursos = {
  title: 'Lista de Cursos',
  fecha: '',
  picked: '',
  temp: [],
  tempArray: [],

  data: [],
};

const actions = {
  LOAD_ESTUDENT_COURSE: ({ commit, state }, { idD, idC }) => {
    client.get(`${url}?docente=${idD}&mis_areas=${idC}`).then((response) => {
      state.code = response.status;
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>><', response);
      state.available = true;
      commit('SUCCESSFUL_INFORMATION', { info: response.status });
      commit('SET_ESTUDENT_LIST', { list: response.data });
    }).catch((error) => {
      commit('ERROR_INFORMATION', { information: error.config });
    });
  },
  LOAD_ESTUDENT_ASISTENCIA: ({ commit, state }, { idD, idC, idF }) => {
    client.get(`${url1}?docente=${idD}&curso=${idC}&fecha=${idF}`).then((response) => {
      state.code = response.status;
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>><', response);
      state.available = true;
      commit('SUCCESSFUL_INFORMATION', { info: response.status });
      commit('SET_ASISTENCIA_LIST', { list: response.data });
    }).catch((error) => {
      commit('ERROR_INFORMATION', { information: error.config });
    });
  },
  EDIT_ESTUDENT_ASISTENCIA: ({ commit, state }) => {
    for (const key in state.data) {
      if (Object.prototype.hasOwnProperty.call(state.data, key)) {
        console.log('que vaor tiene: ', state.data[key]);
        client.put(`${url1}${state.data[key].id}/`, state.data[key]).then((response) => {
          commit('SUCCESSFUL_INFORMATION', { info: response.status });
          console.log(key, response);
        }, () => {
        });
      }
    }
  },
  SAVE_ASISTENCIA_ESTUDENT: ({ commit, state }, { idD, idC }) => {
    console.log('llllllllllllllllllllll', state.data, commit, url1);
    for (const key in state.data) {
      if (Object.prototype.hasOwnProperty.call(state.data, key)) {
        console.log('>>>', key, state.data[key].matricula);
        for (const i in state.data[key].matricula) {
          if (Object.prototype.hasOwnProperty.call(state.data[key].matricula, i)) {
            state.temp.push({
              estado: 'PRESENTE',
              matricula: state.data[key].matricula[i].id,
              curso: idC,
              fecha: state.fecha,
              docente: idD,
            });
          }
          console.log('qqqqqqqqqqqqqqqq', state.temp);
          client.post(url1, state.temp[i]).then((response) => {
            state.code = response.status;
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>><', response);
            state.available = true;
            commit('SUCCESSFUL_INFORMATION', { info: response.status });
          }).catch((error) => {
            commit('ERROR_INFORMATION', { information: error.config });
          });
        }
      }
      if ({}.hasOwnProperty.call(state.data, key)) {
        console.log('<<<', key);
      }
    }
  },
};

const mutations = {
  SET_ESTUDENT_LIST: (state, { list }) => {
    state.data = list;
    console.log('pppppppppppppppppp', state.data);
  },
  SET_ASISTENCIA_LIST: (state, { list }) => {
    state.data = list;
    console.log('listado de asistencia', state.data);
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
