const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth.middleware");
const { adminModel } = require("../models/admin.model");

const adminRoutes = express.Router();

adminRoutes.post("/login", async (req, res) => {
    const {email,password} = req.body;
    try {
        if (email &&  password){
            const preCheck = await adminModel.findOne({ email });
            if (preCheck && email.includes('admin')) {
                const hashCheck = await bcrypt.compare(password, preCheck.password);
                const token = jwt.sign({userId:preCheck._id,role:preCheck.role}, "Fashion",{expiresIn:"2h"});
                if (hashCheck)res.status(200).send({msg:"Admin loggedin",status:"success",token,role:preCheck.role});
                else res.status(400).send({msg:"Invalid password"});
            } else res.status(400).send({ msg:"User not found"});
        } else res.status(400).send({msg:"Invalid data format"});
    } catch (e) {res.status(400).send({ msg: e.message })}
})

// Below's for admin only
adminRoutes.use(verifyToken);

adminRoutes.get("/", async (req, res) => {
    try {
        const data = await adminModel.find();
        res.status(200).send({data, status: "success" });
    } catch (e) {res.status(400).send({ msg: e.message })}
})

adminRoutes.get("/:adminId", async (req, res) => {
    try {
        const data = await adminModel.find({_id:req.params.adminId});
        res.status(200).send({data, status: "success" });
    } catch (e) { res.status(400).send({ msg: e.message })}
})

adminRoutes.post("/add", async (req, res) => {
    const {email,name,password,contact,role,image} = req.body;
    try {
        if (name && email && password && contact && role && image) {
            const preCheck = await adminModel.findOne({email});
            if (!preCheck) {
                const hashedPassword = await bcrypt.hash(req.body.password, 7);
                const newAdmin = new adminModel({ ...req.body, password: hashedPassword });
                await newAdmin.save();
                res.status(200).send({ msg: "Admin has been registered", status: "success",data:newAdmin});
            } else res.status(400).send({ msg: "Admin already registered" });
        } else res.status(400).send({ msg: "Invalid data format" });
    } catch (e) {res.status(400).send({ msg: e.message })}
})

adminRoutes.delete("/delete/:id", async (req, res) => {
    try {
        await adminModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "Admin data has been deleted", status: "success" });
    } catch (e) {res.status(400).send({ msg: e.message })}
})

adminRoutes.patch("/update/:id", async (req, res) => {
    try {
        await adminModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ msg: "Admin details has been updated", status: "success" });
    } catch (e) {res.status(400).send({ msg: e.message })}
})

module.exports = { adminRoutes };