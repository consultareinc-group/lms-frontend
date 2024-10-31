// pixelate unit
export function px(unitValue) {
  return unitValue + "px";
}

/**
 *
 * Resolves link properties for internal or external links.
 *
 * @param {Object} linkProps - The link properties object.
 * @param {string} [linkProps.to] - The destination for internal routing.
 * @param {boolean} [linkProps.exact] - Whether the route should be exact (for internal links).
 * @param {string} [linkProps.href] - The URL for external links.
 * @param {string} [linkProps.target] - The target attribute for the link.
 * @param {string} [linkProps.rel] - The rel attribute for the link.
 *
 * @returns {Object} An object with resolved link properties.
 * @returns {string} [return.to] - The internal route (if 'to' was provided).
 * @returns {boolean} [return.exact] - The exact route matching flag (if 'to' was provided).
 * @returns {string} [return.href] - The external URL (if 'href' was provided).
 * @returns {string} return.target - The target attribute, defaulting to "_self" for internal links and "_blank" for external links.
 * @returns {string} return.rel - The rel attribute.
 *
 * @example
 * // For internal routing
 * resolveLinkProps({ to: '/home', exact: true });
 * // Returns: { to: '/home', exact: true, target: '_self', rel: '' }
 *
 * @example
 * // For external links
 * resolveLinkProps({ href: 'https://example.com', rel: 'noopener' });
 * // Returns: { href: 'https://example.com', target: '_blank', rel: 'noopener' }
 */
export function resolveLinkProps(linkProps) {
  if (linkProps.to) {
    return {
      to: linkProps.to,
      exact: linkProps.exact || true,
      target: linkProps.target || "_self",
      rel: linkProps.rel || "",
    };
  } else if (linkProps.href) {
    return {
      href: linkProps.href,
      target: linkProps.target || "_blank",
      rel: linkProps.rel || "",
    };
  }
}
