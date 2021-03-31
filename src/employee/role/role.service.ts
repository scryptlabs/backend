import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { roleDTOInput } from './roleDTO.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  async getRole (role_id: string):Promise<Role>{
    return this.roleRepository.findOne(role_id);
  }

  async createRole(roleDTO: roleDTOInput):Promise<Role>{

    const {name, description,level} = roleDTO;
    const role = this.roleRepository.create(
      {
        //cannot desctruct like below
        // roleDTO.name,
        //  roleDTO.description,
        //  roleDTO.level,
        role_id: uuid(),
        name,
        description,
        level,
      }
    );

    return  this.roleRepository.save(role);
  }

  async getManyRoles(roleIds: string[]):Promise<Role []>{
    // return this.roleRepository.find(
    //   {where :
    //       {role_id : {
    //           $in:roleIds,}
    //       }
    //   });
    return this.roleRepository.findByIds(roleIds);
  }
}
