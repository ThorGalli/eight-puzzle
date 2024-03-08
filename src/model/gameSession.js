import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/database.sqlite'
});

const GameSession = sequelize.define('GameSession', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.JSON,
    allowNull: false
  },
  moveHistory: {
    type: DataTypes.TEXT, // Store JSON data as a string
    defaultValue: '[]', // Default value is an empty array as a string
    allowNull: false,
    get() {
      const value = this.getDataValue('moveHistory');
      return JSON.parse(value); // Parse JSON string into array
    },
    set(value) {
      this.setDataValue('moveHistory', JSON.stringify(value)); // Convert array to JSON string
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'solved'),
    defaultValue: 'active',
    allowNull: false
  }
});

// Sync the model with the database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

export default GameSession;
