import Product from '../models/Product';

class ProductService {
  static getProducts() {
    return [
      new Product(1, 'Sony WH-1000XM5 Wireless Headphones', 24990, 29990, 
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop',
        'Industry-leading noise cancellation with crystal-clear audio quality', 'Electronics', 4.8, 2847, 15, 'Sony',
        ['Bestseller', 'Premium'], { 'Battery Life': '30 hours', 'Bluetooth': '5.3', 'Weight': '250g' }),
      
      new Product(2, 'Apple Watch Series 9 GPS', 41900, 45900,
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop',
        'Advanced health monitoring with fitness tracking and ECG', 'Electronics', 4.7, 5234, 8, 'Apple',
        ['Trending', 'New Launch'], { 'Display': '1.9" OLED', 'Water Resistant': '50m', 'Sensors': 'Heart Rate, ECG' }),
      
      new Product(3, 'Nike Air Zoom Pegasus 40', 8995, 12995,
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        'Responsive cushioning for your daily running needs', 'Footwear', 4.6, 1893, 25, 'Nike',
        ['Popular'], { 'Type': 'Running', 'Upper': 'Mesh', 'Cushioning': 'React Foam' }),
      
      new Product(4, 'Samsung Galaxy Buds2 Pro', 13999, 17999,
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
        'Intelligent ANC with 360 audio for immersive sound', 'Electronics', 4.5, 3421, 32, 'Samsung',
        ['Bestseller'], { 'ANC': 'Yes', 'Battery': '8 hrs', 'Wireless Charging': 'Yes' }),
      
      new Product(5, 'Instant Pot Duo Plus 6L', 9999, 14999,
        'https://m.media-amazon.com/images/I/41OFXY6pMRL._SY300_SX300_QL70_FMwebp_.jpg',
        '9-in-1 programmable pressure cooker for quick meals', 'Home & Kitchen', 4.7, 8934, 18, 'Instant Pot',
        ['Top Rated'], { 'Capacity': '6 Liters', 'Programs': '9', 'Material': 'Stainless Steel' }),
      
      new Product(6, 'Levi\'s 511 Slim Fit Jeans', 3499, 4999,
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
        'Classic slim fit with stretch for all-day comfort', 'Fashion', 4.4, 2156, 47, 'Levi\'s',
        ['Trending'], { 'Fit': 'Slim', 'Material': 'Denim', 'Stretch': 'Yes' }),
      
      new Product(7, 'Philips Air Fryer HD9252', 8999, 12999,
        'https://images.unsplash.com/photo-1695089028114-ce28248f0ab9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Rapid air technology for healthier fried foods', 'Home & Kitchen', 4.6, 4521, 12, 'Philips',
        ['Popular', 'Health'], { 'Capacity': '4.1L', 'Power': '1400W', 'Temp Range': 'Up to 200°C' }),
      
      new Product(8, 'Adidas Ultraboost 23', 16999, 18999,
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
        'Energy-returning running shoes with Primeknit upper', 'Footwear', 4.8, 3241, 9, 'Adidas',
        ['Premium', 'New Launch'], { 'Type': 'Running', 'Technology': 'Boost', 'Upper': 'Primeknit' }),
      
      new Product(9, 'Canon EOS M50 Mark II', 54999, 64999,
        'https://images.unsplash.com/photo-1658235509201-f17f32094303?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Mirrorless camera perfect for vlogging and photography', 'Electronics', 4.7, 1634, 6, 'Canon',
        ['Premium', 'Professional'], { 'Megapixels': '24.1MP', 'Video': '4K', 'Screen': 'Vari-angle' }),

      
      new Product(10, 'The North Face Borealis Backpack', 7999, 9999,
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        'Durable backpack with laptop sleeve and organized storage', 'Accessories', 4.6, 2876, 21, 'The North Face',
        ['Bestseller'], { 'Capacity': '28L', 'Laptop Fit': '15"', 'Material': 'Recycled Polyester' }),
      
      new Product(11, 'Dyson V15 Detect Vacuum', 54900, 62900,
        'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=500&fit=crop',
        'Laser detection technology reveals microscopic dust', 'Home & Kitchen', 4.9, 1245, 4, 'Dyson',
        ['Premium', 'Top Rated'], { 'Type': 'Cordless', 'Runtime': '60 min', 'Filtration': 'HEPA' }),
      
      new Product(12, 'Fossil Gen 6 Smartwatch', 19995, 24995,
        'https://images.unsplash.com/photo-1617625802912-cde586faf331?w=500&h=500&fit=crop',
        'Wear OS smartwatch with fitness tracking and heart rate', 'Electronics', 4.3, 1789, 14, 'Fossil',
        ['Trending'], { 'OS': 'Wear OS', 'Battery': '24 hrs', 'Water Resistant': '3 ATM' }),

      new Product(13, 'Fenty Beauty Pro Filt’r Foundation', 3499, 3999,
  'https://cdn11.bigcommerce.com/s-ilgxsy4t82/images/stencil/1280x1280/products/131827/312084/615ku3zFiWL._SL1500___29040.1668683968.jpg?c=1&imbypass=on',
  'Longwear foundation with natural matte finish', 'Beauty & Glam', 4.8, 1324, 10, 'Fenty Beauty',
  ['Bestseller', 'Premium'], { 'Shades': '50', 'Finish': 'Matte', 'Coverage': 'Medium to Full' }),

new Product(14, 'MAC Retro Matte Lipstick', 1599, 1899,
  'https://images.unsplash.com/photo-1596690636757-2b945da88bcc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Iconic matte lipstick with intense pigment', 'Beauty & Glam', 4.7, 987, 15, 'MAC',
  ['Trending'], { 'Finish': 'Matte', 'Shades': '12', 'Longevity': '8 hours' }),

new Product(15, 'Maybelline Fit Me Matte + Poreless Powder', 799, 999,
  'https://m.media-amazon.com/images/I/618YG4-V3ZL._SX679_.jpg',
  'Perfects skin and controls shine for all skin types', 'Beauty & Glam', 4.5, 654, 20, 'Maybelline',
  ['Popular', 'Budget'], { 'Coverage': 'Sheer to Medium', 'Finish': 'Matte', 'Shades': '10' }),

    ];

  }

 static getCategories() {
  return ['All', 'Electronics', 'Fashion', 'Footwear', 'Home & Kitchen', 'Accessories', 'Beauty & Glam'];
}

static getBrands() {
  return ['All Brands', 'Sony', 'Apple', 'Nike', 'Samsung', 'Adidas', 'Levi\'s', 'Canon', 'Dyson', 'Fenty Beauty', 'MAC', 'Maybelline'];
}
}

export default ProductService;