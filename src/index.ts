import { Elysia, t } from "elysia";

import { createOne, deleteOne, findMany, findOne, updateOne } from "./model";

const app = new Elysia();
const port = 3000;

app.get("/user", () => findMany());
app.get("/user/:id", ({ params: { id }}) => findOne(id), {
  params: t.Object({
    id: t.Numeric()
  })
});
app.post("/user", ({ body: { username, password } }) => createOne({ username, password }), {
  body: t.Object({
    username: t.String(),
    password: t.String()
  })
});
app.put("/user/:id", ({ params: { id }, body: { username, password } }) => updateOne(id, {username, password}), {
  body: t.Object({
    username: t.String(),
    password: t.String()
  }),
  params: t.Object({
    id: t.Numeric()
  })
})
app.delete("/user/:id", ({ params: { id }}) => deleteOne(id), {
  params: t.Object({
    id: t.Numeric()
  })
})

app.listen(port, (server) => {
  console.log( `Server run on port http://${server.hostname}:${server.port}`);
})