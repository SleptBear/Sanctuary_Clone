const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { getCurrentUserById } = require('../../db/models/user');

//I should refactor this below to DRY up missing spot or wrong user
//delete review Image by id
router.delete(
    '/:reviewImageId',
    restoreUser,
    requireAuth,
    async (req, res) => {
        let reviewImageId = req.params.reviewImageId
        let user = req.user

        let image = await ReviewImage.findOne({
            where: {
                id: reviewImageId
            }
        })

        if(image === null) {
            res.status(404)
            return res.json(
                {
                    "message": "Review Image couldn't be found",
                    "statusCode": 404
                }
                )
        }

        let review = await Review.findOne({
            where: {
                id: image.reviewId,

            }
        })

        if(user.id === review.userId) {
            await image.destroy()
            return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
              })
        }
        res.status(404)
        res.json(
            {
                "message": "Review Image couldn't be found",
                "statusCode": 404
            }
            )
    }
)


module.exports = router
