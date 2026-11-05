const db= require("../models");
const Prueba = db.prueba;
const Op = db.Sequelize.Op;

exports.createName = (req,res) => {
    if(!req.body.name || !req.body.age){
        res.status(400).send({
            message: "Algun capo esta vacio"
        });
        return;
    }

    const prueba = {
        name: req.body.name,
        age: req.body.age
        
    };

    Prueba.create(prueba)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al crear el cliente"
            });
        });
};

exports.findAll = (req, res) => {
    Prueba.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "error al encontrar los registros"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Prueba.findByPk(id)
        .then(data => {
            res.send({
                Registro: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "error al encontrar el registro con el id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Prueba.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Registro Actualizado."
                });
            } else {
                res.send({
                    message: `no se pudo actualizar el registro id=${id}. tal vez el registro no existe, o existe un valor nulo`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error al actualizar el registro id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Prueba.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Registro eliminado"
                });
            } else {
                res.send({
                    message: `no se pudo eliminar el registro id=${id}. El registro no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Prueba.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} registros eliminados` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "erro al eliminar todos los registros"
            });
        });
};