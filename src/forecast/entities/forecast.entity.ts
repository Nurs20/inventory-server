import { Product } from 'src/product/entities/product.entity';
import { SaleHistory } from 'src/sale-history/entities/sale-history.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Entity } from 'typeorm';
@Entity('forecast')
export class Forecast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({type: 'decimal'})
  forecast_amount: number;

  // relation
  @ManyToOne(() => Product, (product) => product.forecast, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToOne(() => SaleHistory, (sale) => sale.forecast, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_history_id' })
  sale: SaleHistory;
}
