<template>
  <v-app id="inspire" dark>
    <Toolbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template> 

<script>
import Toolbar from "./components/Toolbar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Toolbar,
    Footer
  }
};
</script>