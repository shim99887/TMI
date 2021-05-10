import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: 'Home',
        href: '#!',
      },
      {
        text: 'About',
        href: '#about',
      },
    ],
    accessToken: null,
    userEmail: '',
    userName: '',
    role: '',
  },
  getters: {
    categories: state => {
      const categories = []

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          href: '#!',
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories)
    },
    getAccessToken(state) {
      return state.accessToken;
    },
    getUserEmail(state) {
      return state.userEmail;
    },
    getUserName(state) {
      return state.userName;
    },
    getRole(state) {
      return state.role;
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    LOGIN(state, payload) {
      state.accessToken = payload['auth-token'];
      state.userEmail = payload['user-email'];
      state.userName = payload['user-name'];
      state.role = payload['role'];
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.userEmail = '';
      state.userName = '';
      state.role = '';
    },
    REGIST(state, payload) {
      state.accessToken = payload['auth-token'];
      state.userEmail = payload['user-email'];
      state.userName = payload['user-name'];
    },
  },
  actions: {
    LOGIN(context, user) {
      const params = new URLSearchParams();
      params.append('email', user.email);
      params.append('pwd', user.pwd);

      return axios.post(`${SERVER_URL}user/confirm/login`, params // pwd: user.pwd,
        // name:'',
        // role:''
      ).then((response) => {
        if (response.data.message) {
          alert('아이디 또는 비밀번호를 틀렸습니다.');
        }

        console.log(response);
        context.commit('LOGIN', response.data);
        axios.defaults.headers.common['auth-token'] = `${response.data['auth-token']}`;
      });
    },
    LOGOUT(context) {
      context.commit('LOGOUT');
      axios.defaults.headers.common['auth-token'] = undefined;
    },
    REGIST(context, user) {
      return axios
        .post(`${SERVER_URL}/member/join`, user)
        .then((response) => {
          console.log(response);
          context.commit('REGIST', response.data);
          axios.defaults.headers.common['auth-token'] = `${response.data['auth-token']}`;
        })
        .error(() => {});
    },
  },
})
