/**
 * This setup does a few things:
 *
 * We define an AppRoutes object with our routes as constant strings.
 * We use as const to make TypeScript infer the most specific type possible.
 * We create a HelpMeAIRoute type that represents any of the values in AppRoutes.
 */

export const AppRoutes = {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    HISTORY: '/history',
    TICKET: '/ticket',
} as const;

export type HelpMeAIRoute = typeof AppRoutes[keyof typeof AppRoutes];