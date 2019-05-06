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
          <h4 class="card-title">Your Exercise</h4>
          <div class="card-text">
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="WorkoutDate">Workout Date:</label>
                <input type="date" v-model="data.WorkoutDate"
                      class="form-control" name="WorkoutDate" id="WorkoutDate" aria-describedby="helpWorkoutDay" placeholder="Date of your workout">
                <small id="helpWorkoutDate" class="form-text text-muted">Please include the year</small>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <ul>
                <li v-for="exercise in exercises" :key="exercise.id">
                    {{exercise.exercise}}: {{exercise.sets}} (sets) x {{exercise.reps}} (reps)
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { GetWorkouts } from '@/models/workouts';
import toastr from 'toastr';

export default {
  data: () => ({
    data: {},
    exercises: [],
  }),
  methods: {
    async submit() {
      try {
        this.exercises = await GetWorkouts(this.data.WorkoutDate);
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
