export default {
  records: [],
  schema: {
    id: 12,
    name: 'MAC_Fastening',
    title: 'Zapínání',
    orderBy: 'code',
    orderAsc: true,
    properties: [
      { name: 'id', title: 'Id', type: 'int', required: true, hidden: true },
      { name: 'code', title: 'Kód', type: 'text', required: true },
      { name: 'desc', title: 'Popis', type: 'text', required: true }
    ]
  }
}