// Get current user profile
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// Update current user profile
export const updateProfile = async (req, res) => {
  const user = req.user;
  const { firstName, lastName, username, bio, profilePic } = req.body;

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (username) user.username = username;
  if (bio) user.bio = bio;
  if (profilePic) user.profilePic = profilePic;

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete current user account
export const deleteProfile = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
