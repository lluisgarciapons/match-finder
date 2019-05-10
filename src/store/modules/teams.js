import axios from "axios";

const defaultState = {
  payload: [],
  loading: false,
  homeTeam: {},
  awayTeam: {},
  selected: {}
};

const actions = {
  getTeamById: (context, payload) => {
    context.commit("LOADING", true);
    axios({
      method: "GET",
      url: `http://api.football-data.org/v2/teams/${payload.id}`,
      headers: {
        "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01"
      }
    })
      .then(response => {
        console.log("selectedTeam: ", response);
        context.commit("SAVE_TEAM", {
          type: payload.type,
          data: response.data
        });
        context.commit("LOADING", false);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const mutations = {
  SAVE_TEAMS: (state, payload) => {
    state.payload = payload;
  },

  SAVE_TEAM: (state, payload) => {
    state[payload.type] = payload.data;
  },

  LOADING: (state, payload) => {
    state.loading = payload;
  }
};

const getters = {
  teams: state => state.payload,
  loading: state => state.loading,
  selectedTeam: state => state.selected,
  homeTeam: state => state.homeTeam,
  awayTeam: state => state.awayTeam
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
};
