import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumberString, IsDateString, IsOptional } from 'class-validator';

export class CreatePaymentDto {

  @ApiProperty()
  @IsNumberString()
  memberId!: string;

  @ApiProperty()
  @IsString()
  year!: string;

  @ApiProperty()
  @IsNumberString()
  amount!: string;

  @ApiProperty()
  @IsDateString()
  paymentDate!: string;
}

export class UpdatePaymentDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  amount?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  paymentDate?: string;
}
