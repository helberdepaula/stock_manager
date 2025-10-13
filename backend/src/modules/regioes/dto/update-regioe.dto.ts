import { PartialType } from '@nestjs/swagger';
import { CreateRegioeDto } from './create-regioe.dto';

export class UpdateRegioeDto extends PartialType(CreateRegioeDto) {}
