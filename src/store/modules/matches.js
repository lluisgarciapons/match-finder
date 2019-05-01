import axios from "axios";

const defaultState = {
  payload: [],
  loading: false,
  selected: {}
};

const actions = {
  getTodayMatches: (context, date) => {
    context.commit("LOADING", true);
    // context.commit("LOADING");
    // let now = new Date();
    // let year = now.getFullYear();
    // let month = now.getMonth() + 1;
    // if (month < 10) month = `0${month}`;
    // let day = now.getDate();
    // let date = `${year}-${month}-${day}`;
    // let date = `2019-04-27`; // Testing date
    axios({
      method: "GET",
      url: `http://api.football-data.org/v2/matches?dateFrom=${date}&dateTo=${date}`,
      headers: {
        "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01"
      }
    })
      .then(response => {
        console.log("today's matches: ", response);
        context.commit("SAVE_MATCHES", response.data.matches);
        context.commit("LOADING", false);
      })
      .catch(error => {
        console.log(error);
      });
  },

  getCurrentMatchDayMatches: (context, matchDay) => {
    context.commit("LOADING", true);
    let competitionId = context.rootState.competitions.selected.id;
    axios({
      method: "GET",
      url: `http://api.football-data.org/v2/competitions/${competitionId}/matches?matchday=${matchDay}`,
      headers: {
        "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01"
      }
    })
      .then(response => {
        console.log(response);
        context.commit("SAVE_MATCHES", response.data.matches);
        context.commit("LOADING", false);
      })
      .catch(error => {
        console.log(error);
      });
  },

  getMatchById: (context, id) => {
    context.commit("LOADING", true);
    axios({
      method: "GET",
      url: `http://api.football-data.org/v2/matches/${id}`,
      headers: {
        "X-Auth-Token": "3bcd6e5663a94bba833d420110684b01"
      }
    })
      .then(response => {
        console.log("selected match: ", response);
        context.commit("SAVE_SEL_MATCH", response.data);

        // When receive match info, dispatchs action from teams to get both home and away team
        context.dispatch(
          "teams/getTeamById",
          { id: response.data.match.homeTeam.id, type: "homeTeam" },
          {
            root: true
          }
        );
        context.dispatch(
          "teams/getTeamById",
          { id: response.data.match.awayTeam.id, type: "awayTeam" },
          {
            root: true
          }
        );
        context.commit("LOADING", false);
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

  SAVE_SEL_MATCH: (state, payload) => {
    state.selected = payload;
    state.loading = false;
  },

  LOADING: (state, payload) => {
    state.loading = payload;
  }
};

const getters = {
  matches: state => state.payload,
  loading: state => state.loading,
  selectedMatch: state => state.selected.match
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
};
