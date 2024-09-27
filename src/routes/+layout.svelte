<script lang="ts">
    import "../app.scss"
</script>


<!-- Header BEGIN -->
<header class="container">

  <article>
    <nav>
      <ul>
        <li>
          <strong>IMAP REST API Server</strong>
          <small>by GP-Softwaretechnik</small>
        </li>
      </ul>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="https://github.com/gerold-penz/bun-imap-rest-api" target="_blank">GitHub</a></li>
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
</style>
