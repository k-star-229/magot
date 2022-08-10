const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error - userController - authUser');
  }
}

const getAuthToken = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ 
          error: { 
            msg: 'User does not exists!',
            type: 'warning'
          }
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ 
          error: { 
            msg: 'Password is wrong!',
            type: 'warning'
          }
        });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send('Server Error - userController - getAuthToken');
  }
}

const registerUser = async (req, res) => {
  const { name, email, password, country } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ 
          error: { 
            msg: 'User already exists',
            type: 'warning'
          }
        });
    }

    user = new User({
      name,
      email,
      country,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send('Server error - userController - registerUser');
  }
}

const updateMembershipByUser = async (req, res) => {
  const membership_type = req.body.membership_type;

  var to;
  switch (membership_type) {
    case 1:
      to = 2592000000; // monthly - 30 days
      break;
    case 2:
      to = 31536000000; // annual - 1 year
      break;
    default:
      to = 31536000000;
  }

  const history = {
    membership: req.body.membership,
    membership_type: membership_type,
    to: new Date(Date.now() + to)
  }

  const user = {
    membership: req.body.membership,
    membership_type: membership_type,
    period: new Date(Date.now() + to),
    history: [...history]
  };

  try {
    let updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {$set: user}
    );

    return res.json(updateUser);
  } catch (err) {
    return res.status(500).send('Server error - userController - updateMembershipByUser');
  }
}

const updateMembershipByAdmin = async (req, res) => {
  const user = {
    membership: req.body.membership
  };

  try {
    await User.findOneAndUpdate(
      {email: req.body.email},
      {$set: user}
    );

    return res.json(true);
  } catch (err) {
    return res.status(500).send('Server error - userController - updateMembershipByAdmin');
  }
}

const getAllUsers = async (res) => {
  try {
    const users = await User.find();    

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error - userController - getAllUsers');
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndRemove({email: req.body.email});

    return res.json(true);
  } catch (err) {
    res.status(500).send('Server error - userController - deleteUser');
  }
}

const updateExpiredByAdmin = async (req, res) => {
  const user = {
    expired: req.body.expired
  };

  try {
    await User.findOneAndUpdate(
      {email: req.body.email},
      {$set: user}
    );

    return res.json(true);
  } catch (err) {
    return res.status(500).send('Server error - userController - updateExpiredByAdmin');
  }
}

module.exports = {
  getAuthToken,
  authUser,
  registerUser,
  getAllUsers,
  deleteUser,
  updateMembershipByUser,
  updateMembershipByAdmin,
  updateExpiredByAdmin
};