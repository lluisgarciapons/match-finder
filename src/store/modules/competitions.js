import axios from "axios";

const defaultState = {
  payload: [],
  loading: false
};

const actions = {
  getCompetitions: context => {
    context.commit("LOADING");
    axios({
      method: "GET",
      url: "https://api.football-data.org/v2/competitions?plan=TIER_ONE",
      headers: {
        "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01"
      }
    })
      .then(response => {
        console.log(response);
        context.commit("SAVE_COMPETITIONS", response.data.competitions);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const mutations = {
  SAVE_COMPETITIONS: (state, payload) => {
    state.payload = payload;
    state.loading = false;
  },

  LOADING: state => {
    state.loading = true;
  }
};

const getters = {
  competitions: state => state.payload,
  loading: state => state.loading
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
};
