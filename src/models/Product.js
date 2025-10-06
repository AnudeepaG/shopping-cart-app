class Product {
  constructor(id, name, price, originalPrice, imageUrl, description, category, rating, reviews, stock, brand, tags, specifications) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.originalPrice = originalPrice;
    this.imageUrl = imageUrl;
    this.description = description;
    this.category = category;
    this.rating = rating;
    this.reviews = reviews;
    this.stock = stock;
    this.brand = brand;
    this.tags = tags || [];
    this.specifications = specifications || {};
  }

  getFormattedPrice() {
    return `₹${this.price.toLocaleString()}`;
  }

  getOriginalPrice() {
    return `₹${this.originalPrice.toLocaleString()}`;
  }

  getDiscount() {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }

  isInStock() {
    return this.stock > 0;
  }

  getStockStatus() {
    if (this.stock === 0) return 'Out of Stock';
    if (this.stock < 5) return `Only ${this.stock} left!`;
    return 'In Stock';
  }
}

export default Product;