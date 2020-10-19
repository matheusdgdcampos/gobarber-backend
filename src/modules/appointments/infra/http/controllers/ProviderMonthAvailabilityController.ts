import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id } = request.params;
      const { month, year } = request.body;

      const listProviderMonthAvailability = container.resolve(
        ListProvidersMonthAvailabilityService,
      );

      const availability = await listProviderMonthAvailability.execute({
        provider_id,
        month,
        year,
      });

      return response.json(availability);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
