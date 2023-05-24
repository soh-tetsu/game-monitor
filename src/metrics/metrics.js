import {Gauge, register} from 'prom-client';
import fetchData from '../services/fetchDataService.js'

// define metrics
const zoneCapacity = new Gauge({
    name: 'game_server_capacity',
    help: 'number of roles can be created in each game server',
    labelNames: ['gameserver_id', 'gameserver_name', 'gameserver_status','game']
});

const zoneOnline = new Gauge({
    name: 'game_server_online',
    help: 'number of active players in each game server',
    labelNames: ['gameserver_id', 'gameserver_name', 'gameserver_status','game']
});

const zoneCreatedRole = new Gauge({
    name: 'game_server_created_roles',
    help: 'number of roles created in each game server',
    labelNames: ['gameserver_id', 'gameserver_name', 'gameserver_status','game']
});

// worker for fetching data and publish metrics
const worker = async (url, authKey, game) => {
    try {
        const res = await fetchData(url, authKey);
        // console.log(res);
        pushMetrics(res, game);
    } catch (err) {
        console.error(`Failed to update metrics for game ${game} due to ${err.message}`);
    }
}

// expose metrics of game servers
const pushMetrics = async (data, game) => {
    try {
        // const data = await fetchData();
        data.zonelist.forEach( (zone) => {
            zoneCapacity
                .labels(zone.ID.toString(), zone.svrname, zone.status, game)
                .set(zone.capacity);
            zoneOnline
                .labels(zone.ID.toString(), zone.svrname, zone.status, game)
                .set(zone.online);
            zoneCreatedRole
                .labels(zone.ID.toString(), zone.svrname, zone.status, game)
                .set(zone.createrole);
        });
        // console.log(data);
    } catch (error) {
        console.error(`Failed to update metrics: ${error.message}`)
    }
};

// entry point of updating game server metrics
export const updateMetrics = async (interval, sources) => {
    try {
        // worker per source, run concurrently
        const workers = sources.map(
            source => {
                return worker(source.url, source.auth_key, source.game);
            }
        );

        await Promise.allSettled(workers);

        // Schedule next update
        setTimeout(updateMetrics, interval, interval, sources);
    } catch (err) {
        console.error(`Error in updateMetrics: ${err.message}`);
    }
}


export const contentType = register.contentType;
export const getMetrics = async () => register.metrics();

