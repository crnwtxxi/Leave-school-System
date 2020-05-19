// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import filterXSS from 'xss'
filterXSS.whiteList['input'] = ['type', 'src', 'disabled', 'checked', 'class']
filterXSS.whiteList['img'] = ['src', 'alt', 'title', 'width', 'max-width', 'style', 'height']
filterXSS.whiteList['math'] = []
filterXSS.whiteList['semantics'] = []
filterXSS.whiteList['mrow'] = []
filterXSS.whiteList['mtext'] = []
filterXSS.whiteList['annotation'] = ['encoding']
filterXSS.whiteList['msub'] = []
filterXSS.whiteList['mi'] = []
filterXSS.whiteList['mo'] = []
filterXSS.whiteList['mn'] = []
filterXSS.whiteList['li'] = ['class']
filterXSS.whiteList['span'] = ['class', 'title', 'aria-hidden', 'style']
filterXSS.whiteList['code'] = []
filterXSS.whiteList['li'] = ['class', 'id']
filterXSS.whiteList['td'] = ['style', 'class']
filterXSS.whiteList['p'] = ['style', 'class']
filterXSS.whiteList['div'] = ['style', 'class']
filterXSS.whiteList['a'] = ['style', 'class', 'id', 'target', 'href', 'title']
filterXSS.stripIgnoreTag = true
Vue.prototype.filterXSS = filterXSS;

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
