import { ApiProperty } from '@nestjs/swagger';

export class CreateInterestDto {
  @ApiProperty()
  value: string;
}
