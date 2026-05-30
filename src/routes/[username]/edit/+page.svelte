<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import SortableList from "$lib/components/SortableList.svelte";
    import UserLink from "$lib/components/UserLink.svelte";
    import { db, userData, user } from "$lib/firebase";
    import {
      arrayRemove,
      arrayUnion,
      doc,
      getDoc,
      setDoc,
      updateDoc,
      writeBatch,
    } from "firebase/firestore";
    import { writable } from "svelte/store";
  
    const icons = [
      "Twitter",
      "YouTube",
      "TikTok",
      "LinkedIn",
      "GitHub",
      "Custom",
    ];
    const formDefaults = {
      icon: "custom",
      title: "",
      url: "https://",
    };
    const formData = writable(formDefaults);
  
    let showForm = false;
  
    $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
    $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
    $: formIsValid = urlIsValid && titleIsValid;
  
    function sortList(e: CustomEvent) {
      const newList = e.detail;
      const userRef = doc(db, "users", $user!.uid);
      setDoc(userRef, { links: newList }, { merge: true });
    }
  
    async function addLink(e: SubmitEvent) {
      const userRef = doc(db, "users", $user!.uid);
  
      await updateDoc(userRef, {
        links: arrayUnion({
          ...$formData,
          id: Date.now().toString(),
        }),
      });
  
      formData.set(formDefaults);
  
      showForm = false;
    }
  
    async function deleteLink(item: any) {
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        links: arrayRemove(item),
      });
    }
  
    async function toggleProfileStatus(item: any) {
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        published: !$userData?.published,
      });
    }
  
    function cancelLink() {
      formData.set(formDefaults);
      showForm = false;
    }

    // ----- Edit username -----
    const usernameRe = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    let showUsernameForm = false;
    let newUsername = "";
    let checkingName = false;
    let nameAvailable = false;
    let renaming = false;
    let renameError = "";
    let nameDebounce: ReturnType<typeof setTimeout>;

    $: nameIsValid =
      newUsername.length > 2 &&
      newUsername.length < 16 &&
      usernameRe.test(newUsername);
    $: nameIsSame = newUsername === $userData?.username;
    $: nameIsTaken = nameIsValid && !nameIsSame && !nameAvailable && !checkingName;
    $: canRename =
      nameIsValid && !nameIsSame && nameAvailable && !checkingName && !renaming;

    function checkNameAvailability() {
      renameError = "";
      nameAvailable = false;
      clearTimeout(nameDebounce);

      if (!nameIsValid || nameIsSame) {
        checkingName = false;
        return;
      }

      checkingName = true;
      nameDebounce = setTimeout(async () => {
        const exists = await getDoc(doc(db, "usernames", newUsername)).then((d) =>
          d.exists()
        );
        nameAvailable = !exists;
        checkingName = false;
      }, 500);
    }

    function openUsernameForm() {
      newUsername = $userData?.username ?? "";
      nameAvailable = false;
      renameError = "";
      showUsernameForm = true;
    }

    function cancelUsername() {
      showUsernameForm = false;
      renameError = "";
    }

    async function changeUsername() {
      if (!canRename || !$userData || !$user) return;

      const oldName = $userData.username;
      const uid = $user.uid;
      renaming = true;
      renameError = "";

      try {
        // Atomic rename: claim the new name, release the old one, point the
        // user doc at the new name. All-or-nothing so the username index can
        // never end up half-written.
        const batch = writeBatch(db);
        batch.set(doc(db, "usernames", newUsername), { uid });
        batch.delete(doc(db, "usernames", oldName));
        batch.update(doc(db, "users", uid), { username: newUsername });
        await batch.commit();

        showUsernameForm = false;
        // The route param still holds the old name — move to the new URL.
        await goto(`/${newUsername}/edit`);
      } catch (err: any) {
        renameError = err?.message ?? "Could not change username. Try again.";
      } finally {
        renaming = false;
      }
    }
  </script>
  
  <main class="mx-auto max-w-xl px-4 pt-12">
    {#if $userData?.username == $page.params.username}
      <h1 class="mx-2 mb-4 mt-8 text-center text-3xl font-extrabold">
        <span class="text-gradient">Edit your Profile</span>
      </h1>

      <div class="mb-6 flex justify-center">
        <a
          href={`/${$userData?.username}`}
          class="btn btn-primary btn-glow gap-2 rounded-full px-6"
        >
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          View My Profile
        </a>
      </div>

      <div class="text-center mb-8">
        <p>
          Profile Link:
          <a
            href={`/${$userData?.username}`}
            class="link link-accent"
          >
            https://exoticpengy.vercel.app/{$userData?.username}
          </a>
        </p>
      </div>
  
      <!-- Username -->
      <div class="mx-auto mb-6 w-full rounded-2xl glass p-5">
        {#if !showUsernameForm}
          <div class="flex items-center justify-between gap-3">
            <div class="text-left">
              <p class="text-xs uppercase tracking-widest text-base-content/40">
                Username
              </p>
              <p class="text-lg font-bold text-white">@{$userData?.username}</p>
            </div>
            <button class="btn btn-outline btn-sm" on:click={openUsernameForm}>
              Edit
            </button>
          </div>
        {:else}
          <label for="newUsername" class="label">
            <span class="label-text">Choose a new username</span>
          </label>
          <div class="join w-full">
            <span class="join-item flex items-center bg-base-300 px-3 text-base-content/50">@</span>
            <input
              id="newUsername"
              type="text"
              placeholder="Username"
              class="input join-item input-bordered w-full"
              bind:value={newUsername}
              on:input={checkNameAvailability}
              class:input-error={!nameIsValid && newUsername.length > 0}
              class:input-warning={nameIsTaken}
              class:input-success={nameAvailable && nameIsValid && !nameIsSame}
            />
          </div>

          <div class="mt-2 min-h-6 text-sm">
            {#if checkingName}
              <p class="text-secondary">Checking @{newUsername}...</p>
            {:else if newUsername.length > 0 && !nameIsValid}
              <p class="text-error">3-16 chars, letters/numbers/._ only</p>
            {:else if nameIsSame}
              <p class="text-base-content/40">That's already your username.</p>
            {:else if nameIsTaken}
              <p class="text-warning">@{newUsername} is taken</p>
            {:else if canRename}
              <p class="text-success">@{newUsername} is available!</p>
            {/if}
            {#if renameError}
              <p class="text-error">{renameError}</p>
            {/if}
          </div>

          <div class="mt-3 flex justify-end gap-2">
            <button class="btn btn-ghost btn-sm" on:click={cancelUsername} disabled={renaming}>
              Cancel
            </button>
            <button class="btn btn-success btn-sm" on:click={changeUsername} disabled={!canRename}>
              {#if renaming}Saving...{:else}Save{/if}
            </button>
          </div>
        {/if}
      </div>

      <div class="text-center my-4">
        <a class="btn btn-outline btn-xs" href="/login/photo">Change photo</a>
        <a class="btn btn-outline btn-xs" href={`../${$userData.username}/bio`}>Edit Bio</a>
      </div>
  
      <form class="form-control">
        <label class="label cursor-pointer flex items-start justify-center">
          <span class="label-text mr-6">
            <div
              class="tooltip group-hover:tooltip-open"
              data-tip="If public, the world can see your profile"
            >
              {$userData?.published ? "Public profile" : "Private profile"}
            </div>
          </span>
          <input
            type="checkbox"
            class="toggle toggle-success"
            checked={$userData?.published}
            on:change={toggleProfileStatus}
          />
        </label>
      </form>
  
      <SortableList list={$userData?.links} on:sort={sortList} let:item let:index>
        <div class="group relative">
          <UserLink {...item} />
          <button
            on:click={() => deleteLink(item)}
            class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
            >Delete</button
          >
        </div>
      </SortableList>
      {#if showForm}
        <form
          on:submit|preventDefault={addLink}
          class="mx-auto w-full rounded-2xl glass p-6"
        >
          <select
            name="icon"
            class="select select-sm"
            bind:value={$formData.icon}
          >

            {#each icons as icon}
              <option value={icon.toLowerCase()}>{icon}</option>
            {/each}
          </select>
          <input
            name="title"
            type="text"
            placeholder="Title"
            class="input input-sm"
            bind:value={$formData.title}
          />
          <input
            name="url"
            type="text"
            placeholder="URL"
            class="input input-sm"
            bind:value={$formData.url}
          />
          <div class="my-4">
            {#if !titleIsValid}
              <p class="text-error text-xs">Must have valid title</p>
            {/if}
            {#if !urlIsValid}
              <p class="text-error text-xs">Must have a valid URL</p>
            {/if}
            {#if formIsValid}
              <p class="text-success text-xs">Looks good!</p>
            {/if}
          </div>
  
          <button
            disabled={!formIsValid}
            type="submit"
            class="btn btn-success block">Add Link</button
          >
  
          <button type="button" class="btn btn-xs my-4" on:click={cancelLink}>Cancel</button>
        </form>
      {:else}
        <button
          on:click={() => (showForm = true)}
          class="btn btn-outline btn-info block mx-auto my-4"
        >
          Add a Link
        </button>
      {/if}
    {/if}
  </main>
  