<style lang="scss" global>
  @import "bulma/sass/utilities/_all.sass";
  @import "bulma/sass/elements/table.sass";
</style>

<script lang="ts">
  import Upload from "./lib/Upload.svelte";
  import Preview from "./lib/Preview.svelte";

  const cobotSubdomain =
    window.cobot?.subdomain || import.meta.env.VITE_COBOT_SUBDOMAIN;
  const cobotApiToken = window.cobot?.access_token || import.meta.env.VITE_COBOT_TOKEN;
  const cobotApiBase = `https://${cobotSubdomain}.cobot.me/api`;

  (async function() {
    // const response = await fetch(`${cobotApiBase}/memberships?attributes=id,email`, {
    //   headers: {
    //     Authorization: `Bearer ${cobotApiToken}`,
    //   },
    // });
    // console.log(await response.json());
  })();

  let data = [];

  function handleRow(event: CustomEvent) {
    data = [...data, event.detail];
  }
</script>

<main>  
  <Upload on:row={handleRow} />

  <Preview bind:data />

</main>
