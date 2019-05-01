<template>
  <pre>{{ match }}</pre>
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
