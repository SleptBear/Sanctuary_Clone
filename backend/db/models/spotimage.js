'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }

    static async addImage({ url, preview, spotId }) {
      let image = await SpotImage.scope('defaultScope').create({
        spotId,
        url,
        preview
      });
      let images = await SpotImage.scope('defaultScope').findOne({
        where: {
          id: (await SpotImage.findAll()).length
        }
      })

      return images
    }
  }
  SpotImage.init({
    spotId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SpotImage',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'spotId']
      }
    },
    scopes: {
      createdImage: {
        attributes: {
          include:  ["spotId", "url", "preview"]
        }
      }
    }
    // defaultScope: {
    //   where: {
    //     preview: true
    //   }
    // },
    // scopes: {
    //   getAll: function (spotPreview) {
    //     return {

    //     }
    //   }
    // }

  });
  return SpotImage;
};
