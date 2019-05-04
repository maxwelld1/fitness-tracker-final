<template>
<div>
    <h1 v-if="Globals.user">{{Globals.user.name}} Friends Page</h1>
    <ul>
        <li v-for="pending in pendingRequests" :key="pending.id">
            <img v-if="pending.ProfilePic" alt="foo" :src="pending.ProfilePic" height="150">
            {{pending.FirstName}} {{pending.LastName}}
            <button v-on:click="confirmReq($event, pending.id)" class="btn btn-primary btn-block btn-accept">Accept</button>
            <button v-on:click="deleteReq($event, pending.id)" class="btn btn-primary btn-block btn-deny">Deny</button>
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
import { GetFriends, GetPendingRequests, ConfirmRequest, DeleteRequest } from '@/models/users';
import toastr from 'toastr';

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
  methods: {
    async confirmReq(event, frid) {
      await ConfirmRequest(frid);
      toastr.success('Friend request accepted!');
    },
    async deleteReq(event, frid) {
      await DeleteRequest(frid);
      toastr.warning('Friend request denied!');
    },
  },
};
</script>

<style>
</style>
