import {Sequelize, DataTypes} from "sequelize";

const env = process.env.NODE_ENV || "development";

const configs = {
  development: {
    database: "saas",
    username: "root",
    password: "",
    host: "localhost",
    dialect: "mysql",
    backendHostUrl: "http://localhost:9000/api",
    web_url: "http://localhost:3000",
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql",
    backendHostUrl: process.env.BACKEND_URL || "https://yourapp.com.api",
    web_url: process.env.WEB_URL || "http://localhost:3000",
  },
};

const {database, username, password, host, dialect, backendHostUrl, web_url} =
  configs[env];

// ------------------------------------------------------------------------------------------------

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
    await sequelize.sync({alter: true});
    console.log("✅ All tables synced successfully.");
  } catch (err) {
    console.error("❌ Unable to connect or sync the database:", err);
    process.exit(1); // stop app if DB fails
  }
}

const BACKEND_URL = backendHostUrl;

export {startServer, sequelize, DataTypes, BACKEND_URL, web_url};

// -------------------------------------------------------------------------------------------------
