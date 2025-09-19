## **Scope and target audience**
TThis document describes the technical interfaces exposed by MNotify for Senders’ information systems that will use MNotify for notification purposes. The target audience are the development teams.

## **Glossary of terms**

For the complete glossary, please visit the [Glossary page](https://egov-moldova.github.io/egov4dev/glossary/glossary/).

## **General system capabilities**

MNotify is a governmental electronic notification service designed to send messages to recipients, through different communication channels, in order to inform about events related to public services, or other relevant notices.

## **Delivery channels**

Currently MNotify supports e-mail, web push notifications and MCabinet as a delivery channel.  IDNP property is required when specifying a notification identity.

## **Service dependencies**

<span class="highlight-text-yellow">[service dependencies that might influence on service contract, availability, performance, security, etc. ]<span>

## **Protocols and standards**
MNotify exposes its APIs over HTTPS, supporting HTTP 1.1 and 2. The HTTPS endpoint uses
TLS 1.2 and higher and requires authentication through client certificates (encoded in X.509 v3
format).
