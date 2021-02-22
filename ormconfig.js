module.exports = {
  type: 'mongodb',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  database: `${process.env.DB_NAME}`,
  useUnifiedTopology: true,
  entities: [
    './src/database/schemas/*.ts',
  ]
}
