import express from "express";
import connection from "./database/connection";

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await connection('items').select('*');

    const serializedItems = items.map(item => {
        return {
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    });

    return response.json(serializedItems);
});

export default routes;

