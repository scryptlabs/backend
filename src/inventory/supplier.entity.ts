import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn()
  supplier_id:number;

  @Column()
  company_name:string;

  @Column()
  contact_name:string;

  @Column()
  street_address: string;

  @Column()
  province:string;

  @Column()
  city:string;

  @Column()
  postcode:string;

  @Column()
  landline:string;

  @Column()
  mobile:string;

  // @CreateDateColumn TODO use this as timestamp?

  @Column()
  email:string;

  @Column()
  website:string;

  @Column()
  timestamp:string; //TODO make this a date later




}