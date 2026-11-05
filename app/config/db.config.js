module.exports = {
  HOST: "ep-green-sunset-bdd92vly-pooler.c-8.us-east-2.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_d3VoE5afHqTs",
  DB: "neondb",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

