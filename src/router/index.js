import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/logon_index.vue'
import layout from '../views/layout/layout_index.vue'
import home from '@/views/home/home_index.vue'
import question from '@/views/question/question_index.vue'
import video from '@/views/video/video_index.vue'
import my from '@/views/my/my_index.vue'
import search from '@/views/search/search_index.vue'
import artical from '@/views/artical/artical-index.vue'
import userProfile from '@/views/uer-profile/user-profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/artical/:articalId',
    name: 'artical',
    component: artical,
    props: true
  },
  {
    path: '/user/profile',
    name: 'uer-profile',
    component: userProfile
  },
  {
    path : '/login',
    name: 'login',
    component: login
  },
  {
    path :'/',
    name: 'layout',
    redirect: '/home',
    component: layout,
    children:[
      {
        path: '/home',
        name : 'home',
        component: home
      },
      {
        path: 'question',
        name : 'question',
        component: question
      },
      {
        path: 'video', 
        name : 'video',
        component: video
      },
      {
        path: 'my',
        name : 'my',
        component: my
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
]

const router = new VueRouter({
  routes
})

export default router
