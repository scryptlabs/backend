import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role{
  @PrimaryColumn()
  role_id  : string;

  @Column()
  name :string;
  @Column()
  description :string;
  @Column()
  level: number;
}