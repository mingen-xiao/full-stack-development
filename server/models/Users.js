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
    // Users.associate = (models) => {
    //   Users.hasMany(models.Posts, {  // "hasMany": A function in sequelize
    //     onDelete: "cascade",  // Once delete, will delete everything in that post
    //   });
    // }
  
    return Users;
  };