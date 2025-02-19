import { Roles } from '@app/share';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ enum: ['admin', 'user', 'moder'] })
  value: Roles;

  @ApiProperty()
  description: string;
}
