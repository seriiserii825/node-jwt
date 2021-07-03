const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Student = require("./../models").Student;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwt.config");

const create = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const student = await Student.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });

    if (student) {
      res.status(200).json({ message: "Email exists, try another" });
    } else {
      await Student.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10)
      });
      res.status(201).json({ message: "User was created" });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });
    if (student) {
      const correctPassword = await bcrypt.compare(password, student.password);
      if (correctPassword) {
        const token = jwt.sign(
          { id: student.id, email: student.email },
          jwtConfig.secret,
          {
            expiresIn: 60 * 2
          }
        );

        res.json({ message: "Student is logged in", token });
      } else {
        res.status(404).json({ message: "Student password doesn't exists" });
      }
    } else {
      res.status(404).json({ message: "Student email doesn't exists" });
    }
  } catch (error) {
    console.log(error, "error");
  }
};

const validate = async (req, res) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, jwtConfig.secret, (error, decode) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json(decode);
      }
    });
  } else {
    res.status(404).json({ message: "Token not found" });
  }
};

module.exports = { create, login, validate };
