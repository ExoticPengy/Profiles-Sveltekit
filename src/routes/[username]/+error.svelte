<script lang="ts">
    import { page } from '$app/stores';
</script>

<main class="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
    <p class="text-8xl font-extrabold text-gradient">{$page.status}</p>
    <h1 class="mt-4 text-2xl font-bold">
        {$page.error?.message ?? "Something went wrong"}
    </h1>
    <a href="/" class="btn btn-primary btn-glow mt-8 rounded-full px-8">Back to Home</a>
</main>
