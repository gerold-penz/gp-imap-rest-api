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
    Beschreibungen aus xxx übernommen.
  </p>

  <h4><code>X-Imap-User</code></h4>
  <p>
    Username for plain-text authentication.
  </p>

  <h4><code>X-Imap-Password</code></h4>
  <p>
    Password for plain-text authentication.
  </p>

  <!--    /** Base64-encoded OAuth token for OAuth authentication for servers that support it (See Andris Reinman's xoauth.js module to help generate this string). */-->
  <!--    xoauth: zfd.text().nullable(),-->
  <!--    /** Base64-encoded OAuth2 token for The SASL XOAUTH2 Mechanism for servers that support it (See Andris Reinman's xoauth2 module to help generate this string). */-->
  <!--    xoauth2: zfd.text().nullable(),-->
  <!--    /** Hostname or IP address of the IMAP server. Default: "localhost" */-->
  <!--    host: zfd.text().nullable(),-->
  <!--    /** Port number of the IMAP server. Default: 143 */-->
  <!--    port: zfd.numeric().nullable(),-->
  <!--    /** Perform implicit TLS connection? Default: false */-->
  <!--    tls: z.boolean().nullable(),-->
  <!--    /** Set to 'always' to always attempt connection upgrades via STARTTLS, 'required' only if upgrading is required, or 'never' to never attempt upgrading. Default: 'never' */-->
  <!--    autotls: zfd.text(z.enum(["always", "required", "never"])).nullable(),-->
  <!--    /** Number of milliseconds to wait for a connection to be established. Default: 10000 */-->
  <!--    connTimeout: zfd.numeric().nullable(),-->
  <!--    /** Number of milliseconds to wait to be authenticated after a connection has been established. Default: 5000 */-->
  <!--    authTimeout: zfd.numeric().nullable(),-->


  [ToDo: Beispiel]


</article>
<!-- HTTP Header END -->

