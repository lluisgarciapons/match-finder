import Vue from "vue";
import Vuex from "vuex";
import competitionsModule from "./modules/competitions";
import matchesModule from "./modules/matches";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    competitions: competitionsModule,
    matches: matchesModule
  }
});
