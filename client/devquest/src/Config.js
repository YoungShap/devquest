// user roleTypes(Levels different users) //
export const RoleTypes = {
  none: 0,
  user: 1,
  businessDev: 2,
  admin: 3,
}

export  const checkPermissions = (permissions, userRoleType) => {
  return permissions.includes(userRoleType);
}

// all pages availible and who can access them by filtering roleTypes //
export const pages = [
    { route: '/projects/mern', title: 'MERN', permissions: [RoleTypes.user, RoleTypes.admin, RoleTypes.business] },
    { route: '/projects/mean', title: 'MEAN', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/projects/ruby', title: 'Ruby', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/projects/react', title: 'React', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/projects/angular', title: 'Angular', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/projects/js', title: 'JS', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/projects/python', title: 'Python', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/projects/php', title: 'PhP', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/projects/htmlcss', title: 'html&css', permissions: [RoleTypes.business, RoleTypes.admin] },
  ];
  export const TopNavPages = [
    { route: '/', title: 'Home' },
    { route: '/about', title: 'About', permissions: [RoleTypes.user, RoleTypes.business] },
    { route: '/favorite', title: 'Favorite Projects', permissions: [RoleTypes.user, RoleTypes.business] },
    { route: '/myprojects', title: 'My Projects', permissions: [RoleTypes.user, RoleTypes.business] },
    { route: '/admin/clients', title: 'Admin', permissions: [RoleTypes.admin] },
    { route: "/login", title: 'Login', permissions: [RoleTypes.none1] },
    { route: "/signup", title: 'Signup', permissions: [RoleTypes.none] },
  ];
  export const settings = [
    { route: 'projects/add', title: 'Add Project', permissions: [RoleTypes.user, RoleTypes.business] },
    { route: '/account', title: 'My Account', permissions: [RoleTypes.user, RoleTypes.business] },
  ];

  export const structure = [
    { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: true },
    { name: 'devName', type: 'text', label: 'User Name', required: true, block: true },
    { name: 'password', type: 'password', label: 'Password', required: true, block: true },
    { name: 'email', type: 'email', label: 'Email', required: false, block: false },
  ]

