export const AppRoutes = {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    HISTORY: '/history',
    TICKET: '/ticket',
} as const;

export type HelpMeAIRoute = typeof AppRoutes[keyof typeof AppRoutes];

export const ProtectedRoutes: HelpMeAIRoute[] = [
    AppRoutes.DASHBOARD,
    AppRoutes.HISTORY,
    AppRoutes.TICKET,
];