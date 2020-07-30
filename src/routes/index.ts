import { Router } from 'express';

import appointmentsRoute from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoute);

export default routes;
