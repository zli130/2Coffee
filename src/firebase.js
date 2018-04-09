import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'FIREBASE_KEY',
  authDomain: 'FIREBASE_DOMAIN',
  databaseURL: 'FIREBASE_URL',
  projectId: 'FIREBASE_PROJECT_ID',
  storageBucket: 'FIREBASE_STORAGE,
  messagingSenderId: 'MESSAGE_SENDER_ID'
})

export const db = app.database()

export const menuRef = db.ref('menus')

export const orderRef = db.ref('orders')

export const orderItemRef = db.ref('order_items')
