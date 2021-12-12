import { PrimaryGeneratedColumn, Column, Entity, BaseEntity} from "typeorm"; 

@Entity()
export default class Fish extends BaseEntity{
     @PrimaryGeneratedColumn()
     fish_id: number
    @Column({type: 'date'})
    last_fed: string

    @Column() 
    name: string

    @Column() 
    price: string
}
