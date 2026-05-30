<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user, userData, storage, db } from "$lib/firebase";
    import { doc, updateDoc } from "firebase/firestore";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import { imageFallback } from "$lib/actions/imageFallback";
  
    let previewURL: string;
    let uploading = false;
    let photoFailed = false;
    $: href = `/${$userData?.username}/edit`;
    $: currentPhoto = previewURL ?? $userData?.photoURL ?? null;
    $: showPhoto = !!currentPhoto && !photoFailed;
    $: initial = ($userData?.username ?? "?").charAt(0).toUpperCase();
  
    async function upload(e: any) {
      uploading = true;
      photoFailed = false;
      const file = e.target.files[0];
      previewURL = URL.createObjectURL(file);
      const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
      const result = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(result.ref);
  
      await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
      uploading = false;
    }
</script>
  
<AuthCheck>
    <h2 class="card-title">Upload a Profile Photo</h2>
  
    <form class="max-w-screen-md w-full">
      <div class="form-control w-full max-w-xs my-10 mx-auto text-center">
        {#if showPhoto}
          <img
            src={currentPhoto}
            alt="Profile preview"
            width="256"
            height="256"
            referrerpolicy="no-referrer"
            class="mx-auto h-48 w-48 rounded-full object-cover ring ring-primary/50 ring-offset-4 ring-offset-neutral"
            use:imageFallback={() => (photoFailed = true)}
          />
        {:else}
          <div
            class="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-7xl font-extrabold text-white ring ring-primary/50 ring-offset-4 ring-offset-neutral"
          >
            {initial}
          </div>
        {/if}
        <label for="photoURL" class="label">
          <span class="label-text">Pick a file</span>
        </label>
        <input
          on:change={upload}
          name="photoURL"
          type="file"
          class="file-input file-input-bordered w-full max-w-xs"
          accept="image/png, image/jpeg, image/gif, image/webp"
        />
        {#if uploading}
          <p>Uploading...</p>
          <progress class="progress progress-info w-56 mt-6 mx-auto" />
        {/if}
      </div>
    </form>
  
    <a {href} class="btn btn-primary"> Finish </a>
</AuthCheck>