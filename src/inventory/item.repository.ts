import { EntityRepository, Repository } from 'typeorm';
import { Item } from './item.entity';
import { Supplier_Item } from './supplier_item.entity';
import { InternalServerErrorException } from '@nestjs/common';


@EntityRepository(Supplier_Item) // the 'Supplier_Item' in brackets tells typeorm that this is the repository for tasks entity
export class ItemRepository extends  Repository<Supplier_Item>{

  async getItemById(id: number) //change this to take a filter dto
    : Promise<Supplier_Item[]>{
    // const {status,search} = filterDto;

    //using query builder to build up a query from the database
    const query = this.createQueryBuilder('Supplier_Item'); //query builder object is based on a task because the class above extends Repository Supplier_Item

    query.where('Supplier_Item.item_id = :id', {id}); //{userId: user.id}) ;
    // query.where('task.userId2323 = :userId', {userId: user.id}) ;//for 7.2 we made it fail
    // if(status){
    //
    //   query.andWhere('task.status = :status', {status});// note the : status is a variable and {status} is the value for it , can also be done {status: 'OPEN'}, this is not dynamic though so we dont use it
    //   //note that andWhere is what we use to create a where clause essentially, we use andWhere insstead of just where because andWhere adds on to a previous where, whereas just where overrites all previous
    // }
    //
    // if(search){
    //
    //   query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`}) ; //what we are doing here is allowing percentage search for the sql query
    //
    // }
    try {
      const Supplier_Item = await query.getMany();
      return Supplier_Item;
    }catch (e) {
      // this.logger.error(`Failed to get tasks for user ${user.username}, Filters ${JSON.stringify(filterDto)}`,e.stack); //error produces a stacktrace
      console.log(`Failed to get Supplier_Items for item `); //error produces a stacktrace
      console.log(e.code)
      throw new InternalServerErrorException();

    }

  }
}
