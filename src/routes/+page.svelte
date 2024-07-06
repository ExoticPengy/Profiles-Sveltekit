<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<h1 class="my-3 mx-auto">Welcome to Pengy's first Sveltekit Project!</h1>

<div class="card w-1/3 bg-neutral text-neutral-content my-4 mx-auto">
    <h2 class="card-title mb-2 mx-auto">Create your profile here:</h2>
    <a href="/login" class="btn btn-primary mb-5 mx-auto"> Login/Sign Up </a>
</div>

<div class="card w-1/3 bg-neutral text-neutral-content my-2 mx-auto">
    <h2 class="card-title my-2 mx-auto">Here are some profiles others have created:</h2>
    {#each data.users as user}
        <div class="mb-5 mx-auto">
            <a href={`/${user}`} class="btn btn-primary mx-auto">exoticpengy.vercel.app/{user}</a>
        </div>
    {/each}
</div>