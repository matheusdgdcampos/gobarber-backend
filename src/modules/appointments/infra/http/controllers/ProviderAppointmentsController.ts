import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointsmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const createAppointmentService = container.resolve(
      ListProviderAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      day,
      month,
      provider_id,
      year,
    });

    return response.json(appointment);
  }
}
