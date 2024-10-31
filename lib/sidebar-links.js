/**
 * Sidebar navigation links
 *
 * --
 *
 * Icons reference link: https://fonts.google.com/icons
 *
 * Properties:
 *  title: the text to be displayed, string
 *  caption: (optional), string
 *  icon: for now, we're using the material icons (visit the reference link given above), string
 *  to: use this if you are pointing to an internal (app-level) routes, string | object | <equivalent to vue-router>
 *  href: use href for external routes, string
 *  target: accompanied by href, string
 *  children: (optional) for submenus, array
 *
 * Note:
 *  - if 'to' and 'href' are both provided, the 'to' property is prioritized
 *  - the 'children' elements use the same template
 */

const links = [
  {
    title: "Main Menu",
    icon: "home",
    children: [
      {
        title: "Submenu",
        icon: "link",
        to: { name: "Nav1" },
      },
    ],
  },
];
export default links
