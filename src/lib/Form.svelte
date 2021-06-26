<script>
  import Flatpickr from 'svelte-flatpickr'
  import 'flatpickr/dist/flatpickr.css'
  import Papa from 'papaparse'

  let dateRange
  let files
  
  const options = {
    mode: "range"
  }


  function handleClick() {
    Papa.parse(files[0], {
      header: true,
      step: (results, parser) => {
        console.log(results);
      },
    });
  }
</script>

<style>
  form ul {
    list-style: none;
  }
</style>

<form>
  <ul>
    <li>
      <label>
        CSV
        <input bind:files type="file">
      </label>
    </li>
    <li>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>
        Date range
        <Flatpickr {options} bind:value={dateRange} name="date"/>
      </label>
    </li>
    <li>
      <button on:click|preventDefault={handleClick}>Process</button>
    </li>
  </ul>
</form>
