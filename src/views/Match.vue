<template>
  <div>
    <v-container>
      <v-layout column align-center>
        <v-flex>Top bar</v-flex>
        <v-flex class="match-teams">
          <v-layout justify-space-around>
            <div>
              <img class="team-logo" :src="homeTeam.crestUrl" alt="logo" />
            </div>
            <div>
              <img class="team-logo" :src="awayTeam.crestUrl" alt="logo" />
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["id"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("matches", {
      getMatchById: "getMatchById"
    })
  },
  computed: {
    ...mapGetters("matches", {
      match: "selectedMatch"
    }),
    ...mapGetters("teams", {
      homeTeam: "homeTeam",
      awayTeam: "awayTeam"
    }),

    date() {
      var date = new Date(this.match.utcDate);
      var h = date.getHours();
      var m = date.getMinutes();

      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      m = checkTime(m);

      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";

      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      return `${weekday[date.getDay()].slice(0, 3)} ${date.getDate()} ${
        month[date.getMonth()]
      }
              ${h}:${m}h.`;
    }
  },
  created() {
    this.getMatchById(this.id);
  }
};
</script>

<style lang="scss" scoped>
.match-teams {
  width: 100%;
}

.team-logo {
  height: 100px;
}
</style>

