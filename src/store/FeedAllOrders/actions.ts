import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string>("ALL_FEED_CONNECT");

export const disconnect = createAction("ALL_FEED_DISCONNECT");

export const wsConnecting = createAction("ALL_FEED_WS_CONNECTING");

export const wsOpen = createAction("ALL_FEED_WS_OPEN");

export const wsClose = createAction("ALL_FEED_WS_CLOSE");

export const wsMessage = createAction<unknown>("ALL_FEED_WS_MESSAGE");

export const wsError = createAction<string>("ALL_FEED_WS_ERROR");
