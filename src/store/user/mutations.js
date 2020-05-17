export function LOAD_CREDENTIALS_USER (state, credentials) {
  state.credentials = credentials
}

export function LOAD_USER_INFO (state, info) {
  state.info = info
}

export function LOAD_IS_LOGIN (state, isLogined) {
  state.isLogined = isLogined
}

export function SET_EMAIL(state, email) {
  state.info.user.email = email
}

export function SET_PERMISSIONS(state, permissions) {
  const parsePermissions = permissions.map(p =>  {
    return {
        endpoint: p.endpoint,
        prefix: p.endpoint.slice(0, p.endpoint.indexOf('/')),
        permission: p.endpoint.slice(p.endpoint.indexOf('/')),
        select: p.select === 1,
        update: p.update === 1,
        status: p.status === 1,
    }
  });

  state.permissions = parsePermissions
}

export function SET_AVAILABLE_ROLES(state, roles) {
  state.availableRoles = roles
}

export function SET_AVATAR(state, avatar) {
    if (avatar.includes('google')) {
      state.avatar = avatar
    } else {
      state.avatar = `https://backend-dev.palermo.md` + avatar
    }
}
