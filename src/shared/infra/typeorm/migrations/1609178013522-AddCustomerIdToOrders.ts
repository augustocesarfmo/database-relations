import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCustomerIdToOrders1609178013522
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrdersCustomer',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NUll',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomers');

    await queryRunner.dropColumn('orders', 'customer_id');
  }
}
