module.exports = app => {
    const prueba = require("../controllers/prueba.controller.js");
    var router = require("express").Router();

    router.post("/create/", prueba.createName);

    router.get("/", prueba.findAll);

    router.get("/:id", prueba.findOne);

    router.put("/update/:id", prueba.update);

    router.delete("/delete/", prueba.deleteAll);

    app.use("/api/prueba", router);
};