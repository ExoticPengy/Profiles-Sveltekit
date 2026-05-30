<script lang="ts">
    import { imageFallback } from "$lib/actions/imageFallback";
    import type { PageData } from "./$types";

    export let data: PageData;

    // Track which avatars failed to load so we can swap to a gradient initial.
    let failed: Record<string, boolean> = {};
</script>

<svelte:head>
    <title>Pengy · Profiles</title>
    <meta name="description" content="Create and share your link-in-bio profile." />
</svelte:head>

<main class="mx-auto w-full max-w-3xl px-4 pt-10 sm:pt-14">
    <!-- Hero -->
    <section class="text-center">
        <h1 class="text-4xl font-extrabold leading-tight sm:text-5xl">
            All your links, <span class="text-gradient">one page.</span>
        </h1>

        <div class="mt-6 flex justify-center">
            <a
                href="/login"
                class="btn btn-primary btn-glow gap-2 rounded-full px-8"
            >
                Get started
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5"
                >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
            </a>
        </div>
    </section>

    <!-- Profiles -->
    <section class="mt-10">
        <h2 class="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-base-content/40">
            Explore profiles
        </h2>

        {#if data.users?.length}
            <div class="grid gap-3 sm:grid-cols-2">
                {#each data.users as user}
                    <a
                        href={`/${user.username}`}
                        class="group flex items-center justify-between gap-3 rounded-2xl glass px-5 py-4
                               transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/10"
                    >
                        <span class="flex items-center gap-3 truncate">
                            {#if user.photoURL && !failed[user.username]}
                                <img
                                    src={user.photoURL}
                                    alt={`@${user.username}`}
                                    width="36"
                                    height="36"
                                    referrerpolicy="no-referrer"
                                    class="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-white/15"
                                    use:imageFallback={() =>
                                        (failed = { ...failed, [user.username]: true })}
                                />
                            {:else}
                                <span
                                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white"
                                >
                                    {user.username.charAt(0).toUpperCase()}
                                </span>
                            {/if}
                            <span class="truncate font-semibold text-white">@{user.username}</span>
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-4 w-4 shrink-0 text-base-content/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </a>
                {/each}
            </div>
        {:else}
            <p class="text-center text-base-content/50">No profiles yet — be the first!</p>
        {/if}
    </section>
</main>
