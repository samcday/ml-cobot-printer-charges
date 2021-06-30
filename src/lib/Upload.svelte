<script>
  import Papa from "papaparse";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let dateRange;
  let files;

  const options = {
    mode: "range",
  };

  function handleClick() {
    Papa.parse(files[0], {
      header: true,
      worker: true,
      step: (results, parser) => {
        const {data} = results;
        if (data.Status !== 'FINISHED') {
          return;
        }

        dispatch('row', {
          date: Date.parse(data['Finish time']),
          job: data['Print name'],
          email: data['User Email'],
          material: data.Material,
          amount: data['Volume (ml)'],
        });
      },
    });
  }
</script>

<form>
  <ul>
    <li>
      <label>
        CSV
        <input bind:files type="file" accept="text/csv,.csv" />
      </label>
    </li>
    <li>
      <button on:click|preventDefault={handleClick}>Process</button>
    </li>
  </ul>
</form>

<style>
  form ul {
    list-style: none;
  }
</style>
