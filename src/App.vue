<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      light
    >
    <v-list class="pt-0">
      <v-list-tile v-for="route in routerLists" :to="route.route" :key="route.name">
        <v-list-tile-action>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ route.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <router-view></router-view>
    <v-footer fixed>
      <span>{{ title }} &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        title: '$2 Coffee',
        routerLists: [
          {title: 'Place Order', description: 'User orders', route: '/', icon: 'room_service'},
          {title: 'Menu Management', description: 'Admin menu management', route: '/menus', icon: 'restaurant_menu'},
          {title: 'Order Dashboard', description: 'Admin orders management', route: '/orders', icon: 'today'}
        ]
      }
    }
  }
</script>
