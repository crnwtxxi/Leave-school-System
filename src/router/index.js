import Vue from 'vue'
import Router from 'vue-router'
import qs from 'qs'
import axios from 'axios'
import xss from 'xss'
import md5 from 'js-md5'

//引入 Element UI 组件
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Router)
Vue.use(ElementUI)

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.prototype.$xss = xss
Vue.prototype.$md5 = md5
Vue.prototype.Base64 = require('js-base64').Base64

// axios.defaults.baseURL = '/'  //每次发送的请求都会带一个/api的前缀

//防止访问重复路由报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

//引入路由组件
import home from '@/components/Home';
import login from '@/components/Login';
import announce from '@/components/Announce';
//student组件
import student from '@/components/student/StuMain';
import schedule from '@/components/student/Schedule';
import information from '@/components/student/Information';
import changepwd from '@/components/student/ChangePwd';
import surveylist from '@/components/student/SurveyList';
import survey from '@/components/student/Survey';
//teacher组件
import teacher from '@/components/teacher/TeaMain';
import changepwd2 from '@/components/teacher/ChangePwd2';
import uploaddata from '@/components/teacher/UploadData';
import querydataS from '@/components/teacher/QueryDataS';
import querydataO from '@/components/teacher/QueryDataO';
import querydataF from '@/components/teacher/QueryDataF';
import querydataL from '@/components/teacher/QueryDataL';
import querydataD from '@/components/teacher/QueryDataD';
import statistic from '@/components/teacher/Statistic';
import postsurvey from '@/components/teacher/PostSurvey';
import managesurvey from '@/components/teacher/ManageSurvey';
import configsurvey from '@/components/teacher/ConfigSurvey';
import postannounce from '@/components/teacher/PostAnnounce';
import manageannounce from '@/components/teacher/ManageAnnounce';
import manageauthority from '@/components/teacher/ManageAuthority';
import displaylog from '@/components/teacher/DisplayLog';
import datacollect from '@/components/teacher/DataCollect';
import collectdetail from '@/components/teacher/CollectDetail';
//弹框组件
import addAdmin from '@/components/popup/AddAdmin';
import addStudent from '@/components/popup/AddStudent';
import addOffice from '@/components/popup/AddOffice';
import addLibrary from '@/components/popup/AddLibrary';
import addFinance from '@/components/popup/AddFinance';
import addDorm from '@/components/popup/AddDorm';
import modifyAdminInfo from '@/components/popup/ModifyAdminInfo';
import modifyLibraryInfo from '@/components/popup/ModifyLibraryInfo';
import modifyFinanceInfo from '@/components/popup/ModifyFinanceInfo';
import modifyDormInfo from '@/components/popup/ModifyDormInfo';
import modifySuperInfo from '@/components/popup/ModifySuperInfo';
import modifyOfficeInfo from '@/components/popup/ModifyOfficeInfo';
import teannounce from '@/components/teacher/Announce';
import advancedSearch from '@/components/popup/AdvancedSearch';


//暴露路由对象
export default new Router({
  routes: [{
      path: '/',
      component: home
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/announce',
      name: 'announce',
      component: announce
    }, {
      path: '/student',
      component: student,
      children: [{
          path: '',
          name: '',
          component: changepwd
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: schedule
        }, {
          path: 'information',
          name: 'information',
          component: information
        }, {
          path: 'changepwd',
          name: 'changepwd',
          component: changepwd
        }, {
          path: 'surveylist',
          name: 'surveylist',
          component: surveylist
        },{
            path:'survey',
            name:'survey',
            component:survey
        }
      ]
    },
    {
      path: '/teacher',
      component: teacher,
      name: 'teacher',
      children: [{
          path: '',
          name: '',
          component: changepwd2
        },
        {
          path: 'changepwd2',
          name: 'changepwd2',
          component: changepwd2
        }, {
          path: 'uploaddata',
          name: 'uploaddata',
          component: uploaddata
        }, {
          path: 'querydataS',
          name: 'querydataS',
          component: querydataS
        }, {
          path: 'querydataO',
          name: 'querydataO',
          component: querydataO
        }, {
          path: 'querydataF',
          name: 'querydataF',
          component: querydataF
        }, {
          path: 'querydataL',
          name: 'querydataL',
          component: querydataL
        }, {
          path: 'querydataD',
          name: 'querydataD',
          component: querydataD
        }, {
          path: 'statistic',
          name: 'statistic',
          component: statistic
        }, {
          path: 'postsurvey',
          name: 'postsurvey',
          component: postsurvey
        }, {
          path: 'managesurvey',
          name: 'managesurvey',
          component: managesurvey
        }, {
          path: 'configsurvey',
          name: 'configsurvey',
          component: configsurvey
        }, {
          path: 'postannounce',
          name: 'postannounce',
          component: postannounce
        }, {
          path: 'manageannounce',
          name: 'manageannounce',
          component: manageannounce
        }, {
          path: 'manageauthority',
          name: 'manageauthority',
          component: manageauthority
        }, {
          path: 'teannounce',
          name: 'teannounce',
          component: teannounce
        },{
          path: 'displaylog',
          name: 'displaylog',
          component: displaylog
        },{
          path: 'datacollect',
          name: 'datacollect',
          component: datacollect
        },{
          path: 'collectdetail',
          name: 'collectdetail',
          component: collectdetail
        }
      ]
    },
    {
      path: '/modifyAdminInfo',
      component: modifyAdminInfo
    },
    {
      path: '/addAdmin',
      component: addAdmin
    },
    {
      path: '/modifyLibraryInfo',
      component: modifyLibraryInfo
    },
    {
      path: '/addLibrary',
      component: addLibrary
    },
    {
      path: '/modifyFinanceInfo',
      component: modifyFinanceInfo
    },
    {
      path: '/addFinance',
      component: addFinance
    },
    {
      path: '/modifyDormInfo',
      component: modifyDormInfo
    },
    {
      path: '/addDorm',
      component: addDorm
    },
    {
      path: '/modifySuperInfo',
      component: modifySuperInfo
    },
    {
      path: '/addStudent',
      component: addStudent
    },
    {
      path: '/modifyOfficeInfo',
      component: modifyOfficeInfo
    },
    {
      path: '/addOffice',
      component: addOffice
    },
    {
      path: '/advancedSearch',
      component: advancedSearch
    }
  ]
})
