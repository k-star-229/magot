const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Admin = require('../models/Admin');

const authAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');    

    res.json(admin);
  } catch (err) {
    res.status(500).send('Server Error - adminController - authAdmin');
  }
}

const getAuthToken = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(400)
        .json({ 
          error: { 
            msg: 'User does not exists!',
            type: 'warning'
          }
        });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

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
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn: '5 days'},
      (err, token) => {
        if (err) throw err;
        res.json({token});
      }
    );
  } catch (err) {
    res.status(500).send('Server Error - adminController - getAuthToken');
  }
}

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res
        .status(400)
        .json({ 
          error: { 
            msg: 'User already exists',
            type: 'warning'
          }
        });
    }

    admin = new Admin({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    await admin.save();

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn: '5 days'},
      (err, token) => {
        if (err) throw err;
        res.json({token});
      }
    );
  } catch (err) {
    res.status(500).send('Server Error - adminController - registerAdmin');
  }
}

const getAllAdmins = async (res) => {
  try {
    const admin = await Admin.find().populate(['name', 'email', 'password', 'date']);    

    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error - adminController - getAllAdmins');
  }
}

const deleteAdmin = async (req, res) => {
  try {
    await Admin.findOneAndRemove({email: req.body.email});

    res.json(true);
  } catch (err) {
    res.status(500).send('Server Error - adminController - deleteAdmin');
  }
}

module.exports = {
  getAuthToken,
  authAdmin,
  registerAdmin,
  getAllAdmins,
  deleteAdmin
};