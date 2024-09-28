<script lang="ts">
    import dockerComposeContent from "../../docker-compose.yaml?raw"
    import headersExample from "./headersExample.txt?raw"
</script>


<!-- Docker-Compose File BEGIN -->
<article>
  <hgroup>
    <h2>Docker-Compose File</h2>
    <p>
      docker-compose.yaml
    </p>
  </hgroup>

  <p>
    This Docker Compose file is all you need to start the server.
    No data is saved.
  </p>

  <pre><code>{ dockerComposeContent }</code></pre>
</article>
<!-- Docker-Compose File END -->


<!-- Datenspeicherung BEGIN -->
<article>
  <hgroup>
    <h2>Data storage</h2>
    <p>
      does not exist
    </p>
  </hgroup>

  <p>
    <strong>No data is saved</strong>.
    Each request must contain the credentials to the IMAP server in the header.
  </p>
</article>
<!-- Datenspeicherung END -->


<!-- HTTP Header BEGIN -->
<article>

  <hgroup>
    <h2>HTTP Header</h2>
    <p>
      with IMAP credentials
    </p>
  </hgroup>

  <p>
    Every HTTP request to the “Gp-Imap-Rest-Api Server” must contain the access data to the IMAP server.
    To ensure that this is not transferred in plain text via the URL, this access data must be transferred in the HTTP header.
    If HTTPS is used instead of HTTP, the header is transmitted to the server in encrypted form.
  </p>
  <p>
    The header entries required for this all start with <code>X-Imap-</code>.
  </p>


  <h3>Headers</h3>

  <p>
    Descriptions taken from the <a href=“https://imapflow.com/module-imapflow-ImapFlow.html” target=“_blank”>documentation of ImapFlow</a>.
  </p>

  <h4><code>X-Imap-Host</code></h4>
  <p>
    Hostname of the IMAP server
  </p>

  <h4><code>X-Imap-Port</code></h4>
  <p>
    Port number for the IMAP server
  </p>

  <h4><code>X-Imap-Secure</code></h4>
  <p>
    <code>true|false</code>
  </p>
  <p>
    <em>optional</em>, Standard: false
  </p>
  <p>
    Should the connection be established over TLS.
    If "false" then connection is upgraded to TLS using STARTTLS extension before authentication.
  </p>

  <h4><code>X-Imap-Servername</code></h4>
  <p>
    <em>optional</em>
  </p>
  <p>
    Servername for SNI (or when host is set to an IP address).
  </p>

  <h4><code>X-Imap-User</code></h4>
  <p>
    Username for plain-text authentication.
  </p>

  <h4><code>X-Imap-Pass</code></h4>
  <p>
    <em>optional</em>
  </p>
  <p>
    Password for plain-text authentication.
  </p>

  <h4><code>X-Imap-Access-Token</code></h4>
  <p>
    <em>optional</em>
  </p>
  <p>
    OAuth2 Access Token, if using OAuth2 authentication.
  </p>

  <h4>Headers Example</h4>

  <pre><code>{ headersExample }</code></pre>

</article>
<!-- HTTP Header END -->

