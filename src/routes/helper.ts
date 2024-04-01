export function isActiveRoute(route:string, currentRoute:string) {
    return route === currentRoute ? 'active' : '';
}
  