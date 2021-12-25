import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tuit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 280 })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.tuits, {cascade: true})
    @JoinColumn({ name: 'user_id' })
    user: User;
}