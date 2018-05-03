<template>
  <div id="app">
     <transition name="fade">
      <router-view/>
    </transition>
      <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'


export default {
  name: 'App',
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body .weui-cells.vux-no-group-title{
  margin-top:0;
}
.fade-enter-active {
          transition: opacity .5s
        }
         .fade-leave-active {
          transition: opacity 0s
        }
        .fade-enter{
          opacity: 0
        }
        .fade-leave-to{
          opacity: 1
  }
</style>
