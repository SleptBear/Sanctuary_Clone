'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId' });
    }
    static async createImage({reviewId, url}) {
      let newImg = await ReviewImage.create({
        reviewId,
        url
      });
      return newImg
    }

  }
  ReviewImage.init({
    reviewId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
