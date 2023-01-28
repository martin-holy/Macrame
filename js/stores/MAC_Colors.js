export default {
  records: [],
  schema: {
    id: 11,
    name: 'MAC_Colors',
    title: 'Barvy',
    orderBy: 'code',
    orderAsc: true,
    properties: [
      { name: 'id', title: 'Id', type: 'int', required: true, hidden: true },
      { name: 'code', title: 'Kód', type: 'text', required: true },
      { name: 'bgColor', title: 'Barva', type: 'text' }
    ]
  }
}