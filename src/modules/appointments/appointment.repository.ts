import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { isEqual } from 'date-fns';

@Injectable()
export class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(appointment: Appointment) {
    this.appointments.push(appointment);
    return appointment;
  }

  public findByDate(date: Date): Appointment | undefined {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public findAll(): Appointment[] {
    return this.appointments;
  }
}
