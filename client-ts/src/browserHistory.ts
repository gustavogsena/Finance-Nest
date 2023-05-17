import { createBrowserHistory } from "history";
import type { HistoryRouterProps } from "react-router-dom";

export const browserHistory: HistoryRouterProps["history"] =
  createBrowserHistory() as any;
