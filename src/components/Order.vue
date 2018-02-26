<template>
  <main>
    <v-container fluid>
      <v-tabs dark fixed icons centered>
      <v-tabs-bar class="cyan">
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item href="#tab-pending">
          <v-icon>access_time</v-icon>
          Pending
        </v-tabs-item>
        <v-tabs-item href="#tab-completed">
          <v-icon>done</v-icon>
          Completed
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          id="tab-pending"
        >
        <v-list subheader>
          <v-subheader>Total: {{  totalItems }}</v-subheader>
          <v-list-tile avatar v-for="orderItem in pedingOrderItems" :key="orderItem['.key']">
            <v-list-tile-action>
              <v-checkbox :model="orderItem.status === `pending`" @click="updateItem(orderItem['.key'])"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              {{ orderItem.name }} X {{ orderItem.quantity }} For {{ orderItem.orderName }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-tabs-content>
        <v-tabs-content
          id="tab-completed"
        >
        <v-list subheader>
          <v-subheader>Total: {{  totalCompletedItems }}</v-subheader>
          <v-list-tile avatar v-for="orderItem in completedOrderItems" :key="orderItem['.key']">
            <v-list-tile-content>
              {{ orderItem.name }} X {{ orderItem.quantity }} For {{ orderItem.orderName }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    </v-container>
  </main>
</template>

<script>
import * as Firebase from '../firebase'

export default {
  data () {
    return {
    }
  },
  firebase: {
    pedingOrderItems: Firebase.orderItemRef.orderByChild('status').equalTo('pending'),
    completedOrderItems: Firebase.orderItemRef.orderByChild('status').equalTo('completed')
  },
  methods: {
    updateItem: function (key) {
      var item = Firebase.orderItemRef.child(key)
      item.update({
        'status': 'completed'
      })
    }
  },
  computed: {
    totalItems: function () {
      let totalItems = 0
      for (var i = 0; i < this.pedingOrderItems.length; i++) {
        totalItems += parseInt(this.pedingOrderItems[i].quantity)
      }
      return totalItems
    },
    totalCompletedItems: function () {
      let totalItems = 0
      for (var i = 0; i < this.completedOrderItems.length; i++) {
        totalItems += parseInt(this.completedOrderItems[i].quantity)
      }
      return totalItems
    }
  }
}
</script>

<style scoped>
</style>
