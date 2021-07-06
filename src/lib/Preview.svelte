<script lang="ts">
  import { each } from "svelte/internal";

  export let data = [];

  function process() {
    alert('hi');
  }
</script>

<section class="container">
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Date</th>
        <th>Print Job</th>
        <th>Member</th>
        <th>Material</th>
        <th>Amount (mL/mm)</th>
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          <td><abbr title={row.date}>{row.date}</abbr></td>
          <td>{row.job}</td>
          <td>{row.email}</td>
          <td>{row.material}</td>
          <td>{row.amount}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <button on:click={process}>Generate Charges</button>
</section>
