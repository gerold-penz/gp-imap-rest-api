<script lang="ts">
    import dockerComposeContent from "../../docker-compose.yaml?raw"
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
    Dieses Docker-Compose-File genügt, um den Server zu starten.
    Es werden keine Daten zwischengespeichert.
  </p>

  <pre><code>{ dockerComposeContent }</code></pre>
</article>
<!-- Docker-Compose File END -->


<!-- Datenspeicherung BEGIN -->
<article>
  <hgroup>
    <h2>Datenspeicherung</h2>
    <p>
      gibt es nicht
    </p>
  </hgroup>

  <p>
    Es werden <strong>keine Daten gespeichert</strong>.
    Jeder Request muss die Zugangsdaten zum IMAP-Server im Header enthalten.
  </p>
</article>
<!-- Datenspeicherung END -->


<!-- HTTP Header BEGIN -->
<article>

  <hgroup>
    <h2>HTTP Header</h2>
    <p>
      mit IMAP-Zugangsdaten
    </p>
  </hgroup>

  <p>
    Jeder HTTP-Request an den "Gp-Imap-Rest-Api Server" muss die Zugangsdaten zum
    IMAP-Server enthalten. Damit diese nicht im Klartext über die URL übergeben
    werden, müssen diese Zugangsdaten im HTTP-Header übermittelt werden.
    Nutzt man HTTPS statt HTTP, wird der Header verschlüsselt zum Server übertragen.
  </p>
  <p>
    Die dafür notwendigen Header-Einträge beginnen alle mit <code>X-Imap-</code>.
  </p>


  <h3>Headers</h3>

  <p>
    Beschreibungen aus der <a href="https://imapflow.com/module-imapflow-ImapFlow.html" target="_blank">Dokumentation von ImapFlow</a> übernommen.
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
    optional, Standard: false
  </p>
  <p>
    Should the connection be established over TLS.
    If "false" then connection is upgraded to TLS using STARTTLS extension before authentication.
  </p>

  <h4><code>X-Imap-Servername</code></h4>
  <p>
    optional
  </p>
  <p>
    Servername for SNI (or when host is set to an IP address).
  </p>

  <h4><code>X-Imap-User</code></h4>
  <p>
    Username for plain-text authentication.
  </p>

  <h4><code>X-Imap-Password</code></h4>
  <p>
    optional
  </p>
  <p>
    Password for plain-text authentication.
  </p>

  <h4><code>X-Imap-Access-Token</code></h4>
  <p>
    optional
  </p>
  <p>
    OAuth2 Access Token, if using OAuth2 authentication.
  </p>

  <h4><code>X-Imap-XXX</code></h4>
  <p>
    XXX
  </p>

  <h4><code>X-Imap-XXX</code></h4>
  <p>
    XXX
  </p>

  <h4><code>X-Imap-XXX</code></h4>
  <p>
    XXX
  </p>


</article>
<!-- HTTP Header END -->

