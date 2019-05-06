<template>
  <div class="row">
    <div class="col">
      <h1>Hi {{name}}!</h1>
      <!--input v-model="age" type="text" class="form-control" placeholder="Age" /-->
      <p>This is Darrell's Web Fitness Tracker. Here you can keep track of your exercises and personal records!</p>
    </div>
  </div>
</template>

<script>
import { Globals } from '@/models/api';

export default {
  data: () => ({
    Globals,
    name: Globals.user.FirstName,
  }),
};
</script>

<style type="scss">
</style>
