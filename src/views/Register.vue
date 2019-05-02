<template>
<div class="row">
    <div class="col-lg-6">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link" to="/Register" active-class="active">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Login" active-class="active">Login</router-link>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Register</h4>
        <div class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="FirstName">First Name</label>
                  <input type="text" v-model="data.FirstName"
                    class="form-control" name="FirstName" id="FirstName" aria-describedby="helpFirstName" placeholder="First Name">
                  <small id="helpFirstName" class="form-text text-muted">First name</small>
                </div>
                <div class="form-group">
                  <label for="LastName">Last Name</label>
                  <input type="text" v-model="data.LastName"
                    class="form-control" name="LastName" id="LastName" aria-describedby="helpLastName" placeholder="Last Name">
                  <small id="helpLastName" class="form-text text-muted">Last name</small>
                </div>
                <div class="form-group">
                  <label for="Email">Email</label>
                  <input type="email" v-model="data.Email"
                    class="form-control" name="Email" id="Email" aria-describedby="helpEmail" placeholder="Your Email">
                  <small id="helpEmail" class="form-text text-muted">Email</small>
                </div>
                <div class="form-group">
                  <label for="Password">Password</label>
                  <input type="password" v-model="data.Password"
                    class="form-control" name="Password" id="Password" placeholder="Password">
                </div>
                <div class="form-group">
                  <label for="Birthday">Birthday</label>
                  <input type="date" v-model="data.Birthday"
                    class="form-control" name="Birthday" id="Birthday" aria-describedby="helpBirthday" placeholder="Your Birthday">
                  <small id="helpBirthday" class="form-text text-muted">Please include the year</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
    </div>
    <div class="col-lg-6">
      <div class="card border-success" v-if="newUser">
        <div class="card-body">
          <h4 class="card-title">Congrats! You've Registered</h4>
          <p class="card-text">
            {{newUser.FirstName}} {{newUser.LastName}}
          </p>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { Register } from '@/models/users';
import toastr from 'toastr';

export default {
  data: () => ({
    data: {},
    newUser: null,
  }),
  methods: {
    async submit() {
      try {
        const m = await Register(this.data);
        this.newUser = m;
        toastr.success("You've registered successfully!");
      } catch (error) {
        Globals.errors.push(error);
        toastr.error(error.message);
      }
    },
  },
};
</script>

<style>
</style>
