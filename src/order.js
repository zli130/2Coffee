export const order = {
  name: '',
  paymenMethod: '',
  datetime: '',
  paid: true,
  total: 0
}

export const valid = function () {
  if (this.order.name.length <= 2) {
    this.errors.push('Name must be longer than 2 characters.')
    return false
  }
  if (this.paymenMethods.indexOf(this.order.paymenMethod) < 0) {
    this.errors.push('Payment method must be one of options we provided.')
    return false
  }
  return true
}

export const paymenMethods = [
  'Card',
  'Cash'
]

export const errors = []
