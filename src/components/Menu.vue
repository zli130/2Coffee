<template>
    <main>
      <v-container fluid>
        <v-flex xs12>
          <v-form>
            <v-text-field
              label="Name"
              v-model="item.name"
              :counter="50"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              label="Description"
              :counter="100"
              :rules="descriptionRules"
              v-model="item.description"
              required
            ></v-text-field>
            <v-text-field
              label="Unit price $"
              v-model="item.unitPrice"
              :rules="priceRules"
              type="number"
              required
            ></v-text-field>
            <v-btn primary dark block type="submit" @click="saveMenu">{{ addText }}</v-btn>
          </v-form>
        </v-flex>
        <v-list two-line dark v-if="menus.length > 0">
          <template v-for="menu in menus">
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-checkbox v-model="menu.available" @click="deactivate(menu)" v-if="menu.available"></v-checkbox>
                <v-checkbox v-model="menu.available" @click="activate(menu)" v-else></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ menu.name }} ${{ menu.unitPrice }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ menu.description }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-container>
    </main>
</template>

<script>
  import {menuRef} from '../firebase'
  import * as Menu from '../menu'
  export default {
    data () {
      return {
        title: '$2 Coffee',
        item: Menu.menu,
        loading: true,
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length > 6 || 'Name must be longer than 6 characters',
          (v) => v.length <= 50 || 'Name must be less than 6 characters'
        ],
        descriptionRules: [
          (v) => !!v || 'Description is required',
          (v) => v.length > 6 || 'Description must be longer than 6 characters',
          (v) => v.length <= 50 || 'Description must be less than 6 characters'
        ],
        priceRules: [
          (v) => !!v || 'Price is required',
          (v) => !!/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.v || 'Price must be in an valid format.',
          (v) => v <= 0 || 'Price must be greater than 0.'
        ]
      }
    },
    firebase: {
      menus: menuRef
    },
    methods: {
      saveMenu: function () {
        let menu = Menu
        menu.menu.name = this.item.name
        menu.menu.description = this.item.description
        menu.menu.unitPrice = this.item.unitPrice
        menu.menu.available = true
        menu.save()
        this.cleanInputs()
      },
      activate: function (menu) {
        let menuData = menuRef.child(menu['.key'])
        menuData.update({
          'available': true
        })
      },
      deactivate: function (menu) {
        let menuData = menuRef.child(menu['.key'])
        menuData.update({
          'available': false
        })
      },
      cleanInputs: function () {
        this.item = Menu.menu
      }
    },
    computed: {
      addText: function () {
        if (this.menus.length > 0) {
          return 'Add new menu'
        }
        return 'Add first menu'
      }
    }
  }
</script>
