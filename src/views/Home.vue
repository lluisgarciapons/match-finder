<template>
  <div>
    <v-container text-xs-center>
      <v-date-picker></v-date-picker>
      <v-layout v-if="loading" justify-center=""
        ><img src="images/loader.gif" alt="loader"
      /></v-layout>
      <v-layout v-else-if="matches.length > 0" wrap>
        <v-flex xs12 md8 offset-md2 v-for="match in matches" :key="match.id">
          <v-match :match="match"></v-match>
        </v-flex>
      </v-layout>
      <v-layout v-else>
        <v-flex>
          <img width="80%" src="images/not-found.png" alt="not found" />
        </v-flex>
      </v-layout>
    </v-container>
    <pre>{{ matches[0] }}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DatePickerVue from "../components/DatePicker.vue";
import MatchCardVue from "../components/MatchCard.vue";
export default {
  components: {
    "v-match": MatchCardVue,
    "v-date-picker": DatePickerVue
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    ...mapActions("matches", {
      getTodayMatches: "getTodayMatches"
    })
  },
  computed: {
    ...mapGetters("competitions", {
      competitions: "competitions"
    }),
    ...mapGetters("matches", {
      matches: "matches",
      loading: "loading"
    })
  },
  created() {
    this.getTodayMatches(this.today);
  }
};
</script>

<style lang="scss" scoped>
</style>
