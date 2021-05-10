<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleDrawer" />

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />

        <v-btn
          v-for="(link, i) in links"
          :key="i"
          v-bind="link"
          class="hidden-sm-and-down"
          text
          @click="onClick($event, link)"
        >
          {{ link.text }}
        </v-btn>


        <template v-if="!getAccessToken">
        <v-spacer />
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on" @click="registForm">
            회원가입
          </v-btn>
          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                  로그인
                </v-btn>
              </template>
              <span>{{ getUserName }}</span>
              <v-card>
                <v-card-title class="headline grey lighten-2">
                  로그인
                </v-card-title>

                <v-col cols="12">
                  <v-text-field label="Email*" v-model="user.email" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    v-model="user.pwd"
                    required
                  ></v-text-field>
                </v-col>

                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn @click="searchPwd">비밀번호 찾기</v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="login">
                    로그인
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>
        <template v-else>
          <v-spacer />
          <span>{{getUserName}}님 환영합니다.</span>
          <v-btn color="red lighten-2" dark @click="logout">로그아웃</v-btn>
        </template>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CoreAppBar",

  computed: {
    ...mapGetters(["links","getAccessToken", "getUserEmail", "getUserName", "getRole"])
  },

  methods: {
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();

      if (item.to || !item.href) return;

      this.$vuetify.goTo(item.href.endsWith("!") ? 0 : item.href);
    },
    searchPwd() {
      this.dialog = false;
      this.$router.push("/searchPwd");
    },
    login: function() {
      this.dialog = false;
      // LOGIN 액션 실행
      // 서버와 통신(axios)을 해 토큰값을 얻어야 하므로 Actions를 호출.
      this.$store
        .dispatch('LOGIN', this.user);
      console.log(this.$store.getters.getAccessToken);
    },
      logout() {
      this.$store
        .dispatch("LOGOUT")
        .then(() => this.$router.replace("/").catch(() => {}));
    },
    registForm(){
      this.$router.push("/regist");
    }
  },
  data() {
    return {
      dialog: false,
      user:{
        email:'',
        pwd:'',
      }
    };
  },

};
</script>
