# eGov Developer Platform

🇲🇩 **For developers & integrators** building on Moldova's national digital infrastructure

---

## DEVELOPER RESOURCES

# Build with eGov.

Open APIs, SDKs, and documentation for Moldova's digital government infrastructure — everything you need to integrate with public services.

### Quick Access
[REST APIs](./apis/) · [MConnect](./services/mconnect/) · [MSign](./services/msign/) · [MPay](./services/mpay/) · [MPass](./services/mpass/) · [MNotify](./services/mnotify/) · [Open Data](./data/)

---

## 🚀 Quick Start

```bash
# Discover available services
curl https://api.egov.md/v1/services \
  -H "Authorization: Bearer $TOKEN"

# Submit a signed request
curl -X POST https://api.egov.md/v1/submit \
  -H "Content-Type: application/json" \
  -d '{"serviceId": "RS-001", "idnp": "2000000000000"}'
```

**Response:**
```json
{
  "status": "accepted",
  "trackingId": "TRK-20260429-XK7"
}
```

---

## Why Build with eGov?

| Feature | Description |
|---------|-------------|
| 🔐 **Secure by Design** | Built-in authentication with MPass, encryption, RBAC |
| 🔄 **Event-Driven** | Real-time integration via MConnect event bus |
| 📝 **Digital Signatures** | MSign for legally valid digital signatures |
| 📖 **Well Documented** | Complete API references, guides, code samples |
| 🎯 **Once Only Principle** | Access authentic data from government registries |
| 🌐 **Interoperable** | REST/SOAP APIs, open standards, semantic catalog |

---

## Platform Services

**Authentication & Authorization**
- [MPass](./services/mpass/) - Single sign-on gateway
- [MSign](./services/msign/) - Digital signatures

**Integration & Communication**
- [MConnect](./services/mconnect/) - Event bus
- [MNotify](./services/mnotify/) - Notifications
- [MDelivery](./services/mdelivery/) - Document delivery

**Data & Payments**
- [MPay](./services/mpay/) - Payment gateway
- [Open Data](./data/) - Public datasets
- [MLog](./services/mlog/) - Audit trails

---

## Get Started

1. **[Register](./getting-started/registration/)** for API access
2. **[Explore](./documentation/)** the documentation
3. **[Test](./sandbox/)** in the sandbox environment
4. **[Deploy](./getting-started/production/)** to production

[Get Started →](./getting-started/){ .md-button .md-button--primary }
[View Documentation →](./documentation/){ .md-button }

---

## Developer Resources

- 📚 [API Documentation](./documentation/)
- 💻 [Code Examples](./examples/)
- 📦 [NuGet Packages](./nuget/)
- 🧪 [Sandbox Environment](./sandbox/)
- 💬 [Community Support](./community/)

---

## Support

**Technical Support:** support.mpass@egov.md  
**Developer Portal:** [egov-moldova.github.io/egov4dev](https://egov-moldova.github.io/egov4dev)

---

_Building Moldova's digital future, one API at a time._
