import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleType } from './role.type';
import { RoleService } from './role.service';
import { roleDTOInput } from './roleDTO.input';


@Resolver(of => RoleType)
export class RoleResolver{
  constructor(
    private roleService: RoleService
  ) {
  }

  @Query(returns => RoleType)
  //TODO make this use a DTO?
  getRole(
    @Args('role_id') role_id: string){
    console.log("test 1")
    return this.roleService.getRole(role_id);
    console.log("test 1.2")
  }

  @Mutation(returns => RoleType)
  createRole(
    @Args('roleDTO') roleDTO: roleDTOInput
  ){
    return this.roleService.createRole(roleDTO);
  }
}