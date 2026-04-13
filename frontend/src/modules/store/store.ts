import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { type Dependencies } from "./dependencies";
import authReducer from "../authentification/store/auth.slice";
import userReducer from "../user/store/user.slice";
import eventsReducer from "../events/store/events.slice";
import analyticsReducer from "../analytics/store/analytics.slice";
import dashboardReducer from "../dashboard/store/dashboard.slice";

const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    events: eventsReducer,
    analytics: analyticsReducer,
    dashboard: dashboardReducer,
});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore['dispatch'];
export type AppGetState = AppStore['getState'];

export const createStore = (config: {
    dependencies: Dependencies;
}) => {
    const store = configureStore({
        reducer: reducers,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: config.dependencies,
                }
            })
        }
    })

    return store;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();