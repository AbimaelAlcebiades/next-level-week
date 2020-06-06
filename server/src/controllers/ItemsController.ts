import { Request, Response } from "express";
import dataBaseConnection from "../database/connection";

class ItemsControllers {
  async index(request: Request, response: Response) {
    const items = await dataBaseConnection('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`
      }
    });
    return response.json(serializedItems);
  }
}

export default ItemsControllers;