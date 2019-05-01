<template>
  <v-card class="match-card" :to="`/match/${match.id}`">
    <div class="team-part">
      <div class="score score-home">
        {{
          match.score.fullTime.homeTeam === null
            ? "-"
            : match.score.fullTime.homeTeam
        }}
      </div>
      <div>{{ match.homeTeam.name }}</div>
    </div>
    <span class="match-date">
      {{ date(match) }}
    </span>
    <span class="status"
      ><i :class="classObject(match)"></i> {{ match.status }}</span
    >
    <span class="from">{{ match.competition.name }}</span>
    <div class="team-part">
      <div class="score score-away">
        {{
          match.score.fullTime.awayTeam === null
            ? "-"
            : match.score.fullTime.awayTeam
        }}
      </div>
      <div class="team-name">{{ match.awayTeam.name }}</div>
    </div>
  </v-card>
</template>

<script>
// import { mapMutations } from "vuex";
export default {
  props: ["match"],
  methods: {
    // ...mapMutations("matches", {
    //   saveSelectedMatch: "SAVE_SEL_MATCH"
    // }),

    classObject(match) {
      switch (match.status) {
        case "SCHEDULED":
          return "far fa-calendar-alt scheduled";
        case "FINISHED":
          return "far fa-check-circle finished";
        case "LIVE":
          return "far fa-futbol live";
        case "IN_PLAY":
          return "far fa-futbol in-play";
        case "PAUSED":
          return "far fa-pause-circle paused";
        case "POSTPONED":
          return "fas fa-history postponed";
        case "SUSPENDED":
          return "fas fa-skull-crossbones suspended";
        case "CANCELLED":
          return "far fa-times-circle cancelled";
        default:
          return "";
      }
    },

    date(match) {
      var date = new Date(match.utcDate);
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
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Quicksand");

.match-card {
  font-family: "Quicksand", sans-serif;
  color: rgb(224, 224, 224);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 10px;
}

.team-part {
  display: flex;
  height: 60px;
  align-items: center;
  font-size: 16px;
  margin: 0 15px;
}

.team-part:first-of-type {
  border-bottom: 1px solid rgb(255, 255, 255);
}

.score {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 40px;
  box-sizing: border-box;
  width: 63px;
  height: 72px;
  padding: 0 20px;
  margin: 0 30px 0 10px;
  border-radius: 10px;
  background-color: rgb(92, 92, 92);
}

.score-away {
  align-items: flex-end;
}

.match-date {
  color: white;
  position: absolute;
  background-color: rgb(204, 1, 96);
  border: 1px solid white;
  border-radius: 25px;
  font-size: 12px;
  padding: 0 5px;
  margin-left: 15px;
}

.status,
.from {
  color: white;
  position: absolute;
  right: 0;
  margin-right: 15px;
  padding-bottom: 15px;
  font-size: 10px;
  vertical-align: middle;
}

.far,
.fas {
  margin-right: 5px;
  padding-bottom: 5px;
  font-size: 12px;
}

.finished {
  color: rgb(114, 114, 114);
}

.in-play,
.live {
  color: rgb(102, 218, 102);
}

.paused {
  color: rgb(238, 238, 77);
}

.cancelled,
.suspended {
  color: rgb(233, 68, 68);
}

.from {
  padding-bottom: 0;
  padding-top: 15px;
}
</style>


