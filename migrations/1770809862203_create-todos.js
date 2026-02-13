export const up = (pgm) => {
  pgm.createTable('todos', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    description: 'text',
    is_completed: { type: 'boolean', default: false },
    created_at: { type: 'timestamp', default: pgm.func('now()') }
  });
};

export const down = (pgm) => {
  pgm.dropTable('todos');
};