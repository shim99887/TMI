<!-- <template>
    <div class="user" id="join"> 
        <div class="wrapC table">
            <div class="middle">
                <h1>회원가입</h1>
                <div class="form-wrap">
                    <div class="input-wrap">
                        <b-form-input v-model="name"
                            id="name"
                            :state="nameState"
                            ref="name"
                            placeholder="이름을 입력해주세요" type="text" trim/>
                    </div>

                    <div class="input-wrap">
                         <b-input-group>
                            <b-form-input v-model="email" 
                                id="email"
                                placeholder="이메일을 입력해주세요"
                                type="text"
                                :state="emailState"
                                ref="email"
                                trim
                                />
                            <template #append>
                                <b-button variant="outline-secondary" @click="sendCode">Send Code</b-button>
                            </template>
                         </b-input-group>
                    </div>

                    <div class="input-wrap">
                         <b-input-group>
                            <b-form-input v-model="code" 
                                id="code"
                                placeholder="인증코드를 입력해주세요"
                                type="text"
                                ref="email"
                                trim
                                />
                            <template #append>
                                <b-button variant="outline-secondary" @click="verifyEmail">인증</b-button>
                            </template>
                            <b-icon v-if="emailVerified" icon="check" scale="2" variant="success"></b-icon>
                            <b-icon v-if="!emailVerified" icon="check" scale="2"></b-icon>
                         </b-input-group>
                    </div>

                    <div class="input-wrap password-wrap">
                        <b-form-input v-model="password"
                            id="password" 
                            :type="passwordType"
                            :state="passwordState"
                            ref="password"
                            placeholder="비밀번호를 입력해주세요"/>
                        <span :class="{active : passwordType==='text'}">
                                <i class="fas fa-eye"></i>
                            </span>
                    </div>

                    <div class="input-wrap password-wrap">
                        <b-form-input v-model="passwordConfirm" 
                            id="passwordConfirm"
                            :type="passwordConfirmType"
                            :state="passwordConfirmState"
                            ref="passwordConfirm"
                            placeholder="비밀번호를 한번 더 입력해주세요"/>
                        <span :class="{active : passwordConfirmType==='text'}">
                                <i class="fas fa-eye"></i> 
                            </span>
                    </div>
                </div>

                <label>
                    <input v-model="isTerm" type="checkbox" id="term" ref="isTerm"/>
                    <span>약관에 동의합니다</span>
                </label>

                <span class="go-term">약관 보기</span>

                <b-button class="btn" @click="signUp">
                    <span>
                        작성완료
                    </span>
                </b-button>
            </div>


        </div> 
        

    </div>
</template> -->
<template>
  <v-form class="container" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
    
    <v-row>

    <v-col
    cols="12"
    md="10">

    <v-text-field 
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    </v-col>
    <v-btn class="mt-10">이메일 인증</v-btn>
    </v-row>
    <v-row>
    <v-col
    cols="12"
    md="10">

    <v-text-field 
      v-model="email"
      :rules="emailRules"
      label="인증번호 입력"
      required
    />
    </v-col>
        <v-btn class="mt-10">인증</v-btn>
    </v-row>
    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      로그인
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      초기화
    </v-btn>
  </v-form>
</template>

<script>
    import '../../assets/css/user.scss'
    import axios from 'axios'

    export default {
        components: {
        },
        created(){
            this.$bvModal.hide('modalLogin')

        },
        methods: {
            sendCode() {
                let err = true;
                let msg = '';
                !this.email &&
                    ((msg = '이메일을 입력해 주세요'),
                    (err = false),
                    this.$refs.email.focus());
                if (!err) {
                    alert(msg);
                } else {
                    const params = new URLSearchParams();
                    params.append('email', this.email);
                    axios
                    .post('http://localhost:8000/service/mail', params)
                    .then(() => {
                        alert('이메일을 확인해 주세요!');
                    })
                    .catch((error) => {
                        alert(error);
                    });
                }

            },
            signUp() {
                console.log('signUp Called')

                let err = true;
                let msg = '';
                !this.nameVaild &&
                    ((msg = '이름을 확인해 주세요'),
                    (err = false),
                    this.$refs.name.focus());
                err &&
                    !this.emailVaild &&
                    ((msg = '이메일을 확인해 주세요'),
                    (err = false),
                    this.$refs.email.focus());
                err &&
                    !this.emailVerified &&
                    ((msg = '이메일을 인증해 주세요'),
                    (err = false),
                    this.$refs.code.focus());
                err &&
                    !this.passwordVaild &&
                    ((msg = '비밀번호를 확인해 주세요'),
                    (err = false),
                    this.$refs.password.focus());
                err &&
                    !this.passwordConfirmVaild &&
                    ((msg = '비밀번호 확인이 되지 않았습니다. 다시 확인해 주세요.'),
                    (err = false),
                    this.$refs.passwordConfirm.focus());
                err &&
                    !this.isTerm &&
                    ((msg = '약관에 동의해 주세요'),
                    (err = false),
                    this.$refs.isTerm.focus());

                if (!err) {
                    alert(msg);
                } else {
                    const params = new URLSearchParams();
                    params.append('code', this.code);
                    axios
                    .post('http://localhost:8000/account/signup', params)
                    .then(() => {
                        // 회원가입 처리
                        alert('회원가입이 완료되었습니다!<br>')
                    })
                    .catch((error) => {
                        alert(error);
                    });
                }
            },
            verifyEmail() {
                console.log('verifyEmail called');
                this.emailVerified = !this.emailVerified;
            }
        },
        computed: {
            nameState() {
                console.log(this.nameVaild);
                if(this.name.length > 0) {
                    this.nameVaild = true;
                    return true;
                }
                this.nameVaild = false;
                return false;
            },
            emailState() {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if( re.test(String(this.email).toLowerCase()) ) {
                    this.emailVaild = true;
                    return true;
                }
                this.emailVaild = false;
                return false;
            },
            passwordState() {
                if(this.password.length > 0) {
                    this.emailVaild = true;
                    return true;
                }
                this.emailVaild = false;
                return false;
            },
            passwordConfirmState() {
                if( this.passwordConfirm.length > 0 && this.passwordConfirm===this.password ) {
                    this.passwordConfirmVaild = true;
                    return true;
                }
                this.passwordConfirmVaild = false;
                return false;
            },
        },
        data: () => {
            return {
                email: '',
                code: '',
                name: '',
                password: '',
                passwordConfirm: '',
                isTerm: false,
                passwordType:"password",
                passwordConfirmType:"password",
                emailVerified: false,
                emailVaild: false,
                nameVaild: false,
                passwordVaild: false,
                passwordConfirmVaild: false,
            }
        }

    }

</script>


