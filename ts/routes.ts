import pageTop from './page/top';

export const configureRoutes = (): Map<string, () => void> => {
    const routes = new Map<string, () => void>();
    routes.set('page-top', pageTop);

    return routes;
};
