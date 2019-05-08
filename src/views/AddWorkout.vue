<template>
<div class="row">
    <div class="col-lg-6">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <router-link class="nav-link" to="/AddWorkout" active-class="active">Add Workout</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/MyExercise" active-class="active">View Exercise</router-link>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Add a workout:</h4>
        <div class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="Exercise">Exercise</label>
                  <input type="text" v-model="data.Exercise"
                    class="form-control" name="Exercise" id="Exercise" aria-describedby="helpExercise" placeholder="Exercise name">
                  <small id="helpExercise" class="form-text text-muted">Exercise</small>
                </div>
                <div class="form-group">
                  <label for="Sets">Sets</label>
                  <input type="number" v-model="data.Sets"
                    class="form-control" name="Sets" id="Sets" aria-describedby="Sets" placeholder="How many sets?">
                  <small id="helpSets" class="form-text text-muted">Last name</small>
                </div>
                <div class="form-group">
                  <label for="Reps">Reps</label>
                  <input type="number" v-model="data.Reps"
                    class="form-control" name="Reps" id="Reps" aria-describedby="helpReps" placeholder="How many reps?">
                  <small id="helpEmail" class="form-text text-muted">Email</small>
                </div>
                <div class="form-group">
                  <label for="WorkoutDate">Date</label>
                  <input type="date" v-model="data.WorkoutDate"
                    class="form-control" name="WorkoutDate" id="WorkoutDate" aria-describedby="helpDate" placeholder="Day of workout">
                  <small id="helpDate" class="form-text text-muted">Workout date</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
    </div>
    <!--div class="col-lg-6">
      <div class="card border-success" v-if="newUser">
        <div class="card-body">
          <h4 class="card-title">Congrats! You've Registered</h4>
          <p class="card-text">
            {{newUser.FirstName}} {{newUser.LastName}}
          </p>
        </div>
      </div>
    </div-->
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { AddWorkout } from '@/models/workouts';
import toastr from 'toastr';

export default {
  data: () => ({
    data: {},
  }),
  methods: {
    async submit() {
      try {
        this.data.User = Globals.user.id;
        await AddWorkout(this.data);
        toastr.success('Workout submitted!');
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
