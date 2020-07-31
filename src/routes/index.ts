import { Router } from 'express';

import appointmentsRoute from './appointments.routes';
import usersRoutes from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRouter);

export default routes;
