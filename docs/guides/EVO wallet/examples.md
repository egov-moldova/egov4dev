## Device Engagement

```
eudi-openid4vp://?client_id=x509_hash%3ALTHlBmrN6Wc9oE3TxFZp47fET6iFBQIiwMJiu3BLcqw&request_uri=https%3A%2F%2Fverifier-backend.eudiw.dev%2Fwallet%2Frequest.jwt%2FeKpfP_6-HTTQbkmlXwvXuxeCfW0lYbLCTBghqNL79IdoYvmopkqjgqrj2qDMzeOHtofYzLmyp6P1-lAAkvTNSg&request_uri_method=post
```
As you can see, all parameters are URL-encoded.

## Authorization Request

This is how an Authorization Request looks like:

```
POST https://verifier-backend.eudiw.dev/wallet/request.jwt/eKpfP_6-HTTQbkmlXwvXuxeCfW0lYbLCTBghqNL79IdoYvmopkqjgqrj2qDMzeOHtofYzLmyp6P1-lAAkvTNSg
Accept: application/oauth-authz-req+jwt
Content-Type: application/x-www-form-urlencoded

wallet_metadata=%7B%22issuer%22%3A%22https%3A%2F%2Fself-issued.me%2Fv2%22%2C%22authorization_endpoint%22%3A%22eudi-openid4vp%3A%22%2C%22response_types_supported%22%3A%5B%22vp_token%22%5D%2C%22response_modes_supported%22%3A%5B%22direct_post.jwt%22%5D%2C%22vp_formats_supported%22%3A%7B%22mso_mdoc%22%3A%7B%22issuerauth_alg_values%22%3A%5B-7%5D%2C%22deviceauth_alg_values%22%3A%5B-7%5D%7D%2C%22dc%5Cu002Bsd-jwt%22%3Anull%7D%2C%22client_id_prefixes_supported%22%3A%5B%22x509_hash%22%5D%2C%22request_object_signing_alg_values_supported%22%3A%5B%22ES256%22%5D%2C%22authorization_encryption_alg_values_supported%22%3A%5B%22ECDH-ES%22%5D%2C%22authorization_encryption_enc_values_supported%22%3A%5B%22A256GCM%22%5D%7D&wallet_nonce=kxbJ%2F%2FQQ%2FqheqcBnVzjZPg%3D%3D
```
This is wallet_metadata in JSON format:

```
{
  "issuer": "https://self-issued.me/v2",
  "authorization_endpoint": "eudi-openid4vp:",
  "response_types_supported": [
    "vp_token"
  ],
  "response_modes_supported": [
    "direct_post.jwt"
  ],
  "vp_formats_supported": {
    "mso_mdoc": {
      "issuerauth_alg_values": [-7],
      "deviceauth_alg_values": [-7]
    }
  },
  "client_id_prefixes_supported": [
    "x509_hash"
  ],
  "request_object_signing_alg_values_supported": [
    "ES256"
  ],
  "authorization_encryption_alg_values_supported": [
    "ECDH-ES"
  ],
  "authorization_encryption_enc_values_supported": [
    "A256GCM"
  ]
}
```

Verifier’s returned the following Authorization Request:

```
HTTP 200 OK
Date: Tue, 02 Dec 2025 12:51:34 GMT
Cache-Control: no-store, must-revalidate, no-cache, max-age=0
Pragma: no-cache
Vary: Origin, Access-Control-Request-Method, Access-Control-Request-
Headers
Strict-Transport-Security: max-age=31536000 ; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0
Referrer-Policy: no-referrer
Content-Length: 6034
Content-Type: application/oauth-authz-req+jwt
Expires: 0
eyJ4NWMiOlsiTUlJREREQ0NBcktnQXdJQkFnSVVHOFNndVVyYmdwSlV2ZDZ2KzA3U3A4dXRMZlF3Q2dZSUtvWkl6ajBFQXdJd1hERWVNQndHQTFVRUF3d1ZVRWxFSUVsemMzVmxjaUJEUVNBdElGVlVJREF5TVMwd0t3WURWUVFLRENSRlZVUkpJRmRoYkd4bGRDQlNaV1psY21WdVkyVWdTVzF3YkdWdFpXNTBZWFJwYjI0eEN6QUpCZ05WQkFZVEFsVlVNQjRYRFRJMU1EUXhNREEyTkRVMU9Gb1hEVEkzTURReE1EQTJORFUxTjFvd1Z6RWRNQnNHQTFVRUF3d1VSVlZFU1NCU1pXMXZkR1VnVm1WeWFXWnBaWEl4Q2pBSUJnTlZCQVVUQVRFeEhUQWJCZ05WQkFvTUZFVlZSRWtnVW1WdGIzUmxJRlpsY21sbWFXVnlNUXN3Q1FZRFZRUUdFd0pWVkRCWk1CTUdCeXFHU000OUFnRUdDQ3FHU000OUF3RUhBMElBQk9jaVY0Mm1JVDhuUU1BTjhrVzlDSE5VVFl3a2llZW01aGwxUXNMZjYya0ViYlpoNnd1bDVpTDI4Zy9BM1pxY1RYOVhvTG53L252SjgvSFJwMys5NWVLamdnRlZNSUlCVVRBTUJnTlZIUk1CQWY4RUFqQUFNQjhHQTFVZEl3UVlNQmFBRkdMSGxFY292UStpRmlDbm1zSkpsRVR4QWRQSE1Ea0dBMVVkRVFReU1EQ0JFbTV2TFhKbGNHeDVRR1YxWkdsM0xtUmxkb0lhZG1WeWFXWnBaWEl0WW1GamEyVnVaQzVsZFdScGR5NWtaWFl3RWdZRFZSMGxCQXN3Q1FZSEtJR01YUVVCQmpCREJnTlZIUjhFUERBNk1EaWdOcUEwaGpKb2RIUndjem92TDNCeVpYQnliMlF1Y0d0cExtVjFaR2wzTG1SbGRpOWpjbXd2Y0dsa1gwTkJYMVZVWHpBeUxtTnliREFkQmdOVkhRNEVGZ1FVZ0FoOUtzb1lYWUs4am5kVWJGUUV0ZkRzSGpZd0RnWURWUjBQQVFIL0JBUURBZ2VBTUYwR0ExVWRFZ1JXTUZTR1VtaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOWxkUzFrYVdkcGRHRnNMV2xrWlc1MGFYUjVMWGRoYkd4bGRDOWhjbU5vYVhSbFkzUjFjbVV0WVc1a0xYSmxabVZ5Wlc1alpTMW1jbUZ0WlhkdmNtc3dDZ1lJS29aSXpqMEVBd0lEU0FBd1JRSWdERkNneUVqR25KUzI1bi9GZmRQN0hYMGVsejdDMnE0dVVRLzdaY3JsMFFZQ0lRQy9yckpwUTVzRjFPNGFpSGVqSVBQTHVPM0pqZHJMSlBaU0ErRlFIK2VJckE9PSJdLCJ0eXAiOiJvYXV0aC1hdXRoei1yZXErand0Iiw iYWxnIjoiRVMyNTYifQ.eyJyZXNwb25zZV91cmkiOiJodHRwczovL3ZlcmlmaWVyLWJhY2tlbmQuZXVkaXcuZGV2L3dhbGxldC9kaXJlY3RfcG9zdC9lS3BmUF82LUhUVFFia21sWHd2WHV4ZUNmVzBsWWJMQ1RCZ2hxTkw3OUlkb1l2bW9wa3FqZ3FyajJxRE16ZU9IdG9mWXpMbXlwNlAxLWxBQWt2VE5TZyIsImF1ZCI6Imh0dHBzOi8vc2VsZi1pc3N1ZWQubWUvdjIiLCJ3YWxsZXRfbm9uY2UiOiJreGJKLy9RUS9xaGVxY0JuVnpqWlBnPT0iLCJyZXNwb25zZV90eXBlIjoidnBfdG9rZW4iLCJzdGF0ZSI6ImVLcGZQXzYtSFRUUWJrbWxYd3ZYdXhlQ2ZXMGxZYkxDVEJnaHFOTDc5SWRvWXZtb3BrcWpncXJqMnFETXplT0h0b2ZZekxteXA2UDEtbEFBa3ZUTlNnIiwiZGNxbF9xdWVyeSI6eyJjcmVkZW50aWFscyI6W3siaWQiOiJxdWVyeV8wIiwiZm9ybWF0IjoibXNvX21kb2MiLCJtZXRhIjp7ImRvY3R5cGVfdmFsdWUiOiJvcmcuaXNvLjE4MDEzLjUuMS5tREwifSwiY2xhaW1zIjpbeyJwYXRoIjpbIm9yZy5pc28uMTgwMTMuNS4xIiwiZmFtaWx5X25hbWUiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImdpdmVuX25hbWUiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImJpcnRoX2RhdGUiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImlzc3VlX2RhdGUiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImV4cGlyeV9kYXRlIl0sImludGVudF90b19yZXRhaW4iOmZhbHNlfSx7InBhdGgiOlsib3JnLmlzby4xODAxMy41LjEiLCJhZ2Vfb3Zlcl8xOCJdLCJpbnRlbnRfdG9fcmV0YWluIjpmYWxzZX0seyJwYXRoIjpbIm9yZy5pc28uMTgwMTMuNS4xIiwiYWdlX292ZXJfMjEiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImFnZV9pbl95ZWFycyJdLCJpbnRlbnRfdG9fcmV0YWluIjpmYWxzZX0seyJwYXRoIjpbIm9yZy5pc28uMTgwMTMuNS4xIiwiYWdlX2JpcnRoX3llYXIiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImlzc3VpbmdfYXV0aG9yaXR5Il0sImludGVudF90b19yZXRhaW4iOmZhbHNlfSx7InBhdGgiOlsib3JnLmlzby4xODAxMy41LjEiLCJkb2N1bWVudF9udW1iZXIiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsInBvcnRyYWl0Il0sImludGVudF90b19yZXRhaW4iOmZhbHNlfSx7InBhdGgiOlsib3JnLmlzby4xODAxMy41LjEiLCJkcml2aW5nX3ByaXZpbGVnZXMiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsInVuX2Rpc3Rpbmd1aXNoaW5nX3NpZ24iXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImFkbWluaXN0cmF0aXZlX251bWJlciJdLCJpbnRlbnRfdG9fcmV0YWluIjpmYWxzZX0seyJwYXRoIjpbIm9yZy5pc28uMTgwMTMuNS4xIiwic2V4Il0sImludGVudF90b19yZXRhaW4iOmZhbHNlfSx7InBhdGgiOlsib3JnLmlzby4xODAxMy41LjEiLCJoZWlnaHQiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsIndlaWdodCJdLCJpbnRlbnRfdG9fcmV0YWluIjpmYWxzZX0seyJwYXRoIjpbIm9yZy5pc28uMTgwMTMuNS4xIiwiZXllX2NvbG91ciJdLCJpbnRlbnRfdG9fcmV0YWluIjpmYWxzZX0seyJwYXRoIjpbIm9yZy5pc28uMTgwMTMuNS4xIiwiaGFpcl9jb2xvdXIiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImJpcnRoX3BsYWNlIl0sImludGVudF90b19yZXRhaW4iOmZhbHNlfSx7InBhdGgiOlsib3JnLmlzby4xODAxMy41LjEiLCJyZXNpZGVudF9hZGRyZXNzIl0sImludGVudF90b19yZXRhaW4iOmZhbHNlfSx7InBhdGgiOlsib3JnLmlzby4xODAxMy41LjEiLCJwb3J0cmFpdF9jYXB0dXJlX2RhdGUiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsIm5hdGlvbmFsaXR5Il0sImludGVudF90b19yZXRhaW4iOmZhbHNlfSx7InBhdGgiOlsib3JnLmlzby4xODAxMy41LjEiLCJyZXNpZGVudF9jaXR5Il0sImludGVudF90b19yZXRhaW4iOmZhbHNlfSx7InBhdGgiOlsib3JnLmlzby4xODAxMy41LjEiLCJyZXNpZGVudF9zdGF0ZSJdLCJpbnRlbnRfdG9fcmV0YWluIjpmYWxzZX0seyJwYXRoIjpbIm9yZy5pc28uMTgwMTMuNS4xIiwicmVzaWRlbnRfcG9zdGFsX2NvZGUiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsInJlc2lkZW50X2NvdW50cnkiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsImZhbWlseV9uYW1lX25hdGlvbmFsX2NoYXJhY3RlciJdLCJpbnRlbnRfdG9fcmV0YWluIjpmYWxzZX0seyJwYXRoIjpbIm9yZy5pc28uMTgwMTMuNS4xIiwiZ2l2ZW5fbmFtZV9uYXRpb25hbF9jaGFyYWN0ZXIiXSwiaW50ZW50X3RvX3JldGFpbiI6ZmFsc2V9LHsicGF0aCI6WyJvcmcuaXNvLjE4MDEzLjUuMSIsInNpZ25hdHVyZV91c3VhbF9tYXJrIl0sImludGVudF90b19yZXRhaW4iOmZhbHNlfV19XX0sImlhdCI6MTc2NDY3OTg5NSwibm9uY2UiOiI3YzY2ZDhkOS1kY2FlLTRiOTctOGU4OC1iMTY4Njg3ZDA0YjMiLCJjbGllbnRfaWQiOiJ4NTA5X2hhc2g6TFRIbEJtck42V2M5b0UzVHhGWnA0N2ZFVDZpRkJRSWl3TUppdTNCTGNxdyIsImNsaWVudF9tZXRhZGF0YSI6eyJqd2tzIjp7ImtleXMiOlt7Imt0eSI6IkVDIiwidXNlIjoiZW5jIiwiY3J2IjoiUC0yNTYiLCJraWQiOiI3NjgwYmJkMC05NjdmLTQ2MTEtOTBiZi1jMjRhYTZjOTQxMjYiLCJ4Ijoib1poOXd3bm5DODh5b1BZeGRFSEQxLVVXbUlmLVJONHhiTzA3TUhrRElBUSIsInkiOiI4TGM4RkhqSlRlYjExZExpdFpMVkZvUDdzZTQ4N2drTVNORnRnTVBLOWM4IiwiYWxnIjoiRUNESC1FUyJ9XX0sInZwX2Zvcm1hdHNfc3VwcG9ydGVkIjp7ImRjK3NkLWp3dCI6eyJzZC1qd3RfYWxnX3ZhbHVlcyI6WyJFUzI1NiIsIkVTMzg0IiwiRVM1MTIiXSwia2Itand0X2FsZ192YWx1ZXMiOlsiRVMyNTYiLCJFUzM4NCIsIkVTNTEyIl19LCJtc29fbWRvYyI6e319LCJlbmNyeXB0ZWRfcmVzcG9uc2VfZW5jX3ZhbHVlc19zdXBwb3J0ZWQiOlsiQTEyOEdDTSJdfSwicmVzcG9uc2VfbW9kZSI6ImRpcmVjdF9wb3N0Lmp3dCJ9.-
VYy_dSfOkf0hQA_J0CVSocW4PkFvOdcw4WelIFyR0AnMyAE1PzanYD-rJUZ5ru_Jj-2qHP_AOZoIRNcqov7sw
```

Returned Authorization Request JWS header:

```
{
  "x5c": [
    "MIIDDDCCArKgAwIBAgIUG8SguUrbgpJUvd6v+07Sp8utLfQwCgYIKoZIzj0EAwIwXDEeMBwGA1UEAwwVUElEIElzc3VlciBDQSAtIFVUIDAyMS0wKwYDVQQKDCRFVURJIFdhbGxldCBSZWZlcmVuY2UgSW1wbGVtZW50YXRpb24xCzAJBgNVBAYTAlVUMB4XDTI1MDQxMDA2NDU1OFoXDTI3MDQxMDA2NDU1N1owVzEdMBsGA1UEAwwURVVESSBSZW1vdGUgVmVyaWZpZXIxCjAIBgNVBAUTATExHTAbBgNVBAoMFEVVREkgUmVtb3RlIFZlcmlmaWVyMQswCQYDVQQGEwJVVDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABOciV42mIT8nQMAN8kW9CHNUTYwkieem5hl1QsLf62kEbbZh6wul5iL28g/A3ZqcTX9XoLnw/nvJ8/HRp3+95eKjggFVMIIBUTAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFGLHlEcovQ+iFiCnmsJJlETxAdPHMDkGA1UdEQQyMDCBEm5vLXJlcGx5QGV1ZGl3LmRldoIadmVyaWZpZXItYmFja2VuZC5ldWRpdy5kZXYwEgYDVR0lBAswCQYHKIGMXQUBBjBDBgNVHR8EPDA6MDigNqA0hjJodHRwczovL3ByZXByb2QucGtpLmV1ZGl3LmRldi9jcmwvcGlkX0NBX1VUXzAyLmNybDAdBgNVHQ4EFgQUgAh9KsoYXYK8jndUbFQEtfDsHjYwDgYDVR0PAQH/BAQDAgeAMF0GA1UdEgRWMFSGUmh0dHBzOi8vZ2l0aHViLmNvbS9ldS1kaWdpdGFsLWlkZW50aXR5LXdhbGxldC9hcmNoaXRlY3R1cmUtYW5kLXJlZmVyZW5jZS1mcmFtZXdvcmswCgYIKoZIzj0EAwIDSAAwRQIgDFCgyEjGnJS25n/FfdP7HX0elz7C2q4uUQ/7Zcrl0QYCIQC/rrJpQ5sF1O4aiHejIPPLuO3JjdrLJPZSA+FQH+eIrA=="
  ],
  "typ": "oauth-authz-req+jwt",
  "alg": "ES256"
}
```

Returned Authorization Request JWS Body:

```
{
  "response_uri": "https://verifier-backend.eudiw.dev/wallet/direct_post/eKpfP_6-HTTQbkmlXwvXuxeCfW0lYbLCTBghqNL79IdoYvmopkqjgqrj2qDMzeOHtofYzLmyp6P1-lAAkvTNSg",
  "aud": "https://self-issued.me/v2",
  "wallet_nonce": "kxbJ//QQ/qheqcBnVzjZPg==",
  "response_type": "vp_token",
  "state": "eKpfP_6-HTTQbkmlXwvXuxeCfW0lYbLCTBghqNL79IdoYvmopkqjgqrj2qDMzeOHtofYzLmyp6P1-lAAkvTNSg",
  "dcql_query": {
    "credentials": [
      {
        "id": "query_0",
        "format": "mso_mdoc",
        "meta": {
          "doctype_value": "org.iso.18013.5.1.mDL"
        },
        "claims": [
          { "path": ["org.iso.18013.5.1", "family_name"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "given_name"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "birth_date"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "issue_date"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "expiry_date"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "age_over_18"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "age_over_21"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "age_in_years"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "age_birth_year"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "issuing_authority"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "document_number"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "portrait"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "driving_privileges"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "un_distinguishing_sign"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "administrative_number"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "sex"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "height"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "weight"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "eye_colour"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "hair_colour"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "birth_place"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "resident_address"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "portrait_capture_date"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "nationality"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "resident_city"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "resident_state"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "resident_postal_code"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "resident_country"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "family_name_national_character"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "given_name_national_character"], "intent_to_retain": false },
          { "path": ["org.iso.18013.5.1", "signature_usual_mark"], "intent_to_retain": false }
        ]
      }
    ]
  },
  "iat": 1764679895,
  "nonce": "7c66d8d9-dcae-4b97-8e88-b168687d04b3",
  "client_id": "x509_hash:LTHlBmrN6Wc9oE3TxFZp47fET6iFBQIiwMJiu3BLcqw",
  "client_metadata": {
    "jwks": {
      "keys": [
        {
          "kty": "EC",
          "use": "enc",
          "crv": "P-256",
          "kid": "7680bbd0-967f-4611-90bf-c24aa6c94126",
          "x": "oZh9wwnnC88yoPYxdEHD1-UWmIf-RN4xbO07MHkDIAQ",
          "y": "8Lc8FHjJTeb11dLitZLVFoP7se487gkMSNFtgMPK9c8",
          "alg": "ECDH-ES"
        }
      ]
    },
    "vp_formats_supported": {
      "dc+sd-jwt": {
        "sd-jwt_alg_values": ["ES256", "ES384", "ES512"],
        "kb-jwt_alg_values": ["ES256", "ES384", "ES512"]
      },
      "mso_mdoc": {}
    },
    "encrypted_response_enc_values_supported": ["A128GCM"]
  },
  "response_mode": "direct_post.jwt"
}
```
