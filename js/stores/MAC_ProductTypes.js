export default {
  records: [],
  schema: {
    id: 14,
    name: 'MAC_ProductTypes',
    title: 'Druhy výrobků',
    orderBy: 'name',
    orderAsc: true,
    properties: [
      { name: 'id', title: 'Id', type: 'int', required: true, hidden: true },
      { name: 'name', title: 'Název', type: 'text', required: true }
    ]
  }
}