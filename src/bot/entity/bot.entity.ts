import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BotUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: number;

  @Column({ nullable: true })
  username: string;
}