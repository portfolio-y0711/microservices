import { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

type Routes = {
  exact?: boolean
  path?: string | string[]
  component?: any
  routes?: Routes
}[]

export const routes = () => {
  const data: Routes = [
    {
      exact: true,
      path: '/',
      component: lazy(() => import('../pages/home')),
    },
    {
      exact: true,
      path: '/chat',
      component: lazy(() => import('../pages/chat')),
    },
    {
      exact: true,
      path: '/profile',
      component: lazy(() => import('../pages/profile')),
    },
    {
      exact: true,
      path: '/login',
      component: lazy(() => import('../pages/login')),
    },
    {
      exact: true,
      path: '/feeds',
      component: lazy(() => import('../pages/feeds')),
    },
    {
      exact: true,
      path: '/posts',
      component: lazy(() => import('../pages/posts')),
    },
    {
      exact: true,
      path: '/friends',
      component: lazy(() => import('../pages/friends')),
    },
    {
      exact: false,
      path: '/friends/:id',
      component: lazy(() => import('../pages/friends')),
    },
  ]
  const _renderRoutes = (routes: Routes = []) => {
    return (
      <Switch>
        {routes.map((route, i) => {
          const Component = route.component
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              // component={Component}
              render={(props) => (
                <>{route.routes ? _renderRoutes(route.routes) : <Component {...props} />}</>
              )}
            />
          )
        })}
      </Switch>
    )
  }
  return _renderRoutes(data)
}
