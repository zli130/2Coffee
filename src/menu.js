import {menuRef} from './firebase'

export const menu = {
  name: '',
  description: '',
  unitPrice: 2,
  available: true,
  optionName: ''
}

export const valid = function () {
  if (this.menu.name.length <= 6) {
    return false
  }
  if (this.menu.description.length <= 6) {
    return false
  }
  if (!(!isNaN(parseFloat(this.menu.unitPrice)) && isFinite(this.menu.unitPrice)) || this.menu.unitPrice <= 0) {
    return false
  }
  return true
}

export const setOptionName = function () {
  this.menu.optionName = this.menu.name + ' $' + this.menu.unitPrice
}

export const save = function () {
  if (this.valid()) {
    this.setOptionName()
    menuRef.push(this.menu)
  }
}
