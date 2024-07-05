<script>
    import { fly} from "svelte/transition";
    import { page } from "$app/stores";
</script>

{#key $page.url}
  <div in:fly={{  y:'-100%', duration: 500 }}>
    <slot  />
  </div>
{/key}