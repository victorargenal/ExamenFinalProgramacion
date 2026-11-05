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

    if(req.body.age>=18){
        Prueba.create(prueba)
            .then(data => {
                res.send({
                    Paciente: data,
                    mensaje: "mayor de edad"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "ocurrio un erro al crear el registro de prueba"
                });
            });
    }else {
        res.send( "Eres menor de edad")
    };
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Prueba.findAll({ where: condition })
        .then(data => {
            res.send({
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro al encontralos"
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
    if(req.body.age>=18){
        Prueba.update(req.body, {
            where: { id: id }
            })
            .then(num => {
                if (num == 1) {
                    Prueba.findByPk(id)
                        .then(data => {
                            res.send({
                                message: "Registro Actualizado con exito",
                                Registro: data
                            });
                        })
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
    }else{
        res.send({
            message: "registro menor de edad"
        })
    }   
};

exports.delete = (req, res) => {
    const id = req.params.id;

    if(req.body.seguridad === "yes"){
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
    }else {
        res.send({
            message: "NO estas completamente seguro"
        })
    }
};

exports.deleteAll = (req, res) => {
    const password = req.body.password;
    const seguridad = req.body.seguridad;

    if(password == 123 && seguridad === "yes"){
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
    }else{
        res.send({
            message: "Contraseña incorrecta o no estas completamente seguro"
        })
    }
};