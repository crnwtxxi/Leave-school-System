<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="isRouterAlive" style="height:100%;"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
      return {
          reload: this.reload                                              
      }
  },
  data() {
      return{
          isRouterAlive: true                    //控制视图是否显示的变量
      }
  },
  methods: {
      reload () {
          this.isRouterAlive = false;            //先关闭，
          this.$nextTick(function () {
              this.isRouterAlive = true;         //再打开
          }) 
      }
  }
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-size: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
