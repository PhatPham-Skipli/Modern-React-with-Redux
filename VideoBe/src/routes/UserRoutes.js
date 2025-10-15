const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/create', UserController.createUser)
router.get('/:googleId', UserController.getProfile)
router.post('/:googleId/like', UserController.likeVideo)
router.post('/:googleId/unlike', UserController.unlikeVideo)
router.post('/:googleId/subscribe', UserController.subscribeChannel)
router.post('/:googleId/unsubscribe', UserController.unsubscribeChannel)
router.get('/:googleId/subscriptions', UserController.getSubscriptions)

module.exports = router