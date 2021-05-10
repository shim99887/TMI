<template>
  <v-form class="container" ref="form" v-model="valid" @submit="onSubmit" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-row>
      <v-col cols="12" md="10">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-col>
      <v-btn class="mt-10" @click="sendVerifyCode">이메일 인증</v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" md="10">
        <v-text-field v-model="verityCode" label="인증번호 입력" required />
      </v-col>
      <v-btn class="mt-10" @click="verifyBtn">인증</v-btn>
    </v-row>
    <span v-if="verifys">인증 완료</span>

    <v-text-field
      v-model="pwd"
      :rules="nameRules"
      type="password"
      label="Password"
      required
    ></v-text-field>

    <v-text-field
      v-model="chkpwd"
      :rules="[(pwd === chkpwd) || 'pass']"
      type="password"
      label="Check Password"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" type="submit" @click="onSubmit(event)">
      회원가입
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      초기화
    </v-btn>
  </v-form>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    verifys: false,
    verityCode: "",
    select: null,

    checkbox: false,
    pwd: "",
    chkpwd: '',
    chkpwdRule:[
      v => v || 'password not equal',
    ]
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    sendVerifyCode() {
      const params = new URLSearchParams();
      params.append("email", this.email);
      axios
        .post("http://localhost:3000/sub/service/mail", params)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    verifyBtn() {
      const params = new URLSearchParams();
      params.append("code", this.verityCode);
      axios
        .post("http://localhost:3000/sub/service/verifyCode", params)
        .then(response => {
          if (response.data == 1) {
            this.verifys = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(event){
        this.$refs.form.validate();
      if(!this.verifys){
        event.preventDefault();
      }
    }
  }
};
</script>
