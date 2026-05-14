import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) { }

  @Get('stats')
  getStats(@Query('year') year?: string) {
    const y = year ?? new Date().getFullYear().toString();
    return this.service.getStats(y);
  }
}
