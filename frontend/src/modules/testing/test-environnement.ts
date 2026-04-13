import type{ Dependencies } from "../store/dependencies";
import { createStore, type AppState } from "../store/store";

const createDependencies = (
    dependencies?: Partial<Dependencies>
): Dependencies => ({
    authGateway: {} as any,
    userGateway: {} as any,
    eventGateway: {} as any,
    analyticsGateway: {} as any,
    dashboardGateway: {} as any,
    ...dependencies,
});

export const createTestStore = (config?: {
    initialState?: Partial<AppState>;
    dependencies?: Partial<Dependencies>;
}) => {
    const store = createStore({
        dependencies: createDependencies(config?.dependencies),
    });

    // In a real implementation, we would hydrate the store with config.initialState
    // but for now let's just return the store as it is or use preloadedState in configureStore if needed.

    return store;
};

export const createTestState = (partialState?: Partial<AppState>) => {
    const store = createStore({
        dependencies: createDependencies(),
    });

    const storeInitialState = store.getState();

    const merged = {
        ...storeInitialState,
        ...partialState,
    };

    return createTestStore({ initialState: merged }).getState();
};