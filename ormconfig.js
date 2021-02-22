module.exports = {
  type: 'mongodb',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  database: `${process.env.DB_NAME}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASS}`,
  useUnifiedTopology: true,
  entities: [
    './src/database/schemas/*.ts',
  ]
}
