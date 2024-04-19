// !!! Remember to "Drop Table" & "Refresh Database" first when everytime create a new Table !!!
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Every "Post" can have many "Comments"!
  // "models": An argument that has access to all the models in the project
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {  // "hasMany": A function in sequelize
      onDelete: "cascade",  // Once delete, will delete everything in that post
    });
    Posts.hasMany(models.Likes, {  // "hasMany": A function in sequelize
      onDelete: "cascade",  // Once delete, will delete everything in that post
    });
  }

  return Posts;
};