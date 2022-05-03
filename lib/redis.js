import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
    if (!client.isOpen()) {


        // connect to the database
        await client.open(process.env.REDIS_URL);
    }
}


class Car extends Entity {}
// creo lo schema di default

// textSearch: enable fulltext search on the db query with redisearch
let schema = new Schema(
    Car,
    {
        make: { type: 'string'},
        model: { type: 'string'},
        image: { type: 'string'},
        description: { type: 'text', textSearch: true}
    },
    {
        dataStructure: 'JSON'
    }
);

export async function createCar(data) {
 
    await connect();

    const repository = client.fetchRepository(schema);

    const car = repository.createEntity(data);

    const id = await repository.save(car);

    return id;
}

export async function createIndex() {

    await connect();

    const repository = client.fetchRepository(schema);

    await repository.createIndex()

}

export async function searchCars(q) {

    await connect();

    const repository = client.fetchRepository(schema);

    const cars = await repository.search()
        .where('make').eq(q)
        .or('model').eq(q)
        .or('description').matches(q)
        .return.all();

    return cars;
}