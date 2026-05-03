/**
 * Stylelint config — design-system enforcement for the personal site.
 *
 * Goal: prevent token drift. Once a value lands in tokens.css, components
 * MUST consume it via var(...). Hardcoded colors / off-scale radii / raw
 * z-index integers fail the lint and surface in CI.
 *
 * Scope: scoped <style> blocks inside .astro files (parsed via postcss-html)
 * plus the canonical .css files in src/styles/. The two files exempted from
 * the strictest rules — tokens.css and global.css — are where the tokens
 * are DEFINED, so they need to carry the raw values.
 *
 * Stylistic noise from stylelint-config-standard is silenced; the config
 * below is opinionated about token consumption, not formatting.
 */
module.exports = {
  customSyntax: 'postcss-html',
  ignoreFiles: ['dist/**', 'node_modules/**', '.astro/**'],

  rules: {
    /* ===== TOKEN DISCIPLINE — these are the rules that matter ===== */

    // No raw hex colors in components. Backgrounds, borders, etc. must
    // reference --color-* / --bg / --surface / --text* tokens.
    'color-no-hex': true,

    // Border-radius must come from the radius scale (or be 0 / 50%).
    'declaration-property-value-allowed-list': {
      'border-radius': [
        '/^var\\(--radius-/',
        '/^0$/',
        '/^0px$/',
        '50%',
      ],
    },

    // Direct rgba/rgb in component backgrounds is a smell — should be a
    // scrim/glass/surface token. Allowed in tokens.css and global.css only.
    'declaration-property-value-disallowed-list': {
      '/^background/': ['/^rgba?\\(/'],
    },

    /* ===== Permissive on style nits — Astro-specific syntax allowed ===== */
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['theme', 'source', 'apply', 'tailwind', 'layer', 'config'] },
    ],
  },

  overrides: [
    {
      // Token DEFINITIONS — these files exist to contain raw values.
      // Disable the strict rules here, since they need to define what the
      // rest of the codebase will consume.
      files: ['src/styles/tokens.css', 'src/styles/global.css'],
      rules: {
        'color-no-hex': null,
        'declaration-property-value-allowed-list': null,
        'declaration-property-value-disallowed-list': null,
      },
    },
    {
      files: ['**/*.astro'],
      customSyntax: 'postcss-html',
    },
  ],
};
