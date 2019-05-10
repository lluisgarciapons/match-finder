<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="day"
    lazy
    width="290px"
  >
    <!-- solo / outline / "" -->
    <v-text-field
      solo
      :loading="loading"
      slot="activator"
      v-model="day"
      prepend-icon="event"
      color="pink lighten-1"
      suffix="Choose Date"
      readonly
    ></v-text-field>
    <v-date-picker
      v-model="when"
      color="pink lighten-1"
      scrollable
      first-day-of-week="1"
      min="2018-08-17"
      max="2019-05-26"
    >
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn
        flat
        color="primary"
        @click="$refs.dialog.save(when), getTodayMatches(when)"
        >OK</v-btn
      >
    </v-date-picker>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      when: new Date().toISOString().substr(0, 10),
      day: new Date().toISOString().substr(0, 10),
      modal: false
    };
  },
  methods: {
    ...mapActions("matches", {
      getTodayMatches: "getTodayMatches"
    })
  },
  computed: {
    ...mapGetters("matches", {
      loading: "loading"
    })
  }
};
</script>

