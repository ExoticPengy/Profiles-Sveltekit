import { collection, getDocs, query, where } from "firebase/firestore";
import type { PageLoad } from './$types';
import { db } from "$lib/firebase";

export const load = (async () => {
    // Pull published profiles directly so we can show each user's photo
    // (the usernames collection only stores the name + uid).
    const q = query(
        collection(db, "users"),
        where("published", "==", true)
    );
    const snapshot = await getDocs(q);

    const users = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            username: data.username as string,
            photoURL: (data.photoURL as string) ?? null,
        };
    });

    return { users };
}) satisfies PageLoad;
