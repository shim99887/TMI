<template>
  <div class="container">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        비밀번호 찾기
      </v-card-title>

      <v-col cols="12">
        <v-text-field label="Email*" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field label="생년월일(6자리)*" required></v-text-field>
      </v-col>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text>
          비밀번호 찾기
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
