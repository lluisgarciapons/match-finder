<template>
  <v-app id="inspire" dark>
    <Toolbar />
    <v-content>
      <Home />
    </v-content>
    <Footer />
  </v-app>
</template> 

<script>
import Toolbar from "./components/Toolbar.vue";
import Footer from "./components/Footer.vue";
import Home from "./views/Home";
export default {
  components: {
    Toolbar,
    Footer,
    Home
  }
};
</script>