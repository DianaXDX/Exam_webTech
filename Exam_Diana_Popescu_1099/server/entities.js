import Sequelize from "sequelize";

const sequelize = new Sequelize({
  storage: "./database.db",
  dialect: "sqlite",
  logging: false,
});

const jobPosting = sequelize.define("jobPosting", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deadline: {
    type: Sequelize.DATE,
  },
});

const Candidate = sequelize.define("Candidate", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    length: { minimum: 5 },
  },
  CV: {
    type: Sequelize.TEXT,
    allowNull: false,
    length: { minimum: 10 },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

jobPosting.hasMany(Candidate, { foreigKey: "jobPostingId" });
Candidate.belongsTo(jobPosting, { foreigKey: "jobPostingId" });

async function initialize() {
  await sequelize.authenticate();
  await sequelize.sync({});
}

export { initialize, jobPosting, Candidate };
