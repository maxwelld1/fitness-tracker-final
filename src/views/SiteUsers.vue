<template>
<div>
    <h1>Site Users</h1>
    <ul>
        <li v-for="siteUser in siteUsers" :key="siteUser.id">
            <img v-if="siteUser.ProfilePic" alt="foo" :src="siteUser.ProfilePic" height="150">
            {{siteUser.FirstName}} {{siteUser.LastName}}
            <button v-if="Globals.user" v-on:click="sendFriendReq($event, siteUser.id)" class="btn btn-primary btn-block fr-btn">Send Request</button>
        </li>
    </ul>
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { GetUsers, GetFriends, SendRequest } from '@/models/users';
import toastr from 'toastr';

export default {
  data() {
    return {
      Globals,
      siteUsers: [],
    };
  },
  async mounted() {
    if (Globals.user) {
      try {
        const friends = await GetFriends();
        const friendIDs = [];
        console.log(friendIDs);
        for (var i = 0; i < friends.length; i += 1) {
          friendIDs.push(friends[i].id);
        }
        this.siteUsers = (await GetUsers()).filter(function (e) {
          return this.indexOf(e.id) < 0;
        }, friendIDs).filter(siteUser => siteUser.id !== Globals.user.id);
      } catch {
        this.siteUsers = (await GetUsers()).filter(siteUser => siteUser.id !== Globals.user.id);
      }
    } else {
      this.siteUsers = (await GetUsers()).filter(siteUser => siteUser.id !== Globals.user.id);
    }
  },
  methods: {
    async sendFriendReq(event, reqUser) {
      const friendRequestData = { senderID: Globals.user.id, recipientID: reqUser };
      await SendRequest(friendRequestData);
      toastr.success('Friend request sent!');
    },
  },
};

</script>

<style>
</style>
