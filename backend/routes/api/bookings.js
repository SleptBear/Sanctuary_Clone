const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { getCurrentUserById } = require('../../db/models/user');



// current users bookings
router.get(
    '/current',
    // restoreUser,
    requireAuth,
    async (req, res) => {
        let user = req.user

        let Bookings = await Booking.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                    include: [{
                        model: SpotImage,
                        // attributes: ['url']
                    }]
                },
                // {
                //     model: SpotImage,
                //     through: { include: model.Spot }
                // }
            ]
        });
        //     let spotIds = []
        // Bookings.forEach(spot => {
        //     if(!spot.Spot.SpotImages[0]) {
        //         spot.Spot.previewImage = 'no images uploaded'
        //     } else {
        //         spot.Spot.previewImage = 'image.url'
        //     }
        // })


        // let previews = await SpotImage.findAll({
        //     attributes: ['id', 'spotId', 'url', 'preview']
        // })
        // Bookings.forEach(spot => {
        //     for(i=0; i<previews.length; i++) {
        //         if(spotIds[])
        //     }

        // })

        // Bookings.SpotImages.forEach(image => {
        //     let url = image.url
        //     if(url) {
        //         Bookings.previewImage = url
        //     }
        // })
        // let images = await SpotImage.findAll({
        //     where: {
        //         spotId:
        //     }
        // })
        // console.log(Bookings)
        let test = Bookings[0].dataValues
        // console.log(test)

        res.json({Bookings})
    }
)

router.delete(
    '/:bookingId',
    // restoreUser,
    requireAuth,
    async (req, res) => {
        let user = req.user
        let bookingId = Number(req.params.bookingId)
        // console.log(typeof bookingId)
        let booking = await Booking.findOne({
            where: {
                userId: user.id,
                id: bookingId
            }
        })
        if(!booking) {
            res.status(404);
            return res.json( {
                "message": "Booking couldn't be found",
                "statusCode": 404
              })
        }

        // console.log(booking)
        // console.log(new Date)
        if(booking.dataValues.startDate < new Date) {
            res.status(403);
            return res.json({
                "errors": "Bookings that have been started can't be deleted",
                "statusCode": 403
              })
        }

        await booking.destroy()

           return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
              })
    }
)

//edit a booking
//could maybe look to implement edit of times for bookng to be altered
//dont think this is very helpful for airbnb though
router.put(
    '/:bookingId',
    restoreUser,
    requireAuth,
    async (req, res) => {
        let user = req.user;
        let bookingId = Number(req.params.bookingId);
        let startDate = new Date(req.body.startDate);
        let endDate = new Date(req.body.endDate);

        // console.log(endDate < startDate)
        if(endDate <= startDate) {
            res.status(400);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": [
                  "endDate cannot come before startDate"
                ]
              })
        }

        let booking = await Booking.findOne({
            where: {
                id: bookingId,
                userId: user.id,

            }
        })



        if(!booking) {
            res.status(404);
            return res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
              })
        }
        // console.log(booking.startDate < Date.now())
        if(booking.startDate < Date.now()) {
            res.status(403)
            return res.json({
                message: "Past bookings can't be modified",
                statusCode: 403
            })
        }

        let test =  await Booking.findOne({
            where: {
                spotId: booking.dataValues.spotId,
                // userId: user.id,
                startDate: startDate,
                endDate: endDate
            }
        })

        if(test) {
            res.status(403);
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": [
                  "Start date conflicts with an existing booking",
                  "End date conflicts with an existing booking"
                ]
              })
        }

        booking.set({
            startDate: startDate,
            endDate: endDate
        });

        await booking.save()
        res.json(booking)
    }
)

module.exports = router
