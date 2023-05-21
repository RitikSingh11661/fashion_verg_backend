const express = require("express");
const app = express();
const { shippingAddress } = require("../models/shipping.models");
app.use(express.json());
const shippingRouter = express.Router();

// <--------------------postrequest-------------------------->

shippingRouter.post("/add", async (req, res) => {
  const {userId,country,firstName,lastName,address,city,pincode,phone}=req.body;
  console.log('req.body',req.body)
  try {
    if(userId && country && firstName && lastName && address && city && pincode && phone){
      const user = new shippingAddress(req.body);
      await user.save();
      res.status(200).send({ msg: "address added", status: "success"});
    }else res.status(400).send({msg:"Invalid data format"})
  } catch (error) {res.status(400).send({ msg: error.msg })}
});

// <--------------------getrequest-------------------------->

shippingRouter.get("/", async (req, res) => {
  try {
    const addresses = await shippingAddress.find({userId:req.body.userId});
    res.status(200).send({data:addresses,status:"success"});
  } catch (error) {
    res.status(400).send({ msg: "error.msg " });
  }
});

// <--------------------updaterequest-------------------------->

shippingRouter.patch("/update/:addressId", async (req, res) => {
  const { addressId } = req.params;
  try {
    await shippingAddress.findByIdAndUpdate({ _id: addressId },req.body);
    res.status(200).send({ msg:"address details updated"});
  } catch (error) {
    res.status(400).send({ msg: error.msg });
  }
});

// <--------------------deleterequest-------------------------->

shippingRouter.delete("/delete/:addressId", async (req, res) => {
  const { addressId } = req.params;
  try {
    await shippingAddress.findByIdAndDelete({ _id: addressId });
    res.status(200).send({ msg: " address details deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.msg });
  }
});

// export userRouter
module.exports = {shippingRouter};
