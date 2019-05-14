<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar light color="white">
            <v-toolbar-title>REGISTER</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="login" label="Email" type="email"></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
              <v-text-field prepend-icon="account_circle" name="firstname" label="First name" type="text"></v-text-field>
              <v-text-field prepend-icon="account_circle" name="lastname" label="Last name" type="text"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="yellow" light>Register</v-btn>
            <v-btn light to="/login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
