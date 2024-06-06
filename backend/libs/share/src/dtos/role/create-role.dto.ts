import { Roles } from '@app/share';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  value: Roles;
}
