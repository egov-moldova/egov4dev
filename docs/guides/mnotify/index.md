#Introduction

##**Scope and target audience**
TThis document describes the technical interfaces exposed by MNotify for Senders’ information systems that will use MNotify for notification purposes. The target audience are the development teams.

##**Notations**
This document contains several notation styles; the following details the styles that have a degree of significance beyond the purpose of communicating information:
<br><span class="highlight-text-yellow">Yellow Highlighted Text</span> – Text that is highlighted in yellow irrespective of font attributes (font type, italics, bold, underlined, etc.) means that the text is waiting clarification or verification.
<br><span class="red-bold-text">Red Bold Text</span> – Text that is red in color and bold, defines an important piece of information that must be read.
<br>***Italic Bold Text*** – Text that is bold and italic detail actual information or scripts that need to be executed, created, and copied from or to.
<br>~~Strikethrough Text~~ – Text which is outdated and should be ignored

##**Glossary of terms**

<table>
    <thead>
         <tr>
            <th><strong>Term</strong></th>
            <th><strong>Definition</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><strong>Recipient</strong></th>
            <td>The user who will receive the message.</td>
        </tr>
        <tr>
            <th><strong>IDNP</strong></th>
            <td>RM citizen personal identity number, containing 13 figures.</td>
        </tr>
        <tr>
            <th><strong>Notification</strong></th>
            <td>Notification request received from a Sender</td>
        </tr>
        <tr>
            <th><strong>Message</strong></th>
            <td>Final message ready for transmission, including the identified channel, recipient and content.</td>
        </tr>
        <tr>
            <th><strong>Subject</strong></th>
            <td>Message subject</td>
        </tr>
        <tr>
            <th><strong>Body</strong></th>
            <td>Message content</td>
        </tr>
        <tr>
            <th><strong>Shortbody</strong></th>
            <td>Short form of a message content, for notifications other than email and MCabinet.</td>
        </tr>
        <tr>
            <th><strong>Priority</strong></th>
            <td>the notification transmission priority (low, medium, high) set by the Sender.
            <br>Note! Notifications with Low and Medium priority will be transmitted depending on the Recipient’s preferences per channel. In case of a High priority notification the messages will be transmitted immediately, ignoring the Recipients’ priorities. </td>
        </tr>
    </tbody>
</table>

##**General system capabilities**

MNotify is a governmental electronic notification service designed to send messages to recipients, through different communication channels, in order to inform about events related to public services, or other relevant notices.

##**Delivery channels**

Currently MNotify supports e-mail, web push notifications and MCabinet as a delivery channel.  IDNP property is required when specifying a notification identity.

##**Service dependencies**

<span class="highlight-text-yellow">[service dependencies that might influence on service contract, availability, performance, security, etc. ]<span>

##**Protocols and standards**
MNotify exposes its APIs over HTTPS, supporting HTTP 1.1 and 2. The HTTPS endpoint uses
TLS 1.2 and higher and requires authentication through client certificates (encoded in X.509 v3
format).