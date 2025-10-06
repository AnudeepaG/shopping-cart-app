import ProductService from './ProductService';
import Order from '../models/Order';

class APIService {
  static async fetchProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: ProductService.getProducts()
        });
      }, 800);
    });
  }

  static async checkout(cartItems, discount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = cartItems.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          subtotal: item.product.price * item.quantity
        }));

        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const deliveryCharge = subtotal > 500 ? 0 : 40;
        const order = new Order(items, subtotal, discount, deliveryCharge);
        order.logOrder();

        resolve({
          success: true,
          message: 'Order placed successfully!',
          orderId: order.id,
          estimatedDelivery: order.estimatedDelivery
        });
      }, 1200);
    });
  }
}

export default APIService;