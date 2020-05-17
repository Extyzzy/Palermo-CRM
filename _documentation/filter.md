Example JSON format for expands elements - Catalog Page
```json
   data: {
   filter_title: "Ноутбуки",
   checkboxes: 
   [
             {
               name: 'Тип',
               type: 'checkbox',
               values: [
                 {
                   id: 'NKl6KGYL',
                   name: 'Ноутбук',
                   checked: false,
                   disabled: false,
                   total: 246
                 },
                 {
                   id: '239VdnYV',
                   name: 'Ультрабук',
                   checked: false,
                   disabled: false,
                   total: 15
                 },
                 {
                   id: 'dX9KXlqM',
                   name: 'Трансформер',
                   checked: true,
                   disabled: false,
                   total: 147
                 }
               ],
               expanded: true
             },
             {
               name: 'Производитель',
               type: 'checkbox',
               values: [
                 {
                   id: 'WNYvga1a',
                   name: 'Acer',
                   checked: false,
                   disabled: false,
                   total: 274
                 },
                 {
                   id: 'pB1Er973',
                   name: 'Apple',
                   checked: false,
                   disabled: false,
                   total: 13
                 },
                 {
                   id: 'E1MXBXY4',
                   name: 'Dell',
                   checked: true,
                   disabled: false,
                   total: 98
                 }
               ],
               expanded: true
             },
             {
               "name": "Стоимость",
               "type": "chart",
               "values": {
                 "data": [0, 50, 25, 28, 10, 8, 5, 2, 1],
                 "maxPrice": 100500
               }
             },
             {
               name: 'Размер',
               type: 'size',
               values: [
                 {
                   name: 'M',
                   checked: false,
                   disabled: false
                 },
                 {
                   name: 'XL',
                   checked: false,
                   disabled: false
                 },
                 {
                   name: 'S',
                   checked: true,
                   disabled: false
                 }
               ],
               expanded: true
             },
             {
               name: 'Цвет',
               type: 'color',
               values: [
                 {
                   name: '#57E0BB',
                   checked: false,
                   disabled: false
                 },
                 {
                   name: '#63C4F9',
                   checked: false,
                   disabled: false
                 },
                 {
                   name: '#96A0E8',
                   checked: true,
                   disabled: false
                 }
               ],
               expanded: true
             },
             {
                name: 'Стоимость',
                type: 'chart',
                values: [0, 50, 20],
                expanded: true
              }
           ]
   }
```
