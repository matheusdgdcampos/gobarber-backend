import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id } = request.params;
      const { month, day, year } = request.body;

      const listProviderDayAvailability = container.resolve(
        ListProvidersDayAvailabilityService,
      );

      const availability = await listProviderDayAvailability.execute({
        provider_id,
        day,
        month,
        year,
      });

      return response.status(200).json(availability);
    } catch (error) {
      return response.status(400).send();
    }
  }
}
