<script>
  import Flatpickr from 'svelte-flatpickr'
  import 'flatpickr/dist/flatpickr.css'

  let dateRange
  let files
  
  const options = {
    mode: "range"
  }

  function handleClick() {
    const reader = new FileReader()
    reader.onload = ev => {
      console.log('read', ev.target.result)
    }

    reader.readAsArrayBuffer(files[0])
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
