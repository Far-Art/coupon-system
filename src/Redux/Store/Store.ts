import { createStore } from "redux";
import { persistStore } from "redux-persist";
import persistedReducer from "./RootReducer"

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const store = createStore(persistedReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
(window as any).__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store);

const reduxPersistedStore = {
    store, 
    persistor
}

export default reduxPersistedStore;