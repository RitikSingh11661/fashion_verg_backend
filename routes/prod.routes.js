const { verifyToken } = require("../middlewares/auth.middleware");
const { prodModel } = require("../models/product.model");

const express = require("express");

const prodRoutes = express.Router();

prodRoutes.get("/", async (req, res) => {
    try {
        let query = req.query, queryToSend = {}, sortQuery = {}, limit = query.limit || 12, skip, sort = query.sort ? query.sort.split(",") : [], orderBy = query.orderBy ? query.orderBy.split(",") : [];
        let toSort, toOrder, n = Math.min(sort.length, orderBy.length);
        const search = req.query.search;

        if (search) {
            // Use a regular expression to perform a partial match search
            queryToSend.name = { $regex: `^${search}`, $options: "i" };
        }
        for (let i = 0; i < n; i++) {
            if (orderBy[i] === "asc" && sort[i]) {
                toSort = sort[i];
                toOrder = 1;
                sortQuery[toSort] = toOrder;
            } else if (orderBy[i] === "desc" && sort[i]) {
                toSort = sort[i];
                toOrder = -1;
                sortQuery[toSort] = toOrder;
            }
        }
        if (query.page) {
            if (query.limit) limit = +query.limit;
            skip = (+query.page - 1) * limit;
        }
        const data = await prodModel.find(queryToSend).limit(limit).skip(skip * limit).sort(sortQuery);
        res.status(200).send({ data, status: "success" });
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
})

prodRoutes.get("/:id", async (req, res) => {
    try {
        const data = await prodModel.find({ _id: req.params.id });
        res.status(200).send({ msg: data, status: "success" });
    } catch (e) { res.status(400).send({ msg: e.message }) }
})

// Below's for admin only
prodRoutes.use(verifyToken);
prodRoutes.post("/add", async (req, res) => {
    const { name, images, brand, oprice, price, category, discount } = req.body;
    try {
        if (name && images && brand && oprice && price && category && discount) {
            const newProduct = new prodModel(req.body);
            await newProduct.save();
            res.status(200).send({ msg: "Product has been added", status: "success", data: newProduct });
        } else res.status(400).send({ msg: "Invalid data format" })
    } catch (e) { res.status(400).send({ msg: e.message }) }
})

prodRoutes.delete("/delete/:id", async (req, res) => {
    try {
        await prodModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "Product has been deleted", status: "success" });
    } catch (e) {
        res.status(400).send({ msg: e.message });
    }
})

prodRoutes.patch("/update/:id", async (req, res) => {
    try {
        await prodModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ msg: "Product details has been updated", status: "success" });
    } catch (e) {
        res.status(400).send({ msg: e.message });
    }
})

module.exports = { prodRoutes };