export function parseStringQuery(query: string, userId: string) {
  if (query.includes('groupBy=draft')) {
    query = query.replace('groupBy=draft', 'stage=3');
  } else if (query.includes('groupBy=myDraft')) {
    query = query.replace('groupBy=myDraft', 'stage=3 createdBy=' + userId);
  } else if (query.includes('groupBy=my')) {
    query = query.replace('groupBy=my', 'createdBy=' + userId);
  }

  return query;
}
