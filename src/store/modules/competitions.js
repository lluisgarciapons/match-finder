import axios from "axios";

const defaultState = {
  payload: [],
  loading: false,
  selected: {}
};

const actions = {
  getCompetitions: context => {
    context.commit("LOADING", true);
    axios({
      method: "GET",
      url: "https://api.football-data.org/v2/competitions?plan=TIER_ONE",
      headers: {
        "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01"
      }
    })
      .then(response => {
        console.log("all competitions: ", response);
        context.commit("SAVE_COMPETITIONS", response.data.competitions);
        context.commit("LOADING", false);
      })
      .catch(error => {
        console.log(error);
      });
  },

  getSelectedCompetition: (context, id) => {
    context.commit("LOADING", true);
    axios({
      method: "GET",
      url: `https://api.football-data.org/v2/competitions/${id}`,
      headers: {
        "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01"
      }
    })
      .then(response => {
        console.log(response);
        context.commit("SAVE_SEL_COMPETITION", response.data);
        context.commit("LOADING", false);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const mutations = {
  SAVE_COMPETITIONS: (state, payload) => {
    state.payload = payload;
  },

  SAVE_SEL_COMPETITION: (state, payload) => {
    state.selected = payload;
  },

  LOADING: (state, payload) => {
    state.loading = payload;
  }
};

const getters = {
  competitions: state => state.payload,
  loading: state => state.loading,
  selectedCompetition: state => state.selected
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
};
