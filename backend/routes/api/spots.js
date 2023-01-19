const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { getCurrentUserById } = require('../../db/models/user');
const user = require('../../db/models/user');


//each check must pass only on .argument and .with message
const validateCreation = [
    check('address')
      .exists({ checkFalsy: true })
    //   .isLength({ min: 4 })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
    //   .isLength({ min: 3 })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
    //   .isLength({ min: 2 })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
    //   .isLength({ min: 2 })
      .withMessage('Country is required'),
    check('name')
    //   .exists({ checkFalsy: true })
    //   .custom(value => {
    //     if(value.length >= 50) {
    //         return Promise.reject('Name must be less than 50 characters')
    //     }
    //   })
      .isLength({ max: 49 })
      .withMessage('Name must be less than 50 characters'),
    // check('name').custom(value => {
    //     if(value.length >= 10) {
    //         return Promise.reject('Name must be less than 50 characters')
    //     }
    //   }),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
  ];


//get all spots
router.get(
    '/',
    async (req, res) => {
        // const spots = await Spot.scope(["itsReview", "itsImage"]).findAll({
        let { page, size } = req.query;
        // let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
        // console.log(page, size);
        page = Number(page);
        size = Number(size);
        // console.log(page, size);
        if(isNaN(page)) page = 1;
        if(page>10) page = 10;
        if(isNaN(size)) size = 20;
        if(size>20) size = 20;

        // let pagination = {};
        // pagination.limit = page * (page - 1);
        // pagination.offset = size


        const spots = await Spot.findAll({
            // group: 'Spot.id',
            limit: size,
            offset: (page-1) * size,
            include: [
            {
                    model: Review,
                    // group: 'Reviews.id',
                    // attributes: {
                        attributes: ['stars'],
                        // include: [

                    //     [
                    //     sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    //     "avgRating"
                    //     ]
                        // ],
                    // },
            },
                {
                    model: SpotImage,
                    // attributes: ['url']
                }

            ],
            // ...pagination
        })
        // const reviews = await Review.findAll({
        //     attributes: [
        //         'id', 'spotId',
        //     ]
        // })
    //     const spots1 = await Spot.findAll();
    //     for(let ele of spots1) {
    //         ele = ele.toJSON();

    //     const review = await Review.findAll({
    //             where: { ele.id: 'spotId' }
    //         });
    //         console.log(review)
    //     }
    //     return res.json({

    //     })
    // })
// console.log(spots)
        let Spots = []
        spots.forEach(spot => {
            // console.log(spot)
            // console.log(spot.toJSON())
            Spots.push(spot.toJSON())
        })
        Spots.forEach(spot => {
            // console.log(spot.Reviews.length)
                    let avg = 0
                    for (i = 0; i < spot.Reviews.length; i++) {
                        // console.log(spot.Reviews[i].stars)
                        avg += spot.Reviews[i].stars
                    }

                    spot.avgRating = avg/spot.Reviews.length
            if (!spot.Reviews) {
                spot.review = 'no reviews found'
            }
            spot.SpotImages.forEach(image => {
                if(image.preview == true) {
                    spot.previewImage = image.url
                }
                if (image.preview == false) {
                    spot.preview = 'no preview can be shown'
                }
            })
            delete spot.Reviews
            delete spot.SpotImages
//         })

        // const spotImage = await SpotImage.findAll({
        //     attributes: ['url']
// console.log(spotsList)
//         spotsList.forEach(ele => {
//             // console.log(spot)
//             let image = SpotImage.findOne({
//                 // where: {
//                 //     spotId: ele.id
//                 // }

//             });
//             console.log(image)
//             // console.log(preview)

        })
        return res.json({
            Spots,
            page,
            size
        });
    }
)


// create and post a spot
router.post(
    '/',
    restoreUser,
    requireAuth,
    validateCreation,
    // User.toSafeObject(),

    async (req, res) => {
        let { user } = req;
        // const csrfToken = req.csrfToken();
        // console.log(user.toSafeObject())
        // console.log(user)
        user = user.toSafeObject()
        ownerId = user.id
        // console.log(ownerId)
        // console.log(typeof ownerId)

        const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.create({
        ownerId, address, city, state, country, lat, lng, name, description, price})
        console.log(spot)
        res.status(201)
    return res.json(
        spot
    )
    }
)

//create and post image based on spotId
// router.post(
//     '/:spotId/images',
//     restoreUser,
//     requireAuth,
//     async (req, res) => {
//         // let imageResponse = []
//         let spotId = req.params.spotId
//         let url = req.body.url
//         let preview = req.body.preview
//         console.log(spotId)
//         // console.log(url)
//         // console.log(preview)
//         let spot = await Spot.findByPk(spotId)
//         if (!spot) {
//             res.status(404)
//             res.send({

//                     "message": "Spot couldn't be found",
//                     "statusCode": 404

//             })
//         }
//         // let spotImage = await SpotImage.addImage({
//         //     url, preview, spotId })
//         // console.log('STARTS AS', spotImage)
//         // console.log('WANT TO CONVERT TO', spotImage.toJSON())
//         // let resultImage = JSON.stringify(spotImage)
//         // console.log("FINAL RESULT SHOULD LOOK LIKE", resultImage)
//         // let parsed = JSON.stringify(resultImage)
//         // imageResponse.spotId = parsed.spotId
//         // imageResponse.spotId = parsed.url
//         // imageResponse.spotId = parsed.preview
//         // console.log(JSON.stringify(spotImage.dataValues))
//         // imageResponse.id = JSON.stringify(spotImage.dataValues.id)
//         // imageResponse.url = JSON.stringify(spotImage.dataValues.url)
//         // imageResponse.preview = JSON.stringify(spotImage.dataValues.preview)
//             // spotImage.toJSON()
//             // JSON.stringify(spotImage);
//             // delete spotImage.updatedAt;
//             // delete spotImage.createdAt;
//             // delete spotImage.spotId;

//             let id = spotId
//             let returnObject = {id, url, preview}

//         spot.createSpotImage({
//             spotId,
//             url,
//             preview
//         })
//         res.json(
//             returnObject
//         );
//      }

// )

//create and post image based on spotId
router.post(
    '/:spotId/images',
    restoreUser,
    requireAuth,
    async (req, res) => {
        let spotId = req.params.spotId;
        let url = req.body.url;
        let preview = req.body.preview;

        let spot = await Spot.findByPk(spotId)
        if (!spot) {
            res.status(404)
            res.send({

                    "message": "Spot couldn't be found",
                    "statusCode": 404

            })
        }

        let image = await SpotImage.create({
            spotId,
            url,
            preview
        })

        // let finder = await SpotImage.findAll({
        //     where: {
        //         spotId: spotId
        //     },
        // //         attributes: {
        // //             exclude: ['spotId']
        // //         }

        // })

        // console.log(image)
        let imageData = image.dataValues
        delete imageData.spotId;
        delete imageData.updatedAt;
        delete imageData.createdAt;

        res.json(imageData);
        // res.json(finder)
    })

//get current users spots
router.get('/current', restoreUser, requireAuth,
async (req, res) => {
    // console.log(req.user.dataValues.id)
    const spots = await Spot.findAll({

        where: {
           ownerId: req.user.dataValues.id
        },
        include: [
        {
                model: Review,
                // group: 'Reviews.id',
                // attributes: {
                    attributes: ['stars'],
                    // include: [

                //     [
                //     sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                //     "avgRating"
                //     ]
                    // ],
                // },
        },
            {
                model: SpotImage,
                // attributes: ['url']
            }

        ],
    })
    let Spots = []
        spots.forEach(spot => {
            // console.log(spot)
            // console.log(spot.toJSON())
            Spots.push(spot.toJSON())
        })
        Spots.forEach(spot => {
            console.log(spot.Reviews.length)
                    let avg = 0
                    for (i = 0; i < spot.Reviews.length; i++) {
                        console.log(spot.Reviews[i].stars)
                        avg += spot.Reviews[i].stars
                    }

                    spot.avgRating = avg/spot.Reviews.length
            if (!spot.Reviews) {
                spot.review = 'no reviews found'
            }
            spot.SpotImages.forEach(image => {
                if(image.preview === true) {
                    spot.previewImage = image.url
                }
                if (image.preview === false) {
                    spot.preview = 'no preview can be shown'
                }
                // if (!image.preview) {
                //     spot.preview = 'no image uploaded'
                // }
            })
            delete spot.Reviews
            delete spot.SpotImages
            if(!spot.avgRating) {
                spot.avgRating = 'no reviews'
            }

            if(!spot.previewImage) {
                spot.previewImage = 'No image uploaded'
            }
            // spot.previewImage = 'image url'
        })


        return res.json({
            Spots,
        });
    }
)
//get details of spot by Id
router.get(
    '/:spotId',
    // restoreUser,
    // requireAuth,
    async (req, res) => {

        // console.log("spot id from params", req.user)
        // console.log("from backend", )

        // const owner = await User.findOne({
        //     where: {
        //         id: req.user.dataValues.id
        //     },
        //     attributes: ['id', 'firstName', 'lastName']
        // })


        const spots = await Spot.findOne({
            where: {
                id: req.params.spotId
            },
            include: [
            {
                    model: Review,
                    // group: 'Reviews.id',
                    // attributes: {
                        attributes: ['stars'],
                        // include: [

                    //     [
                    //     sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    //     "avgRating"
                    //     ]
                        // ],
                    // },
            },
                {
                    model: SpotImage,
                    // attributes: ['id', 'url', 'preview']
                },
                {
                    model: User,
                }

            ],
         } )
        //  console.log("our spot", spots)
         if (spots === null) {
            res.status(404)
            res.send({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
         }
            let Spots = []

            Spots.push(spots.toJSON())

        Spots.forEach(spot => {
            console.log(spot.Reviews.length)
                    let avg = 0
                    for (i = 0; i < spot.Reviews.length; i++) {
                        console.log(spot.Reviews[i].stars)
                        avg += spot.Reviews[i].stars
                    }

                    spot.avgStarRating = avg/spot.Reviews.length
            if (!spot.Reviews) {
                spot.review = 'no reviews found'
            }
            spot.SpotImages.forEach(image => {
                if(image.preview == true) {
                    spot.previewImage = image.url
                }
                if (image.preview == false) {
                    spot.preview = 'no preview can be shown'
                }

            })

            if(!spot.avgStarRating) {
                spot.avgStarRating = 'no reviews'
            }

            delete spot.previewImage

            spot.numReviews = spot.Reviews.length
            delete spot.Reviews
            // spot.Owner = owner
            console.log("final", Spots)
            let Owner = Spots[0]
            Owner = Owner.User
            let finalData = Spots[0]
            finalData.Owner = Owner
            delete finalData.User
            delete Owner.username
            console.log("Owner?", Owner)
            console.log('DATA', finalData)
        })
        return res.json(
            Spots[0]
        )
    }
)

router.put(
    '/:spotId',
    restoreUser,
    requireAuth,
    validateCreation,
    async (req, res) => {
    let spot = await Spot.findOne({
        // attributes: { exclude: ['createdAt', 'updatedAt'] },
        attributes: ['id', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price' ],
            where: {
                id: req.params.spotId
            },

    })
    if (spot === null) {
        res.status(404)
            res.send({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
    }
console.log(typeof spot.dataValues.id)
let ownerId = spot.dataValues.id
let spotId = req.params.spotId
let address = req.body.address;
let city = req.body.city;
let state = req.body.state;
let country = req.body.country;
let lat = req.body.lat;
let lng = req.body.lng;
let name = req.body.name;
let description = req.body.description;
let price = req.body.price;

spot.address = address;
spot.city = city;
spot.state = state;
spot.country = country;
spot.lat = lat;
spot.lng = lng;
spot.name = name;
spot.description = description;
spot.price = price;
await spot.save();
await spot.reload()

    res.json(
        spot
    )
    }
)

const reviewValidation = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5'),
    // check('stars').custom(value => {
    //         if(value > 5 || value < 1) {
    //             return Promise.reject('Stars must be an integer from 1 to 5')
    //         }
    //       }),
    handleValidationErrors
]


router.post(
    '/:spotId/reviews',
    restoreUser,
    requireAuth,
    reviewValidation,
    async (req, res) => {

        let spotId = Number(req.params.spotId)
        let userId = req.user.dataValues.id
        let review = req.body.review
        let stars = req.body.stars
        // console.log(typeof spotId, typeof userId, typeof review, typeof stars)



        if (await Review.findOne({
            where: {
                userId: userId,
                spotId: spotId
            }
        })) {
            res.status(403)
                return res.json({
                    "message": "User already has a review for this spot",
                    "statusCode": 403
                })
        }
    let fakeSpot = await Spot.findOne({
        where: {
            id: spotId
        },
})
if (fakeSpot === null) {
    res.status(404)
       return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
}

    // let ourReview = Review.createReview({
    //     spotId,
    //     userId,
    //     review,
    //     stars
    // })

    let newReview = await Review.create({
        spotId,
        userId,
        review,
        stars
      })
    // console.log(newReview)
      res.status(201);
        res.json(
            newReview
        )
    }
)

//get all reviews for a spot based on Id
//returns not found if no reviews but should probably return empty array or smthn instead
router.get(
    '/:spotId/reviews',
    async (req, res) => {
        let spotId = req.params.spotId
        let spotReviews = await Review.findAll({
            where: {
                spotId: spotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ],
        })
        console.log(spotReviews)
        if(spotReviews.length === 0) {
            res.status(404)
            return res.json({
                'message': "spot couldn't be found",
                "statusCode": 404
            })
        }

        let Reviews = []
        spotReviews.forEach(spot => {
            Reviews.push(spot.toJSON())
        })
        res.json({
            Reviews
        })
        }
    )

router.delete(
    '/:spotId',
    // restoreUser,
    requireAuth,
    async (req, res) => {
        let spotId = (req.params.spotId);
        // let { spotId } = req.params
        // spotId = Number(spotId)
        let userId = req.user.id
        // console.log("LOOOOOOOOOOK", Number(spotId))
        // spotId = Number(spotId)
        // console.log(typeof spotId)
        // let spot = await Spot.findOne({
        //     where: {
        //         id: spotId
        //     }
        // });
        let spot = await Spot.findByPk(spotId)

        if(spot === null) {
            res.status(404);
            return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
            })
        }
        // console.log(spot)
        // console.log(spot.ownerId)
        // console.log(spotId)
        // console.log(userId)
        if (spot.ownerId === userId) {
            await spot.destroy()
            return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
              })
        } else {
            res.status(401)
            return res.json({
                "message": "Requires Ownership to Complete",
                "statusCode": "401"
            })
        }


        // res.status(404)
        // res.json({
        //     "message": "Spot couldn't be found",
        //     "statusCode": 404
        //     })
    }
)




router.post(
    '/:spotIdForBooking/bookings',
    restoreUser,
    requireAuth,
    async (req, res) => {
        let userId = req.user.id;
        let spotId = Number(req.params.spotIdForBooking);
        let startDate = new Date(req.body.startDate);
        let endDate = new Date(req.body.endDate);
// console.log(typeof userId, typeof spotId, typeof startDate, typeof endDate)
// console.log(startDate)
// console.log(endDate)
// console.log(startDate < endDate)
// return res.json('stop here')
if(startDate > endDate) {
    res.status(400)
    return res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": [
          "endDate cannot be on or before startDate"
  ]
    })
}
       let test =  await Booking.findOne({
            where: {
                spotId: spotId,
                // userId: userId,
                startDate: startDate,
                endDate: endDate
            }
        })
// console.log(test)



if(!(await Spot.findOne({
    where: {
        id: spotId
    }
}))) {
    res.status(404);
    return res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
}

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

        let Bookings = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate

        })
        res.json(Bookings)
    }
)


router.get(
    '/:spotIdForBooking/bookings',
    restoreUser,
    requireAuth,
    async (req, res) => {

        let spotId = Number(req.params.spotIdForBooking)
        // console.log(typeof spotId)
        let userId = Number(req.user.id)


        let spot = await Spot.findByPk(spotId);
        let spotData;
        // console.log(spot)
        if(spot) spotData = spot.dataValues
        let Bookings;
        if(spotData && spotData.ownerId === userId) {


        Bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: [
                { model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
            ]
        });
    } else {
        Bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        });
    }

// console.log(spotBookings[0])
        if(!Bookings[0]) {
            res.status(404);
            return res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
              })
        }

        res.json({Bookings})
    }
)



module.exports =
    router
