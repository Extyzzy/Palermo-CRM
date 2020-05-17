import store from '../store/user/state'

export default function (endpoint) {
  const permission = store.permissions.find(f => f.permission === `/${endpoint}`);

  return permission ? `${process.env.VUE_APP_API_URL}${permission.endpoint}` : `denied`
}
