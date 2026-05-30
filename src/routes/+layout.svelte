<script lang="ts">
    import "../app.css";
</script>

<div class="min-h-screen flex flex-col">
    <div class="flex-1">
        <slot />
    </div>

    <footer class="mt-16 py-6 text-center text-xs text-base-content/40">
        <p>
            Built with
            <span class="text-secondary">♥</span>
            using SvelteKit · by
            <span class="text-gradient font-semibold">Pengy</span>
        </p>
    </footer>
</div>
