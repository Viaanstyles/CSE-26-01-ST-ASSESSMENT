// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { notEmpty: true, len: [3, 255] }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { len: [10, 5000] }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 }
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: 'products',
  hooks: {
    beforeValidate: (product) => {
      if (product.name) product.name = product.name.trim();
      if (product.category) product.category = product.category.trim();
    }
  }
});

module.exports = Product;