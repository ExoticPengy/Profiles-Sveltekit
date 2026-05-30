<script lang="ts">
    import { imageFallback } from "$lib/actions/imageFallback";

    export let icon = "custom";
    export let url = "https://";
    export let title = "some cool title";

    let iconImg: HTMLImageElement;

    // Fall back to the bundled custom.png if an icon image 404s,
    // guarding against an infinite error loop.
    function handleIconError() {
        if (!iconImg || iconImg.src.endsWith("/custom.png")) return;
        iconImg.src = "/custom.png";
    }
</script>

<a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    class="group relative mx-auto flex w-full max-w-md items-center rounded-2xl glass px-16 py-4 no-underline not-prose
           transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/10"
>
    <span
        class="absolute left-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10
               transition-transform duration-200 group-hover:scale-110"
    >
        <img
            bind:this={iconImg}
            src={`/${(icon || "custom").toLowerCase()}.png`}
            alt={icon}
            width="32"
            height="32"
            class="h-6 w-6"
            use:imageFallback={handleIconError}
        />
    </span>
    <span class="w-full truncate text-center text-lg font-semibold text-white">{title}</span>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute right-5 h-4 w-4 shrink-0 text-base-content/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
    >
        <path d="M7 17 17 7M7 7h10v10" />
    </svg>
</a>
