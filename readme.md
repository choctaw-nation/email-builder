# Email Builder

A Theme that allows users to generate HTML Emails for sending.

## Changelog

### v1.4.3 - [Nov 18, 2025]

-   Fixed: Buttons render inside of tables to force alignment.
-   Fixed: Images auto-calculate 0.5x width and height for retina compatibility.
-   Fixed: `email-handler` now correctly handles posts with no content.
-   Fixed: Moved attributes out the email `<head>` and into the `<body>`. Also, the email no longer renders `<head><body /></head>`.
-   Tweak: Admins can fix block conflicts.
-   Chore: Update packages

### v1.4.2 - [Oct 15, 2025]

-   Fixed: Better loading state when sending emails
-   Fixed: Lighter gray color as defaults on emails
-   Fixed: Limit sending emails to 5

### v1.4.1 - [Oct 1, 2025]

-   Fixed: `Download HTML` Button works again
    -   Added second rest route to retrieve html content on click (instead of rendering all the time), fixes a regression introduced in `1.2.1`

### v1.4.0 - [Oct 1, 2025]

-   Tweak: Added "Pending" posts to home page
-   Tweak: Home page email previews now have badges for "work in progress" and category, as well as "last modified" times
-   Added: Single.php makes use of Workfront number for new anchor button
-   Added: Button block

### v1.3.1

-   Tweak: Swap font style from `balance` to `pretty` to make type look less dumb.

### v1.3.0 - [Sep 25, 2025]

-   Added: Mediapress support!
-   Added: New link to homepage to workfront project `/updates`

### v1.2.1 - [Sep 12, 2025]

-   Fixed: Emails can now be sent without requiring login
-   Tweak: Rest Route updated to require post id for sending emails (instead of rendering post content all the time with wp_localize_script)
-   Tweak: Form now uses recaptcha

### v1.2.0

-   Added: Homepage now uses featured image, if set, to hopefully add a bit more clarity on which email is being previewed
-   Fixed: Custom colors works!
-   Tweak: Cleaned up the eslint warning

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
