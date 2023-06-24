import BaseRepository from '@repositories/base';

const VisitorsRepository = new BaseRepository(process.env.VISITORS_TABLE || '');

export { VisitorsRepository as default };
