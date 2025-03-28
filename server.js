import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const PORT = 3001;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "A simple Express User API",
    },
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

let users = [
  { id: 1, name: "Gustav Liffner", age: "26", hobby: "Climbing" },
  { id: 2, name: "Björn Liffner", age: "56", hobby: "Sailing" },
  { id: 3, name: "Sofie Liffner", age: "45", hobby: "Running" },
  { id: 4, name: "Ines Liffner", age: "16", hobby: "Fotboll" },
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     description: Retrieve a list of users in the library
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   age:
 *                     type: string
 *                   hobby:
 *                     type: string
 */

app.get("/users", (req, res) => {
  res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     description: Add a new user to the library
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - hobby
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: string
 *               hobby:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 age:
 *                   type: string
 *                 hobby:
 *                   type: string
 */

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
    hobby: req.body.hobby,
  };
  users.push(newUser);
  res.json({ message: "New user created", user: newUser });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update existing user
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: string
 *               hobby:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 age:
 *                   type: string
 *                 hobby:
 *                   type: string
 *       404:
 *        description: User not found
 */

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.status(404).json({ message: `User with id ${userId} not found` });
  } else {
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.hobby = req.body.hobby || user.hobby;
    res.json({ message: `User with id ${userId} updated`, user });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user to delete
 *   responses:
 *     200:
 *        description: User deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *     404:
 *      description: User not found
 */

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.json({ message: `User with id ${userId} deleted successfully` });
});
