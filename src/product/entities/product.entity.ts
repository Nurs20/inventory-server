import { Forecast } from 'src/forecast/entities/forecast.entity';
import { SaleHistory } from 'src/sale-history/entities/sale-history.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ default: 1 })
    amount: number

    @Column({ default: 0 })
    price: number

    // relations
    @OneToMany(() => SaleHistory, (sale) => sale.product, {cascade: true})
    sale: SaleHistory[]

    @OneToMany(() => Forecast, (forecast) => forecast.product, {onDelete: "CASCADE"})
    forecast: Forecast[]
}
