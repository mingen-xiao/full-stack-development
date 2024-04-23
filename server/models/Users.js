module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // Every "User" can have many "Posts"!
    // "models": An argument that has access to all the models in the project
    Users.associate = (models) => {
      Users.hasMany(models.Likes, {  // "hasMany": A function in sequelize
        onDelete: "cascade",  // Once delete, will delete everything in that post
      });

      // Create a "primary key" in the Table
      Users.hasMany(models.Posts, {  // "hasMany": A function in sequelize
        onDelete: "cascade",  // Once delete, will delete everything under that user
      });
    }
  
    return Users;
  };