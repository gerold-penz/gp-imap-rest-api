# Gp-Imap-Rest-Api

https://github.com/gerold-penz/gp-imap-rest-api


## Docker-Compose File

This Docker Compose file is all you need to start the server.
No data is saved.

_docker-compose.yaml:_

```yaml
services:
  gp-imap-rest-api:
    image: ghcr.io/gerold-penz/gp-imap-rest-api
    ports:
      - "3000:3000"
```


## Data storage

**No data is saved.**
Each request must contain the credentials to the IMAP server in the header.


## HTTP Header
with IMAP credentials

Every HTTP request to the “Gp-Imap-Rest-Api Server” must contain the 
access data to the IMAP server.
To ensure that this is not transferred in plain text, 
this access data must be transferred in the HTTP header.
If HTTPS is used, the header is transmitted to the server in encrypted form.

The header entries required for this all start with `X-Imap-`.

### X-Imap Headers

Descriptions taken from the 
[documentation of ImapFlow](https://imapflow.com/module-imapflow-ImapFlow.html)

_Example:_
```http request
X-Imap-Host: imap.example.com
X-Imap-Port: 993
X-Imap-Secure: true
X-Imap-User: exampleuser@example.com
X-Imap-Pass: examplePassword123
```

#### `X-Imap-Host`

Hostname of the IMAP server

#### `X-Imap-Port`

Port number for the IMAP server

#### `X-Imap-Secure`

`true|false`

_optional_, Standard: false

Should the connection be established over TLS.
If "false" then connection is upgraded to TLS using STARTTLS 
extension before authentication.

#### `X-Imap-Servername`

_optional_

Servername for SNI (or when host is set to an IP address).


#### `X-Imap-User`

Username for plain-text authentication.

#### `X-Imap-Pass`

_optional_

Password for plain-text authentication.

#### `X-Imap-Access-Token`

_optional_

OAuth2 Access Token, if using OAuth2 authentication.

