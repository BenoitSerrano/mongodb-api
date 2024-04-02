import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Prompt {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    prompt: string;

    @Column()
    clientAddress: string;

    @Column()
    response?: string;
}
