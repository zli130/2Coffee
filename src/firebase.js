import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyA3Z49yGx2FuF5waiEpiQNCqFOSAyRuyvE',
  authDomain: 'john-2c602.firebaseapp.com',
  databaseURL: 'https://john-2c602.firebaseio.com',
  projectId: 'john-2c602',
  storageBucket: 'john-2c602.appspot.com',
  messagingSenderId: '606182141935'
})

export const db = app.database()

export const menuRef = db.ref('menus')

export const orderRef = db.ref('orders')

export const orderItemRef = db.ref('order_items')
