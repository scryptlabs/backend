import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier_Item } from './supplier_item.entity';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  item_id:number;

  @Column()
  name:string;

  @Column()
  category: string;

  @Column()
  brand:string;

  @Column()
  picture:string; //string for now

  @Column()
  description:string;

  @IsNumber()
  @Type(() => Number)
  @Column()
  quantity: number; //quantity on hand workshop

  @Column()
  timestamp:string; //TODO make this a date later

  @OneToMany(type => Supplier_Item, supplier_item => supplier_item.item_id)
  supplier_items: Supplier_Item[];

  // @Column()
  // supplier_id:number;


}