const express = require('express');
const {sendMessage,getAllMessages} = require('../Controller/messageController.js');
const { isAdminAuthonticated,isUserAuthonticated } = require('../Middlewares/auth.js');

const router = express.Router();

router.post('/send', sendMessage);
router.get('/getall',isAdminAuthonticated,getAllMessages);

module.exports = router;