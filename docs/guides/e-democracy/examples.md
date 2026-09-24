# Exemple

## Preluarea petițiilor

```bash
curl -X GET "https://epetitii.staging.egov.md/petitie/authority/petitions" \
-H "Authorization: Bearer <jwt_token>" \
-H "accept: application/json"
```

**Exemplu de răspuns:**

```json
{
"items": [],
"page": 1,
"pageSize": 20,
"totalCount": 0
}
```

## Limite de rată

Pentru a asigura stabilitatea platformei, integratorii ar trebui:

- Să evite interogările (polling) excesive
- Să utilizeze paginarea la preluarea listelor
- Să pună în cache răspunsurile ori de câte ori este posibil
