<style lang='scss' global>
  @import 'bulma/sass/utilities/_all.sass';
  @import 'bulma/sass/elements/table.sass';
</style>

<script lang='ts'>
  import Upload from './lib/Upload.svelte';
  import Preview from './lib/Preview.svelte';

  let data = [];

  function handleRow(event: CustomEvent) {
    data = [...data, event.detail];
  }
</script>

<main>  
  <Upload on:row={handleRow} />

  <Preview bind:data />

</main>
