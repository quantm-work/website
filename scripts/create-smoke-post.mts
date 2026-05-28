/**
 * Create a published smoke-test post via the dev API route (Next.js runtime).
 *
 *   curl -X POST http://localhost:3000/api/dev/create-smoke-post \
 *     -H "x-smoke-secret: $REVALIDATE_SECRET"
 *
 * Without REVALIDATE_SECRET in the dev server env, omit the header in development.
 */
console.log("Use POST /api/dev/create-smoke-post (see file header).");
