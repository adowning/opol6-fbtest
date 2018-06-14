<template>
  <v-footer flat dense dark style="max-height: 18px;" app>
    <v-spacer/>
    <v-spacer/>
    <i class="material-icons dark">tag_faces</i>
  </v-footer>
</template>

<script>

  export default {
    name: "AFooter",
    data: () => ({
      rightDrawer: false,
      src: "../../images/assets/logo.png",
      chatMessages: ""
    }),
    computed: {},
    watch: {},
    mounted() {
      this.getPhoto()
    },
    methods: {

      setError(err) {
        this.error = err.message || err
      },

      getPhoto: function() {

      }
    }
  }
</script>

<style>
  .footer {
    position: fixed;
    right: 0;
    min-height: 18px;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background-color: #0092db !important;
    text-align: center;
    -webkit-app-region: drag;
  }
</style>
