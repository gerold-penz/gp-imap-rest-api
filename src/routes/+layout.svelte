<script context="module" lang="ts">
    declare const PACKAGE: {version: string}  // Variablen aus package.json (über vite.config.ts eingefügt)
</script>


<script lang="ts">
    import "../app.scss"
</script>


<!-- Header BEGIN -->
<header class="container">

  <article>
    <nav>
      <ul>
        <li>
          <strong>Gp-Imap-Rest-Api Server</strong>
          <small>by <a href="https://gp-softwaretechnik.at/" target="_blank">GP-Softwaretechnik</a></small>
        </li>
      </ul>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="https://github.com/gerold-penz/gp-imap-rest-api" target="_blank">GitHub</a></li>
        <li><small>Version: {PACKAGE.version}</small></li>
      </ul>
    </nav>
  </article>

</header>
<!-- Header END -->


<!-- Main BEGIN -->
<main class="container">
  <slot/>
</main>
<!-- Main END -->


<!-- Footer BEGIN -->
<footer class="container">
</footer>
<!-- Footer END -->


<style lang="scss">
  header {
    article {
      margin-top: 1rem;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  main {
    margin-bottom: 3em;
  }
</style>
