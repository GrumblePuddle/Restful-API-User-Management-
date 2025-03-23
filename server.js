import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let users = [
  { id: 1, name: "Gustav Liffner", age: "26", hobby: "Climbing" },
  { id: 2, name: "Björn Liffner", age: "56", hobby: "Sailing" },
  { id: 3, name: "Sofie Liffner", age: "45", hobby: "Running" },
  { id: 4, name: "Ines Liffner", age: "16", hobby: "Fotboll" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

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

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.json({ message: `User with id ${userId} deleted successfully` });
});
