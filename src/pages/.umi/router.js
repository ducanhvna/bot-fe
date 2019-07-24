import React from "react";
import { Router as DefaultRouter, Route, Switch } from "react-router-dom";
import dynamic from "umi/dynamic";
import renderRoutes from "umi/lib/renderRoutes";
import history from "@tmp/history";
import RendererWrapper0 from "/Users/lucky/free/bot-fe/src/pages/.umi/LocaleWrapper.jsx";
import _dvaDynamic from "dva/dynamic";

const Router = require("dva/router").routerRedux.ConnectedRouter;

const routes = [
  {
    path: "/",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__BasicLayout" */ "../../layouts/BasicLayout"
            ),
          LoadingComponent: require("/Users/lucky/free/bot-fe/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/BasicLayout").default,
    Routes: [require("../Authorized").default],
    authority: ["admin", "user"],
    routes: [
      {
        name: "analysis",
        path: "/dashboard/analysis",
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require("@tmp/dva").getApp(),
              models: () => [
                import(
                  /* webpackChunkName: 'p__dashboard__analysis__model.tsx' */ "/Users/lucky/free/bot-fe/src/pages/dashboard/analysis/model.tsx"
                ).then(m => {
                  return { namespace: "model", ...m.default };
                })
              ],
              component: () =>
                import(
                  /* webpackChunkName: "p__dashboard__analysis" */ "../dashboard/analysis"
                ),
              LoadingComponent: require("/Users/lucky/free/bot-fe/src/components/PageLoading/index")
                .default
            })
          : require("../dashboard/analysis").default,
        exact: true
      },
      {
        path: "/",
        name: "welcome",
        icon: "smile",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Welcome" */ "../Welcome"),
              LoadingComponent: require("/Users/lucky/free/bot-fe/src/components/PageLoading/index")
                .default
            })
          : require("../Welcome").default,
        exact: true
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ "../404"),
              LoadingComponent: require("/Users/lucky/free/bot-fe/src/components/PageLoading/index")
                .default
            })
          : require("../404").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/lucky/free/bot-fe/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ "../404"),
          LoadingComponent: require("/Users/lucky/free/bot-fe/src/components/PageLoading/index")
            .default
        })
      : require("../404").default,
    exact: true
  },
  {
    component: () =>
      React.createElement(
        require("/Users/lucky/free/bot-fe/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
          .default,
        { pagesPath: "src/pages", hasRoutesInConfig: true }
      )
  }
];
window.g_routes = routes;
const plugins = require("umi/_runtimePlugin");
plugins.applyForEach("patchRoutes", { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach("onRouteChange", {
    initialValue: {
      routes,
      location,
      action
    }
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return (
    <RendererWrapper0>
      <Router history={history}>{renderRoutes(routes, props)}</Router>
    </RendererWrapper0>
  );
}
