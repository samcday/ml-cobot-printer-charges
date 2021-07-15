<script>
  import Papa from "papaparse";
  import { createEventDispatcher } from "svelte";
  import members from "./members";

  const dispatch = createEventDispatcher();

  let files;

  const options = {
    mode: "range",
  };

  async function handleClick() {
    const memberList = await members();

    Papa.parse(files[0], {
      header: true,
      worker: true,
      step: (results, parser) => {
        const {data} = results;
        if (data.Status !== 'FINISHED') {
          return;
        }

        const date = Date.parse(data['Finish time']);
        if (!date) {
          return;
        }

        const email = data['User Email'];
        if (!memberList.has(email)) {
          return;
        }
        const member = memberList.get(email);

        dispatch('row', {
          date: date,
          job: data['Print name'],
          member: member,
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
