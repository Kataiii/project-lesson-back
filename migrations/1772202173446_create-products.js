export const up = (pgm) => {
    pgm.createTable('products', {
      id: 'id',
      name: { type: 'varchar(255)', notNull: true },
      price: { type: 'integer', notNull: true },
      image: { type: 'text' },
      description: { type: 'text' },
      created_at: { type: 'timestamp', default: pgm.func('now()') }
    });
  };
  
  export const down = (pgm) => {
    pgm.dropTable('products');
  };