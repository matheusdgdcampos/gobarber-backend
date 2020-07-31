import { Router } from 'express';

import appointmentsRoute from './appointments.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRoutes);

export default routes;
