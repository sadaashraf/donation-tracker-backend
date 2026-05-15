import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateMemberDto {

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fatherName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;
}

export class UpdateMemberDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fatherName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;
}
