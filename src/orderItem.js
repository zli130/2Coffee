export const orderItem = {
  orderId: 0,
  unitPrice: '',
  linePrice: '',
  name: '',
  description: '',
  datetime: '',
  status: 'pending',
  quantity: 1,
  orderName: ''
}

export const valid = function () {
  if (this.orderItem.name.length <= 6) {
    this.errors.push('Item name nust be longer than 6 characters.s')
    return false
  }
  if (this.orderItem.orderName.length <= 6) {
    this.errors.push('Orderer name nust be longer than 6 characters.s')
    return false
  }
  if (this.orderItem.description.length <= 6) {
    this.errors.push('Item description nust be longer than 6 characters.s')
    return false
  }
  if (!(!isNaN(parseFloat(this.orderItem.unitPrice)) && isFinite(this.orderItem.unitPrice)) || this.orderItem.unitPrice <= 0) {
    this.errors.push('Item price should be great than 0.')
    return false
  }
  if (!(!isNaN(parseFloat(this.orderItem.linePrice)) && isFinite(this.orderItem.linePrice)) || this.orderItem.linePrice <= 0) {
    this.errors.push('Item line price should be great than 0.')
    return false
  }
  return true
}

export const errors = []
