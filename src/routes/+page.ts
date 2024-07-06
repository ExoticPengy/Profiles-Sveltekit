import { collection, doc, getDocs, limit, query, where } from "firebase/firestore";
import type { PageLoad } from './$types';
import { db } from "$lib/firebase";

export const load = (async () => {
    let usersArray = new Array
    const collectionRef = collection(db, "usernames");
    const snapshot = await getDocs(collectionRef);
    snapshot.docs.forEach((doc) => {
        usersArray.push(doc.id)
    })

    return {
        users: usersArray ?? []
    };
}) satisfies PageLoad;