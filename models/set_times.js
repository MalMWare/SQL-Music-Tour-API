'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_Times extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event, Stage}) {
      // define association here
      Set_Times.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      })

      Set_Times.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })

      Set_Times.belongsTo(Stage, {
        foreignKey: "stage_id",
        as: "stage"
      })
    }
  }
  Set_Times.init({
    set_times_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    band_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    event_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    stage_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
  }, 
}, {
    sequelize,
    modelName: 'Set_Times',
    tableName: 'set_times',
    timestamps: false
  });
  return Set_Times;
};