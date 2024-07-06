<script lang="ts">
    import { page } from '$app/stores';
</script>

<h1 class="mt-5 mx-auto">Error {$page.status}: {$page.error?.message}</h1>

<a href="/" class="btn btn-primary my-5 mx-auto">Back to Home</a>