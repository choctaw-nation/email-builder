# Email Builder

A Theme that allows users to generate HTML Emails for sending.

## Changelog

### v1.2.1 - [Sep 12, 2025]

- Fixed: Emails can now be sent without requiring login
- Tweak: Rest Route updated to require post id for sending emails (instead of rendering post content all the time with wp_localize_script)
- Tweak: Form now uses recaptcha

### v1.2.0

- Added: Homepage now uses featured image, if set, to hopefully add a bit more clarity on which email is being previewed
- Fixed: Custom colors works!
- Tweak: Cleaned up the eslint warning

### v1.1.1

-   Added: Spinner & Button loading state is handled better when email is being sent
-   Tweak: Email field now allows for multiple emails (comma-separated)
-   Fix: Users don't have to be logged in to view this email
-   Tweak: Update colors from names to hex values in `theme.json`


### v1.0.2 - [Sep 11, 2025]

-   Tweak: Swap `phpcs` for `code-checks`
-   Chore: Add configs
-   Chore: Update Packages

### v1.0.1 - [Aug 08, 2025]

-   Refactor code and integrate basic bootstrap into build process

### v1.0.0 - [Aug 08, 2025]

-   Init Theme!
