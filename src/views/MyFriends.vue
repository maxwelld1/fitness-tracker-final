<template>
<div>
    <h1 v-if="Globals.user">{{Globals.user.name}} Friends Page</h1>
    <ul class="list-group">
      <li v-for="pending in pendingRequests" :key="pending.id"
          class="list-group-item d-flex justify-content-between align-items-center ">
            <img v-if="pending.ProfilePic" alt="foo" :src="pending.ProfilePic" style="height:60px" class="img-thumbnail">
            {{pending.FirstName}} {{pending.LastName}}
            <div class="btn-group btn-group-sm align-items-center" role="group" aria-label="">
              <button v-on:click="confirmReq($event, pending.id)" class="btn btn-primary btn-block btn-accept">Accept</button>
              <button v-on:click="deleteReq($event, pending.id)" class="btn btn-primary btn-block btn-deny">Deny</button>
            </div>
      </li>
      <li v-for="friend in friends" :key="friend.id"
          class="list-group-item d-flex justify-content-between align-items-center ">
            <img v-if="friend.ProfilePic" alt="foo" :src="friend.ProfilePic" style="height:60px" class="img-thumbnail">
            {{friend.FirstName}} {{friend.LastName}}
      </li>
    </ul>
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { GetFriends } from '@/models/users';
import { GetPendingRequests, ConfirmRequest, DeleteRequest } from '@/models/relationships';
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
