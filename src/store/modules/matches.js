import axios from "axios";

const defaultState = {
  payload: [],
  loading: false
};

const actions = {
  getTodayMatches: context => {
    context.commit("LOADING");
    let date = "2019-04-26"; //change for getting today's date
    axios({
      method: "GET",
      url: `http://api.football-data.org/v2/matches?dateFrom=${date}&dateTo=${date}`,
      headers: {
        "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01"
      }
    })
      .then(response => {
        console.log(response);
        context.commit("SAVE_MATCHES", response.data.matches);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const mutations = {
  SAVE_MATCHES: (state, payload) => {
    state.payload = payload;
    state.loading = false;
  },

  LOADING: state => {
    state.loading = true;
  }
};

const getters = {
  matches: state => state.payload,
  loading: state => state.loading
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
};
