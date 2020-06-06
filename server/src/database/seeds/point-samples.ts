import Knex from "knex";

export async function seed(knex: Knex) {
  await knex('points').insert([
    {
      "image": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      "name": "Mercado",
      "email": "mercado@teste.com",
      "whatsapp": "123456789",
      "lat": -46.12312321,
      "long": -35.123123,
      "city": "São Leopoldo",
      "uf": "RS"
    },
    {
      "image": "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      "name": "Deposito",
      "email": "deposito@teste.com",
      "whatsapp": "987654321",
      "lat": -46.12312321,
      "long": -35.123123,
      "city": "Canoas",
      "uf": "RS"
    }
  ]);

  await knex('point_items').insert([
    {
      "point_id": "1",
      "item_id": "1"
    },
    {
      "point_id": "1",
      "item_id": "3"
    },
    {
      "point_id": "2",
      "item_id": "4"
    },
  ])
}