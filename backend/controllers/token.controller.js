const { getTokenByIds } = require('../helpers/nomics');
const Token = require('../models/Token');

const listNewToken = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (fields, files) {
      const token = {
        address: fields.address,
        chain: fields.chain
      }

      let list = await Token.findOne({token});
      if (list) {
        return res
          .status(400)
          .json({ 
            error: { 
              msg: 'Token with this contract address already exists!',
              type: 'warning'
            }
          });
      }

      let icon = null;
      if (files.icon) {
        icon = files.icon.originalFilename;
        const oldpath = files.icon.filepath;        
        const newpath = './../frontend/public/img/tokens/' + icon;

        const readStream = fs.createReadStream(oldpath);
        const writeStream = fs.createWriteStream(newpath);

        readStream.pipe(writeStream);
        readStream.on('end', function () {
          fs.unlinkSync(oldpath);
        });
      }

      const social = {
        website: fields.website,
        telegram: fields.telegram
      };

      const newlist = new Token({
        social,
        token: {
          address: fields.address,
          chain: fields.chain,
          icon: icon
        }
      });

      await newlist.save();

      res.json({newlist});
    });
  } catch (err) {
    return res.status(500).send('Server Error - tokenController - listNewToken');
  }
}

const getAllTokensByUser = async(res) => {
  try {
    const list = await Token.find({ isShow: true }).populate(['social', 'token', 'date', 'isPaid']);

    let ids = [];

    if(list.length > 0) {
      list.map((item) => {
        ids.push(item.token.id);
      });

      const data = await getTokenByIds(ids);

      return res.json(data);
    } else {
      return res.status(400).json(false);
    }
    
  } catch (err) {

  }
  const data = await getTokenBySymbol();
  return res.json(data);
}

const updateTokenDetail = async (req, res) => {
  try {
    await Token.findOneAndUpdate(
      {
        token: {
          address: req.body.oldAddress
        }
      },
      {
        token: {
          id: req.body.tokenId,
          name: req.body.name,
          symbol: req.body.symbol,
          address: req.body.newAddress,
          chain: req.body.chain
        },
        social: {
          telegram: req.body.telegram,
          website: req.body.website
        }
      }
    );

    res.json(await Token.findOne({
      token: {
        address: req.body.address
      }
    }));
  } catch (err) {
    return res.status(500).send('Server Error - tokenController - getAllTokensByUser');
  }
}

const updateIsShow = async (req, res) => {
  const list = {
    isShow: req.body.isShow
  };

  try {
    await Token.findOneAndUpdate(
      {
        token: {
          address: req.body.address
        }
      },
      {$set: list}
    );

    return res.json(true);
  } catch (err) {
    return res.status(500).send('Server Error - tokenController - updateIsShow');
  }
}

const updateIsPaid = async (req, res) => {
  const list = {
    isPaid: req.body.isPaid
  };

  try {
    await Token.findOneAndUpdate(
      {
        token: {
          address: req.body.address
        }
      },
      {$set: list}
    );

    return res.json(true);
  } catch (err) {
    return res.status(500).send('Server Error - tokenController - updateIsPaid');
  }
}

const getAllTokensByAdmin = async (res) => {
  try {
    const list = await Token.find();

    res.json(list);
  } catch (err) {
    return res.status(500).send('Server Error - tokenController - getAllTokensByAdmin');
  }
}

const deleteToken = async (req, res) => {
  try {
    await Token.findOneAndRemove(
      {
        token: {
          address: req.body.address
        }
      }
    );

    return res.json(true);
  } catch (err) {
    return res.status(500).send('Server Error - tokenController - deleteToken');
  }
}

module.exports = {
  listNewToken,
  getAllTokensByUser,
  getAllTokensByAdmin,
  updateTokenDetail,
  updateIsShow,
  updateIsPaid,
  deleteToken
}