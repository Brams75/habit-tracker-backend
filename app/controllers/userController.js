const User = require("../models/Users.js");

const userController = {
  deleteUser: async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("Aucun utilisateur trouvé.");
    }
    res.status(200).send("L'utilisateur a été supprimé.");
  },
};

module.exports = userController;
