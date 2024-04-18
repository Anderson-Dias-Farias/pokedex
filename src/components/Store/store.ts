import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;