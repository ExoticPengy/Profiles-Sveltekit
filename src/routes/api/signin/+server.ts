import { adminAuth } from '$lib/server/admin';
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const { idToken } = await request.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
        const decodedIdToken = await adminAuth.verifyIdToken(idToken);

        if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 5 * 60) {
            return json({ status: 'error', message: 'Recent sign in required!' }, { status: 401 });
        }

        const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

        cookies.set('__session', cookie, options);

        return json({ status: 'signedIn' });
    } catch (err: any) {
        // Surface a clean error instead of a raw 500. The most common cause is
        // invalid/missing Firebase Admin service-account credentials in .env.
        const detail = err?.errorInfo?.message ?? err?.message ?? String(err);
        console.error('signin error:', detail);
        return json(
            {
                status: 'error',
                message: 'Sign in failed on the server. Check Firebase Admin credentials.',
                // Only expose the underlying Firebase reason during local dev.
                ...(dev ? { detail } : {}),
            },
            { status: 500 }
        );
    }
};

export const DELETE: RequestHandler = async ({ cookies }) => {
    cookies.delete('__session', { path: '/' });
    return json({ status: 'signedOut' });
};
