const User = require('../Model/User');

const addaddress = async (req, res) => {
  const userinfo = req.User;

  if (!userinfo) {
    return res.status(401).json({ msg: "Invalid user" });
  }

  const address = req.body;
  if (!address) {
    return res.status(401).json({ msg: "Invalid address" });
  }

  try {
    // Update user's address using findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(
      userinfo.userid,
      { $set: { Address: address } },
      { new: true } // to return the updated document
    );

    res.status(201).json({ updatedUser: updatedUser });
  } catch (error) {
    // Handle any potential errors
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { addaddress };
