<script>
  import Papa from "papaparse";
  import { createEventDispatcher } from "svelte";
  import {members, serviceCharges} from "./cobot_api";

  const dispatch = createEventDispatcher();

  let files;

  const options = {
    mode: "range",
  };

  async function handleClick() {
    const [memberList, chargeList] = await Promise.all([members(), serviceCharges()]);

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

        const material = data.Material;
        if (!chargeList.has(material)) {
          return;
        }
        const charge = chargeList.get(material);

        dispatch('row', {
          date: date,
          job: data['Print name'],
          member: member,
          material: data.Material,
          charge: charge,
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
