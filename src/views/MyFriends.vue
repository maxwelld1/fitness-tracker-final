<template>
<div>
    <h1 v-if="Globals.user">{{Globals.user.name}} Friends Page</h1>
    <ul>
        <li v-for="pending in pendingRequests" :key="pending.id">
            <img v-if="pending.ProfilePic" alt="foo" :src="pending.ProfilePic" height="150">
            {{pending.FirstName}} {{pending.LastName}}
            <button class="btn btn-primary btn-block">Accept</button>
        </li>
        <li v-for="friend in friends" :key="friend.id">
            <img v-if="friend.ProfilePic" alt="foo" :src="friend.ProfilePic" height="150">
            {{friend.FirstName}} {{friend.LastName}}
        </li>
    </ul>
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { GetFriends, GetPendingRequests } from '@/models/users';

export default {
  data() {
    return {
      Globals,
      friends: [],
      pendingRequests: [],
    };
  },
  async mounted() {
    this.friends = (await GetFriends()).filter(user => user.id !== Globals.user.id);
    this.pendingRequests = await GetPendingRequests();

    // console.log(this.friends);
    // console.log(Globals.user.id);
  },
};
</script>

<style>
</style>
