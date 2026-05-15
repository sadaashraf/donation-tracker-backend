import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumberString } from 'class-validator';

export class CreateYearPlanDto {

  @ApiProperty()
  @IsString()
  year!: string;

  @ApiProperty()
  @IsNumberString()
  amountRequired!: string;
}
