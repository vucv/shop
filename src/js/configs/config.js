angular.module('myApp.config', [])
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
        name: 'store',
        columns: [
            {name: 'ID', type: 'INTEGER PRIMARY KEY ASC'},
            {name: 'name', type: 'TEXT'},
            {name: 'address', type: 'TEXT'},
            {name: 'icon', type: 'INTEGER'},
            {name: 'tel', type: 'TEXT'}
        ]
      },
      {
        name: 'category',
        columns: [
        {name: 'ID', type: 'INTEGER PRIMARY KEY ASC'},
        {name: 'name', type: 'TEXT'},
        {name: 'icon', type: 'TEXT'}
        ]
      },
      {
        name: 'product',
        columns: [
        {name: 'ID', type: 'INTEGER PRIMARY KEY ASC'},
        {name: 'categoryID', type: 'INTEGER'},
        {name: 'name', type: 'TEXT'},
        {name: 'icon', type: 'TEXT'},
        {name: 'image', type: 'TEXT'},
        {name: 'price', type: 'INTEGER'}
        ]
      },
      {
        name: 'orders',
        columns: [
        {name: 'ID', type: 'INTEGER PRIMARY KEY ASC'},
        {name: 'storeID', type: 'INTEGER'},
        {name: 'type', type: 'INTEGER'},
        {name: 'date', type: 'DATETIME'},
        {name: 'note', type: 'TEXT'}
        ]
      },
      {
        name: 'order_detail',
        columns: [
        {name: 'ID', type: 'INTEGER PRIMARY KEY ASC'},
        {name: 'ordersID', type: 'INTEGER'},
        {name: 'productID', type: 'INTEGER'},
        {name: 'price', type: 'INTEGER'}
        ]
      }
    ]
});