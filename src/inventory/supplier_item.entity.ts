import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Supplier_Item extends BaseEntity {

  // @Column() //TODO this is the bridging table, need to make sure it is correct
  // item_id:number;

  @ManyToOne(type => Item, item => item.supplier_items, { primary: true })
  item_id: Item;

  @Column()
  supplier_id:string;

  @Column()
  item_cost: number;

  @Column()
  item_quantity:number;

  @Column()
  purchase_date:string; //string for now TODO change to date

  @Column()
  arrival_date:string; //  TODO change to date

  @Column()
  timestamp:string; //TODO make this a date later




}