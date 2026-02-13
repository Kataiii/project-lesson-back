
export const up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        name: {type: 'varchar(255)', nowNull: true},
        email: {type: 'varchar(255)', nowNull: true},
        password: 'text'
    })
};

export const down = (pgm) => {
    pgm.dropTable('users');
};
