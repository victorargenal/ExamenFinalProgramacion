module.exports = (sequelize, Sequelize) => {

    const Prueba = sequelize.define("prueba", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER,
            aloowNull: false
        }
    });
    return Prueba;
}