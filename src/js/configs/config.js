angular.module('myApp.config', [])
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
        name: 'store',
        columns: [
            {name: 'ID', type: 'TEXT'},
            {name: 'name', type: 'TEXT'},
            {name: 'address', type: 'TEXT'},
            {name: 'icon', type: 'TEXT'},
            {name: 'tel', type: 'TEXT'}
        ]
      },
      {
        name: 'category',
        columns: [
        {name: 'ID', type: 'TEXT'},
        {name: 'name', type: 'TEXT'},
        {name: 'icon', type: 'TEXT'}
        ]
      },
      {
        name: 'product',
        columns: [
        {name: 'ID', type: 'TEXT'},
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
        {name: 'ID', type: 'TEXT'},
        {name: 'storeID', type: 'INTEGER'},
        {name: 'type', type: 'INTEGER'},
        {name: 'date', type: 'DATETIME'},
        {name: 'note', type: 'TEXT'}
        ]
      },
      {
        name: 'order_detail',
        columns: [
        {name: 'ID', type: 'TEXT'},
        {name: 'ordersID', type: 'INTEGER'},
        {name: 'productID', type: 'INTEGER'},
        {name: 'total', type: 'INTEGER'},
        {name: 'price', type: 'INTEGER'}
        ]
      },
      {
        name: 'sale',
        columns: [
        {name: 'ID', type: 'TEXT'},
        {name: 'date', type: 'INTEGER'},
        {name: 'productID', type: 'INTEGER'},
        {name: 'total', type: 'INTEGER'},
        {name: 'price', type: 'INTEGER'}
        ]
      },
      {
        name: 'sync_table',
        columns: [
          {name: 'query', type: 'TEXT'},
          {name: 'bindings', type: 'TEXT'},
          {name: 'timestamp', type: 'TEXT'}
        ]
      },
      {
        name: 'sync_info',
        columns: [
          {name: 'timestamp', type: 'TEXT'}
        ]
      }
    ]
});