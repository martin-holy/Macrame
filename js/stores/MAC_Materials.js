export default {
  records: [],
  schema: {
    id: 13,
    name: 'MAC_Materials',
    title: 'Materiály',
    orderBy: 'name',
    orderAsc: true,
    properties: [
      { name: 'id', title: 'Id', type: 'int', required: true, hidden: true },
      { name: 'name', title: 'Název', type: 'text', required: true },
      { name: 'desc', title: 'Popis', type: 'text' }
    ]
  }
}