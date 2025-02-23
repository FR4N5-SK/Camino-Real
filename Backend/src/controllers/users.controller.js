import Users from "../models/users.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  // Registro de usuario
  async registerUser(req, res) {
    const {
      name,
      lastname,
      email,
      password,
      subscription = "Básica",
      role = "user",
    } = req.body;
    if (!name || !password || !lastname || !email) {
      return res
        .status(400)
        .json({ status: 400, message: "Todos los campos son obligatorios." });
    }

    // Aqui verificamos que la clave tenga un formato valido
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,128}$/;
    if (!password.match(passwordRegex)) {
      return res
        .status(400)
        .json({
          status: 400,
          message:
            "La contraseña debe tener entre 8 y 128 caracteres, e incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y no puede contener espacios.",
        });
    }

    try {
      // Hasheamos la clave
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new Users({
        name,
        lastname,
        email,
        password: hashedPassword,
        role,
        subscription
      });

      await newUser.save();
      res
        .status(201)
        .json({
          status: 200,
          message: "Usuario creado exitosamente",
          user: { name, lastname, email, subscription },
        });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al crear el usuario: " + error.message,
        });
    }
  }

    // Inicio de sesión
    async loginUser(req, res) {
        const { email, password } = req.body;
    
        try {
          const user = await Users.findOne({ email });
    
          if (!user) return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
    
          const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
          if (!isPasswordCorrect) return res.status(400).json({ status: 400, message: 'Credenciales inválidas' });
    
          const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
          res.status(200).json({ status: 200, result: user, token, message: 'Has iniciado sesión exitosamente' });
        } catch (error) {
          res.status(500).json({ status: 500, error: 'Error al iniciar sesión: ' + error.message });
        }
    }

    // Todos los usuarios
    async allUsers(req, res) { 
        try {
            const users = await Users.find();
            res.status(200).json({ status: 200, message: 'Usuarios Listados exitosamente', result: users});
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error al listar los usuarios: ' + error.message });
        }
    }

    // Eliminar un usuario
    async deleteUser(req, res) { 
        const { id } = req.params;
        try {
            const deleteUser = await Users.findByIdAndDelete(id);
            if (deleteUser === null) {
                return res.status(400).json({ status: 400, message: 'No existe el usuario' });
            }
            res.status(200).json({ status: 200, message: 'Usuario eliminado exitosamente', result: deleteUser});
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error al eliminar el usuario: ' + error.message });
        }
    }
}

export default new UserController();
