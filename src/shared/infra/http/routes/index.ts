import { Router } from 'express';

import appointmentsRoute from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRouter);

export default routes;
