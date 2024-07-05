<script lang="ts">
    import UserLink from "$lib/components/UserLink.svelte";
    import { userData } from "$lib/firebase";
    import type { PageData } from "./$types";
    
    $: href = `/${$userData?.username}/edit`;

    export let data: PageData;
</script>
    
<svelte:head>
    <title>@{data.username} Links</title>
    <meta name="description" content={data.bio} />
</svelte:head>
    
    
<main class="prose text-center mx-auto mt-5">

    <h1 class="text-7xl text-blue-500 mb-5">
    @{data.username}
    </h1>

    <img
    src={data.photoURL ?? "/user.png"}
    alt="photoURL"
    width="256"
    class="mx-auto"
    />

    <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>
    <ul class="list-none">
    {#each data.links as item}
    <li class="my-2">
        <UserLink {...item} />
    </li>
    {/each}
    </ul>

    <a {href} class="btn btn-primary mt-5 mx-auto">Edit Profile</a>

</main>
    