module.exports = {
  dialect: 'postgress',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
