<script lang="ts">
  import { auth, user, userData, db } from "$lib/firebase";
  import { goto } from "$app/navigation";
  import { doc, getDoc } from "firebase/firestore";

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  let errorMsg = "";
  let busy = false;

  // Returning users (profile already exists) skip onboarding and go straight
  // to their page; brand-new users go through username/photo setup.
  async function routeAfterAuth(uid: string) {
    const snap = await getDoc(doc(db, "users", uid));
    const username = snap.exists() ? snap.data()?.username : null;
    await goto(username ? `/${username}` : "/login/username");
  }

  async function signInWithGoogle() {
    errorMsg = "";
    busy = true;
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);

      const idToken = await credential.user.getIdToken();

      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
        },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        errorMsg =
          (body.message ?? "Sign in failed. Please try again.") +
          (body.detail ? `\n(${body.detail})` : "");
        await signOut(auth);
        return;
      }

      await routeAfterAuth(credential.user.uid);
    } catch (e: any) {
      // Popup closed/blocked or network error.
      if (e?.code !== "auth/popup-closed-by-user") {
        errorMsg = "Could not sign in. Please try again.";
      }
    } finally {
      busy = false;
    }
  }

  async function signOutSSR() {
    await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }
</script>

<h2 class="text-2xl font-extrabold"><span class="text-gradient">Welcome</span></h2>

{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>
  {#if $userData?.username}
    <a href={`/${$userData.username}`} class="btn btn-primary btn-glow rounded-full px-8">
      Go to my profile
    </a>
  {:else}
    <a href="/login/username" class="btn btn-primary btn-glow rounded-full px-8">
      Finish setup
    </a>
  {/if}
  <button class="btn btn-ghost btn-sm rounded-full" on:click={signOutSSR}>Sign out</button>
{:else}
  <p class="text-base-content/60">Sign in to create or manage your profile.</p>
  <button
    class="btn btn-primary btn-glow gap-2 rounded-full px-8"
    on:click={signInWithGoogle}
    disabled={busy}
  >
    {#if busy}
      <span class="loading loading-spinner loading-sm"></span>
      Signing in...
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M21.35 11.1h-9.17v2.96h5.27c-.23 1.37-1.6 4.02-5.27 4.02-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.92 3.6 14.83 2.7 12.18 2.7 6.98 2.7 2.77 6.9 2.77 12.1s4.21 9.4 9.41 9.4c5.43 0 9.03-3.82 9.03-9.2 0-.62-.07-1.09-.16-1.56z"/>
      </svg>
      Sign in with Google
    {/if}
  </button>
  {#if errorMsg}
    <p class="text-error text-sm whitespace-pre-line">{errorMsg}</p>
  {/if}
{/if}