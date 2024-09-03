let { sequelize, DataTypes } = require('../lib/')

let track = sequelize.define("track",{
  name: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.NUMBER,
  artist: DataTypes.TEXT,
  album: DataTypes.TEXT,
  duration: DataTypes.NUMBER,
})


module.exports = {
  track
}