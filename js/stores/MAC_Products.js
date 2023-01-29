export default {
  records: [],
  schema: {
    id: 10,
    name: 'MAC_Products',
    title: 'Produkty',
    orderBy: 'code',
    orderAsc: true,
    properties: [
      { name: 'id', title: 'Id', type: 'int', required: true, hidden: true },
      { name: 'code', title: 'Kód', type: 'text', required: true },
      { name: 'title', title: 'Název', type: 'text', required: true },
      { name: 'price', title: 'Cena', type: 'num', required: true, align: 'right' },
      { name: 'materials', title: 'Materiál', type: 'multiSelect', required: true, source: { name: 'MAC_Materials', property: 'name' } },
      { name: 'colors', title: 'Barvy', type: 'multiSelect', required: true, source: { name: 'MAC_Colors', property: 'code' } },
      { name: 'dimensions', title: 'Rozměry', type: 'text' },
      { name: 'productTypeId', title: 'Druh', type: 'select', required: true, source: { name: 'MAC_ProductTypes', property: 'name' } },
      { name: 'fasteningId', title: 'Zapínání', type: 'select', required: true, source: { name: 'MAC_Fastening', property: 'code' } },
      { name: 'availability', title: 'Dostupnost', type: 'bool' },
      { name: 'desc', title: 'Popis', type: 'text' }
    ]
  }
}