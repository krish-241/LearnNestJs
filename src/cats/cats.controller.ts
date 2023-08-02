import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  ForbiddenException,
  Param,
  ParseIntPipe,
  HttpStatus,
  UseInterceptors,
  Put,
  ValidationPipe,
  // SetMetadata,
  // UseGuards,
  // DefaultValuePipe,
  // UsePipes,
  // UseFilters,
} from '@nestjs/common';

import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Roles } from 'src/common/decorators/roles.decorator';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { User } from 'src/common/decorators/user.decorator';
// import { LogginInterceptor } from 'src/common/interceptors/logging.interceptor';
// import { RolesGuard } from 'src/common/guards/roles.guard';
// import { ValidationPipe } from 'src/common/pipes/validation.pipe';
// import { createCatSchema } from './schemas/cat.schema';
// import { JoiValidationPipe } from 'src/common/pipes/joi.pipe';
// import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('cats')
// @UseFilters(HttpExceptionFilter)
// @UseGuards(RolesGuard)
// @UseInterceptors(LogginInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UseFilters(HttpExceptionFilter)
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // @SetMetadata('roles', ['admin'])
  @Roles('admin')
  // async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      // new DefaultValuePipe(0),
      // ParseIntPipe
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Put()
  async updateCat(
    @User(new ValidationPipe({ validateCustomDecorators: true }))
    firstName: string,
  ) {
    // async updateCat(@User('firstName') firstName: string) {
    console.log("User's First Name: ", firstName);
  }

  @Delete()
  async deleteCat() {
    throw new ForbiddenException();
  }
}
