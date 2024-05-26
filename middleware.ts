import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
export default clerkMiddleware({});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
export const isProtectedRoute = createRouteMatcher([
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
]);
