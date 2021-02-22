import {
  ObjectID,
  Column,
  Entity,
  ObjectIdColumn,
} from 'typeorm';

@Entity('report')
export default class {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  sum: number;

  @Column()
  date: Date;
}
