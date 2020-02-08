module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'John Steves',
          street: '1ª Av. do CAB',
          number: '130',
          complement: 'GAB 108 NDR',
          city: 'Salvador',
          state: 'BA',
          postcode: '41745-001',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Anne Hathaway',
          street: '1ª Av. do CAB',
          number: '130',
          complement: 'GAB 208 NDR',
          city: 'Salvador',
          state: 'BA',
          postcode: '41745-001',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
