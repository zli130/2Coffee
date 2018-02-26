<template>
  <main>
    <v-container fluid>
      <v-flex xs12>
        <v-form>
          <v-text-field
            label="Name"
            v-model="orderName"
            :counter="20"
            :rules="nameRules"
            required
            minlength="2"
            maxlength="20"
          ></v-text-field>
          <v-flex xs12>
            <v-select
              v-bind:items="menus"
              item-value=".key"
              item-text="optionName"
              label="Select from menu"
              single-line
              bottom
              @change="addItem"
            ></v-select>
          </v-flex>
          <v-flex xs12 v-if="selectedItems.length > 0" class="mb-3">
            <v-btn primary dark block @click="confirmOrder" v-if="selectedItems.length > 0">
              Confirm Order
              <v-icon right small color="grey lighten-1">shopping_cart</v-icon>
              ${{ totalAmount }} ({{ totalItems }})
            </v-btn>
          </v-flex>
        </v-form>
      </v-flex>
      <v-list single-line v-if="selectedItems.length > 0">
        <v-flex xs10 offset-xs1>
          <v-select
            v-bind:items="paymenMethods"
            v-model="thisPay"
            label="Choose a payment method"
            single-line
            bottom
            required
          ></v-select>
        </v-flex>
        <v-flex xs10 offset-xs1 class="mb-2">
          <v-stepper v-model="step">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="getStep > 1">Order</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" :complete="getStep > 2">Confirm</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3" :complete="getStep > 3">Confirm</v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-flex>
        <template v-for="(orderedItem, key) in selectedItems">
          <v-subheader>
            <v-flex xs6>
              {{ orderedItem.name }}
            </v-flex>
            <v-flex xs2>
              <v-text-field v-model="orderedItem.quantity" type="number" required @change="updateItem(orderedItem)"></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs2>
              <v-btn fab dark small color="primary" @click="removeItem(orderedItem)">
                <v-icon dark>cancel</v-icon>
              </v-btn>
            </v-flex>
          </v-subheader>
        </template>
      </v-list>
      <!-- <v-layout row justify-center style="position: relative;">
        <v-dialog lazy absolute v-model="orderSaved">
          <v-card>
            <v-card-title>
              <div class="headline">Use Google's location service?</div>
            </v-card-title>
            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="cleanSavedOrder">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout> -->
    </v-container>
  </main>
</template>

<script>
import * as Firebase from '../firebase'
import * as Menu from '../menu'
import * as Order from '../order'
import * as OrderItem from '../orderitem'

export default {
  name: 'store',
  data () {
    return {
      items: Menu.menu,
      orderName: '',
      orderItems: [],
      selectedItems: [],
      totalItems: 0,
      totalAmount: 0,
      errors: [],
      step: 1,
      paymenMethods: Order.paymenMethods,
      thisPay: '',
      orderSaved: false,
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length > 6 || 'Name must be longer than 6 characters'
      ]
    }
  },
  firebase: {
    menus: Firebase.menuRef
  },
  methods: {
    addItem: function (selected) {
      selected.quantity = 1
      this.selectedItems.push(selected)
      this.menus = this.menus.filter(function (item) {
        return item !== selected
      })
      this.updateOrderTotal()
    },
    removeItem: function (item) {
      var i = this.selectedItems.indexOf(item)
      if (i !== -1) {
        this.selectedItems.splice(i, 1)
      }
      item.quantity = 1
      this.menus.push(item)
      this.updateOrderTotal()
    },
    updateItem: function (item) {
      if (item.quantity <= 0) {
        this.removeItem(item)
      }
      this.updateOrderTotal()
    },
    confirmOrder: function () {
      this.errors = []
      let go = true
      let orderDatetime = new Date()
      if (this.orderName.trim().length < 2) {
        this.errors.push('Name must be longer than 2 characters.')
        go = false
      }
      if (go) {
        let newOrder = Order
        newOrder.order.name = this.orderName
        newOrder.order.datetime = orderDatetime
        newOrder.order.total = this.totalAmount
        newOrder.order.paymenMethod = this.thisPay
        if (newOrder.valid()) {
          var submitOrder = Firebase.orderRef.push(newOrder.order)
          if (submitOrder.key.length > 0) {
            for (var i = 0; i < this.selectedItems.length; i++) {
              let thisItem = this.selectedItems[i]
              let newItem = OrderItem
              newItem.orderItem.unitPrice = thisItem.unitPrice
              newItem.orderItem.linePrice = (thisItem.unitPrice * thisItem.quantity).toFixed(2)
              newItem.orderItem.name = thisItem.name
              newItem.orderItem.description = thisItem.description
              newItem.orderItem.datetime = orderDatetime
              newItem.orderItem.quantity = thisItem.quantity
              newItem.orderItem.orderId = submitOrder.key
              newItem.orderItem.orderName = this.orderName
              if (newItem.valid()) {
                Firebase.orderItemRef.push(newItem.orderItem)
              } else {
                this.errors.push(newItem.errors)
              }
            }
          }
        } else {
          this.errors.push(newOrder.errors)
        }
        if (this.errors.length === 0) {
          this.cleanSavedOrder()
        }
      }
    },
    updateOrderTotal: function () {
      let totalAmount = 0
      let totalItems = 0
      if (this.selectedItems.length > 0) {
        for (var i = 0; i < this.selectedItems.length; i++) {
          totalAmount += this.selectedItems[i].unitPrice * this.selectedItems[i].quantity
          totalItems += parseInt(this.selectedItems[i].quantity)
        }
      }
      this.totalItems = totalItems
      this.totalAmount = totalAmount.toFixed(2)
    },
    nameValid: function () {
      return this.orderName.trim().length >= 2
    },
    cleanSavedOrder: function () {
      this.items = this.menus
      this.orderName = ''
      this.orderItems = []
      this.selectedItems = []
      this.totalItems = 0
      this.totalAmount = 0
      this.errors = []
      this.step = 1
      this.thisPay = ''
      this.orderSaved = false
    }
  },
  computed: {
    getStep: function () {
      if (this.selectedItems.length > 0) {
        if (this.thisPay.length > 0 &&
        this.orderName.length > 0) {
          return 3
        }
        return 2
      }
    }
  }
}
</script>

<style scoped>
</style>
