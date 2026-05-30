<script lang="ts">
    import { page } from "$app/stores";
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>
  
<nav class="flex justify-center my-8 px-4">
<ul class="steps">
    <a href="/login" class="step step-primary">Sign In</a>
    <a
    href="/login/username"
    class="step"
    class:step-primary={$page.route.id?.match(/username|photo/g)}>
    Choose Username
    </a>
    <a
    href="/login/photo"
    class="step"
    class:step-primary={$page.route.id?.includes("photo")}>
    Upload Photo
    </a>
</ul>
</nav>
  
<AnimatedRoute>
    <main class="card mx-auto w-11/12 max-w-md rounded-3xl glass">
        <div class="card-body items-center gap-4 text-center">
        <slot />
        </div>
    </main>
</AnimatedRoute>