const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require ('sequelize');
const Op = Sequelize.Op;
const User = require ('./../models').User;

const create = async (req, res) => {
  const {email, password} = req.body;
  const passwordHashed = bcrypt.hashSync (password, 10);

  try {
    const user = await User.findOne ({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (user) {
      res.status (200).json ({message: 'User exists'});
    } else {
      const user = await User.create ({email: email, password: passwordHashed});

      if (user) {
        res.json ({user});
      } else {
        res.status (404).json ({message: 'User create error'});
      }
    }
  } catch (error) {
    res.status (500).json (error);
  }
};

const login = async (req, res) => {
  const {email, password} = req.body;
  try {
      const user = await User.findOne({
          where: {
              email: {
                  [Op.eq]: email
              }
          }
      });
      if(user){
        const rightPassword = bcrypt.compareSync(password, user.password);
        if(rightPassword){
            const token = jwt.sign({
                email, id: user.id
            }, 'serii1981', {
                expiresIn: 60*60*1000
            });
            res.status(200).json({message: 'User is logged in', token});
        }else{
            res.status(404).json({message: 'Incorrect password'});
        }
      }else{
        res.status(404).json({message: "Incorrect email..."});
      }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {create, login}