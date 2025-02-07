import { Injectable } from '@nestjs/common';
import { Company, Pizza } from '@prisma/client';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  create(data: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.create(data);
  }

  findAll(): Promise<(Company & { pizzas: Pizza[] })[]> {
    return this.companyRepository.findMany();
  }

  findOne(id: number): Promise<Company & { pizzas: Pizza[] }> {
    return this.companyRepository.findUnique(id);
  }

  update(
    id: number,
    data: UpdateCompanyDto,
  ): Promise<Company & { pizzas: Pizza[] }> {
    return this.companyRepository.update(id, data);
  }

  remove(id: number): Promise<Company> {
    return this.companyRepository.delete(id);
  }
}
