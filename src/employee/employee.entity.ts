import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Supplier_Item } from '../inventory/supplier_item.entity';
import { EmployeeRole } from './employee-role/employee-role.entity';

@Entity()
export class Employee {//extends BaseEntity{

  // @ObjectIdColumn() //internal postgres db column
  // int_id :string;
  @PrimaryColumn()
  staff_id :string; //external exposed ID
//personal details
  @Column()
  first_name :string;
  @Column()
  last_name :string;
  @Column()
  dob  :string;
  @Column()
  id_number :string;
  @Column()
  id_doc:string;
  @Column()
  gender :string;
//contact details
  @Column()
  email :string;
  @Column()
  cell_:string;
  @Column()
  telephone_:string;
  @Column()
  address_line1 :string;
  @Column()
  address_line2 :string;
  @Column()
  suburb :string;
  @Column()
  city :string;
  @Column()
  province :string; //create LOV
  @Column()
  zip :string;

//emergency info
  @Column()
  blood_type :string;  //create LOV
  @Column()
  medical_aid :string;
  @Column()
  medical_aid_no :string;
  @Column()
  kin_relationship :string;
  @Column()
  kin_full_name :string;
  @Column()
  kin_cell :string;
  @Column()
  kin_telephone :string;
  @Column()
  kin_address_line1 :string;
  @Column()
  kin_address_line2 :string;

  //joins
  // @one
  // @OneToMany(type => Supplier_Item, supplier_item => supplier_item.item_id)
  // @OneToMany(type => EmployeeRole, )
  @Column("text", {array:true})
  roles: string [];
}
