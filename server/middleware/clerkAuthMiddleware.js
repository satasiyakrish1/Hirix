import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Middleware to protect user routes
export const protectUser = ClerkExpressRequireAuth(); 