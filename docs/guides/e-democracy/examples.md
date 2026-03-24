## Retrieve petitions

```bash

curl -X GET "https://epetitii.staging.egov.md/petitie/authority/petitions" \
-H "Authorization: Bearer <jwt_token>" \
-H "accept: application/json"
```

**Example response:**

```json

{
"items": [],
"page": 1,
"pageSize": 20,
"totalCount": 0
}
```

# Rate Limits

To ensure platform stability, integrators should:

- Avoid excessive polling
- Use pagination when retrieving lists
- Cache responses when possible
