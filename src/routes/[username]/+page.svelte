<script lang="ts">
    import UserLink from "$lib/components/UserLink.svelte";
    import { userData } from "$lib/firebase";
    import { imageFallback } from "$lib/actions/imageFallback";
    import type { PageData } from "./$types";

    $: href = `/${$userData?.username}/edit`;

    export let data: PageData;

    // Show the avatar only when a usable photo URL is present; otherwise we render
    // a gradient initial so a missing/blank /user.png never produces a broken image.
    let photoFailed = false;
    $: hasPhoto = !!data.photoURL && !photoFailed;
    $: initial = (data.username ?? "?").charAt(0).toUpperCase();
</script>

<svelte:head>
    <title>@{data.username} · Links</title>
    <meta name="description" content={data.bio} />
</svelte:head>

<main class="mx-auto w-full max-w-xl px-4 pt-16 text-center">
    <!-- Avatar -->
    <div class="mx-auto h-40 w-40">
        {#if hasPhoto}
            <img
                src={data.photoURL}
                alt={`@${data.username}`}
                width="160"
                height="160"
                referrerpolicy="no-referrer"
                class="h-40 w-40 rounded-full object-cover ring ring-primary/50 ring-offset-4 ring-offset-base-100"
                use:imageFallback={() => (photoFailed = true)}
            />
        {:else}
            <div
                class="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-6xl font-extrabold text-white ring ring-primary/50 ring-offset-4 ring-offset-base-100"
            >
                {initial}
            </div>
        {/if}
    </div>

    <h1 class="mt-6 text-5xl font-extrabold">
        <span class="text-gradient">@{data.username}</span>
    </h1>

    <p class="mx-auto mt-4 max-w-md text-lg text-base-content/60">
        {data.bio ?? "no bio yet..."}
    </p>

    <!-- Links -->
    <ul class="mt-10 flex list-none flex-col items-center gap-3 p-0">
        {#each data.links as item}
            <li class="w-full">
                <UserLink {...item} />
            </li>
        {/each}
    </ul>

    <!-- Actions -->
    <div class="mt-12 flex flex-wrap justify-center gap-3">
        {#if $userData?.username == data.username}
            <a {href} class="btn btn-primary btn-glow gap-2 rounded-full px-6">
                Edit Profile
            </a>
        {:else if $userData?.username}
            <a
                href={`/${$userData?.username}`}
                class="btn btn-primary btn-glow gap-2 rounded-full px-6"
            >
                Go To My Profile
            </a>
        {/if}
        <a href="/" class="btn btn-ghost gap-2 rounded-full px-6">Home</a>
    </div>
</main>
