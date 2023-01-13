const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { getCurrentUserById } = require('../../db/models/user');

//remove spotImage from DB
router.delete(
    '/:spotImageId',
    restoreUser,
    requireAuth,
    async (req, res) => {
        let user = req.user
        // console.log(req.params.spotImageId)
        let spotImage = await SpotImage.scope('createdImage').findOne({
            where: {
                id: req.params.spotImageId
            }
        });
        // console.log(spotImage)
        if(!spotImage) {
            res.status(404)
            return res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
        }

        let spotImageData = spotImage.dataValues
        // console.log(spotImageData)

        let spot = await Spot.findByPk(spotImageData.spotId)
        // console.log(spot.dataValues)
        spot = spot.dataValues
        // console.log(spot)
        // console.log( spot.ownerId)
        // console.log( user.id)
        // console.log(spot.ownerId === user.id)

        if((spot.ownerId === user.id)) {
            await spotImage.destroy();
            res.status(200)
            return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        }

        res.json('User requires authorization')

    }
)

module.exports = router
