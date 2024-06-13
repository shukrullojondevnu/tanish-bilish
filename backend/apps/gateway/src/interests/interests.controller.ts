import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InterestsService } from './interests.service';
import {
  CreateInterestDto,
  Interest,
  PaginationSearchI,
  UpdateInterestDto,
} from '@app/share';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Interests')
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestsService.create(createInterestDto);
  }

  @Get()
  findAll(@Query() query: PaginationSearchI<Interest>) {
    return this.interestsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterestDto: UpdateInterestDto,
  ) {
    return this.interestsService.update(+id, updateInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestsService.remove(+id);
  }
}
