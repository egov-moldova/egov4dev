## **Scope and target audience**
TThis document describes the technical interfaces exposed by MNotify for Senders’ information systems that will use MNotify for notification purposes. The target audience are the development teams.

## **Notations**
This document contains several notation styles; the following details the styles that have a degree of significance beyond the purpose of communicating information:
<br><span class="highlight-text-yellow">Yellow Highlighted Text</span> – Text that is highlighted in yellow irrespective of font attributes (font type, italics, bold, underlined, etc.) means that the text is waiting clarification or verification.
<br><span class="red-bold-text">Red Bold Text</span> – Text that is red in color and bold, defines an important piece of information that must be read.
<br>***Italic Bold Text*** – Text that is bold and italic detail actual information or scripts that need to be executed, created, and copied from or to.
<br>~~Strikethrough Text~~ – Text which is outdated and should be ignored

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
