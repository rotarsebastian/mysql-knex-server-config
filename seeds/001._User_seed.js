
exports.seed = knex => {
  // Deletes ALL existing entries
  const users = [
    { username: 'admin', first_name: 'A', last_name: 'AA', password: 'pass1', 
      address_1: 'Street 1, Cph', 
      address_2: 'Street 2, Cph',
      postal_code: '2100',
      city: 'Copenhagen' },
    { username: 'poweruser', first_name: 'B', last_name: 'BB', password: 'pass2', 
      address_1: 'Street 11, Cph', 
      address_2: 'Street 22, Cph',
      postal_code: '2200',
      city: 'Copenhagen' },
    { username: 'poweruser2', first_name: 'C', last_name: 'CC', password: 'pass3', 
      address_1: 'Street 111, Cph', 
      address_2: 'Street 222, Cph',
      postal_code: '2300',
      city: 'Copenhagen' },
  ];
  return knex('addresses').del()
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      // Taking only the attributes which we need using obj destructuring and sprea operator
      const usersData = users.map(({ address_1, address_2, postal_code, city, ...userAttributes }) => userAttributes);  
      // Inserts seed entries
      return knex('users').insert(usersData);
    }).then(data => {
      return knex('addresses').insert(users.map(({ username, first_name, last_name, password, ...addressData }, index) => {
        return { user_id: data[0] + index, ...addressData };
      }));
    });
};
