const express = require('express');
const jwt = require('jsonwebtoken');
const ethUtil = require('ethereumjs-util');

const User = require('../models/user');
const router = express.Router();

// @route   Get api/user/:public_address/nonce
// @desc    returns user's nonce
// @access  Public
router.get('/:public_address/nonce', async (req, res) => {
  try{
    const public_address = req.params.public_address;
    let user = await User.findOne({public_address});
    if (!user){
      user = new User({
        public_address
      });
      await user.save();
    }
    res.status(200).json({nonce: user.nonce});
  } catch(err) {
    console.log(err.message);
    res.status(500).json({message: "Server error"});
  }
})

// @route   Get api/user/:public_address/signature
// @desc    returns jwt token if authentic user
// @access  Public
router.post('/:public_address/signature', async (req, res) => {
  try{
    const public_address = req.params.public_address;
    const user = await User.findOne({public_address});
    if(user){
      const msg = `I am signing my one-time nonce: ${user.nonce}`;
      const msgHex = ethUtil.bufferToHex(Buffer.from(msg));

      // Check if signature is valid
      const msgBuffer = ethUtil.toBuffer(msgHex);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureBuffer = ethUtil.toBuffer(req.body.signature);
      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
      );
      const addresBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addresBuffer);
      
      if (address.toLowerCase() === user.public_address.toLowerCase()) {
        // Change user nonce
        user.nonce = Math.floor(Math.random() * 1000000);
        await user.save();
        // Set jwt token
        const token = jwt.sign({
          _id: user._id,
          address: user.public_address
        }, "JWT_SECRET", {expiresIn: '6h'});

        res.status(200).json({
          success: true,
          token: token,
          user: user,
          msg: "You are now logged in."
        });
      } 
      else {
        // User is not authenticated
        res.status(401).json({message: "Invalid credentials"});
      }
    }
    else {
      res.status(401).json({message: "User does not exists"});
    }

  } catch(err) {
    console.log(err.message);
    res.status(500).json({message: "Server error"});
  }
})

module.exports = router;