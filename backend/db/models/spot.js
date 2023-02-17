'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true });
      Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true });
    }

    static async createSpot({ownerId, address, city, state, country, lat, lng, name, description, price}) {

      const spot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });
      return await Spot.findOne({
        where: {
          id: (await Spot.findAll()).length
        }
      })
    }
    static async updateSpot({ownerId, spotId, address, city, state, country, lat, lng, name, description, price}) {
      const spot = await Spot.create({
        ownerId,
        spotId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price

      })
      return spot
    }

  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      validate:{

      },
    },
    city: {
      type: DataTypes.STRING,
      validate:{

      },
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      validate:{

      },
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
    // defaultScope: {
    //     where: {

    //     }
    //   },
    //   scopes: {
    //   itsReview(spotReview) {
    //     const { Review } = require('../models')
    //     return {
    //       include: [
    //         { model: Review },

    //       ]
    //     }
    //   },
    //   itsImage(spotPreview) {
    //     const { SpotImage } = require('../models')
    //     return {
    //       include: [
    //         { model: SpotImage }
    //       ]
    //     }
    //   }
    // }
  });
  return Spot;
};
