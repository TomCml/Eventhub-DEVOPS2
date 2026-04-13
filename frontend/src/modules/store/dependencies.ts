import type { AuthGateway } from '../authentification/gateway/auth.gateway';
import type { UserGateway } from '../user/gateway/user.gateway';
import type { EventGateway } from '../events/gateway/event.gateway';
import type { AnalyticsGateway } from '../analytics/gateway/analytics.gateway';
import type { DashboardGateway } from '../dashboard/gateway/dashboard.gateway';

export type Dependencies = {
    authGateway: AuthGateway;
    userGateway: UserGateway;
    eventGateway: EventGateway;
    analyticsGateway: AnalyticsGateway;
    dashboardGateway: DashboardGateway;
};