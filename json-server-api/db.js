const fs = require('fs');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '123456789';
const expiresIn = '24h';
const userdb = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'UTF-8'));

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

function isAuthenticated({ email, password }) {
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1;
}

async function isRegistered({ value }) {
  return await userdb.users.findIndex(user => user.email === value || user.id === value) !== -1;
}

async function createUser(name, email, password, imageUrl) {
  const id = faker.random.number();
  await userdb.users.push({
    id: id,
    name: name,
    email: email,
    password: password,
    imageUrl: imageUrl
  });
  fs.writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');
  return id;
}

async function getUser(email, password) {
  return userdb.users.find(user => user.email === email && user.password === password ? user : null);
}
async function getUserLicense(id) {
  return userdb.users.find(user => user.id === id ? user : null);
}

module.exports = {
  createToken,
  verifyToken,
  isAuthenticated,
  isRegistered,
  createUser,
  getUser,
  getUserLicense
 }