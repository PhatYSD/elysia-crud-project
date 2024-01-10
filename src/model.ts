import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

type Query = {
    username: string,
    password: string,
}

export function findMany(): Query[] {
    const query = db.query(`SELECT * FROM 'Users';`);

    return query.all() as Query[];
}

export function findOne(id: number): Query {
    const query = db.query(`SELECT * FROM 'Users' WHERE id = $id;`);

    return query.get({ $id: id }) as Query;
}

export function createOne(data: Query): boolean {
    const query_1 = db.query(`SELECT * FROM 'Users' WHERE username = $username;`);

    if (query_1.get({ $username: data.username })) return false;

    const query_2 = db.query(`INSERT INTO 'Users' (username, password) VALUES ($username, $password);`);

    query_2.run({ $username: data.username, $password: data.password });
    return true;
}

export function updateOne(id: number, data: Query): boolean {
    if (!findOne(id)) return false;

    try {
        const query = db.query(`
            UPDATE 'Users'
            SET username = $username,
                password = $password
            WHERE id = $id;
        `);
        query.run({ $username: data.username, $password: data.password, $id: id });
        return true;
    } catch (error) {
        return false;
    }
}

export function deleteOne(id: number): boolean {
   if (!findOne(id)) return false;

   const query = db.query(`DELETE FROM 'Users' WHERE id = $id;`);
   query.run({ $id: id });
   return true;
}