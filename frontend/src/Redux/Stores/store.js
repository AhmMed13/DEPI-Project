import { legacy_createStore as createStore } from "@reduxjs/toolkit";
import { reducer } from "../Reducers/reducers";

export const store = createStore(reducer)
