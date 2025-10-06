class Order {
  constructor(items, totalAmount, discount, deliveryCharge) {
    this.id = this.generateOrderId();
    this.items = items;
    this.subtotal = totalAmount;
    this.discount = discount;
    this.deliveryCharge = deliveryCharge;
    this.totalAmount = totalAmount - discount + deliveryCharge;
    this.timestamp = new Date().toISOString();
    this.status = 'confirmed';
    this.estimatedDelivery = this.calculateDelivery();
  }

  generateOrderId() {
    return `SHOP${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }

  calculateDelivery() {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 3) + 3);
    return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  logOrder() {
    console.log('╔════════════════════════════════════╗');
    console.log('║     ORDER CONFIRMATION RECEIPT     ║');
    console.log('╠════════════════════════════════════╣');
    console.log(`║ Order ID: ${this.id.padEnd(23)} ║`);
    console.log(`║ Date: ${new Date(this.timestamp).toLocaleString().padEnd(28)} ║`);
    console.log('╠════════════════════════════════════╣');
    console.log('║ ITEMS ORDERED:                     ║');
    this.items.forEach(item => {
      console.log(`║ • ${item.name.padEnd(30).substring(0, 30)} ║`);
      console.log(`║   Qty: ${item.quantity}  Price: ₹${item.price.toLocaleString().padEnd(19)} ║`);
    });
    console.log('╠════════════════════════════════════╣');
    console.log(`║ Subtotal:        ₹${this.subtotal.toLocaleString().padStart(16)} ║`);
    console.log(`║ Discount:        -₹${this.discount.toLocaleString().padStart(15)} ║`);
    console.log(`║ Delivery:        ₹${this.deliveryCharge.toLocaleString().padStart(16)} ║`);
    console.log(`║ TOTAL AMOUNT:    ₹${this.totalAmount.toLocaleString().padStart(16)} ║`);
    console.log('╠════════════════════════════════════╣');
    console.log(`║ Estimated Delivery: ${this.estimatedDelivery.padEnd(15)} ║`);
    console.log('╚════════════════════════════════════╝');
  }
}

export default Order;