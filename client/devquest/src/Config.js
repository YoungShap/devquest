import Joi from 'joi';

// user roleTypes(Levels different users) //
export const RoleTypes = {
  none: 0,
  dev: 1,
  admin: 2,
}


export  const checkPermissions = (permissions, userRoleType) => {
  return permissions.includes(userRoleType);
}

// all pages availible and who can access them by filtering roleTypes //
export const pages = [
    { route: '/projects/mern', title: 'MERN', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin] },
    { route: '/projects/mean', title: 'MEAN', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin] },
    { route: '/projects/ruby', title: 'Ruby', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin] },
    { route: '/projects/react', title: 'React', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin] },
    { route: '/projects/angular', title: 'Angular', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin] },
    { route: '/projects/js', title: 'JS', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin] },
    { route: '/projects/python', title: 'Python', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin] },
    { route: '/projects/php', title: 'PhP', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin]},
    { route: '/projects/htmlcss', title: 'html&css', permissions: [RoleTypes.none, RoleTypes.dev, RoleTypes.admin] },
  ];
  export const TopNavPages = [
    { route: '/', title: 'Home' },
    { route: '/about', title: 'About', permissions: [RoleTypes.dev, RoleTypes.admin, RoleTypes.none] },
    { route: '/projects/favorites', title: 'Favorite Projects', permissions: [RoleTypes.dev, RoleTypes.admin] },
    { route: '/projects/myprojects', title: 'My Projects', permissions: [RoleTypes.dev, RoleTypes.admin] },
    { route: '/admin/sandbox', title: 'Admin', permissions: [RoleTypes.admin] },
    { route: "/login", title: 'Login', permissions: [RoleTypes.none] },
    { route: "/signup", title: 'Signup', permissions: [RoleTypes.none] },
  ];
  export const settings = [
    { route: 'projects/add', title: 'Add Project', permissions: [RoleTypes.dev, RoleTypes.admin] },
    { route: `/account`, title: 'My Account', permissions: [RoleTypes.dev, RoleTypes.admin] },
  ];
  export const structure = [
    { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: true },
    { name: 'devName', type: 'text', label: 'Developer Name', required: true, block: true },
    { name: 'password', type: 'password', label: 'Password', required: true, block: true },
    { name: 'email', type: 'email', label: 'Email', required: false, block: false },
  ]

  export const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
      .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
      devName: Joi.string().min(3).required()
  });



