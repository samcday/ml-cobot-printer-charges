<script lang="ts">
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
        <th>Cost</th>
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          <td><abbr title={row.date}>{row.date}</abbr></td>
          <td>{row.job}</td>
          <td><a target='_blank' href='https://samtest.cobot.me/admin/memberships/{row.member.id}'>{row.member.name}</a></td>
          <td>{row.material}</td>
          <td>{row.amount}</td>
          <td>{row.charge.price * row.amount} {row.charge.currency}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <button on:click={process}>Generate Charges</button>
</section>
