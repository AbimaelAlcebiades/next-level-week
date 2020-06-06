import { Request, Response } from "express";
import dataBaseConnection from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await dataBaseConnection('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .where('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*');

    return response.json(points);

  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await dataBaseConnection('points').where('id', id).first();

    const items = await dataBaseConnection('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.id', 'items.title');

    if (!point) {
      return response.status(404).json({ 'message': `Point with id ${id} not found` });
    }

    return response.json({
      point, items
    });

  }

  async create(request: Request, response: Response) {

    const {
      name,
      email,
      whatsapp,
      lat,
      long,
      city,
      uf,
      items
    } = request.body;

    const trx = await dataBaseConnection.transaction();

    const point = {
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      lat,
      long,
      city,
      uf
    };

    const idsReturned = await trx('points').insert(point);

    const point_id = idsReturned[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      };
    });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point
    });

  }
}

export default PointsController;