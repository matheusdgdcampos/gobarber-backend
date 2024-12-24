import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentCreateRequestDto } from './dto/appointment-create-request.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: AppointmentCreateRequestDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }
}
