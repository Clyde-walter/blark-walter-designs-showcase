# Live project previews and admin redesign

## Scope
- Add an embedded live website preview to every project detail page that has a `liveUrl`.
- Keep a clear “Open live site” action for sites that block embedded viewing.
- Make the preview usable on phones, tablets, and desktop without disturbing the existing case-study content.
- Redesign the admin panel after the requested reference image is reattached, while preserving all current content-management features.

## Implementation
- Create a reusable live-site preview with browser-style controls, loading feedback, the real project URL, reload, and external-open actions.
- Render it only for projects with a live URL; projects without one retain their current case-study layout.
- Verify the project page at desktop and mobile sizes and check for build or runtime errors.
- Use the reattached image as the source of truth for the admin layout, navigation, spacing, and visual hierarchy.

## Limitation
Some third-party sites may prohibit iframe embedding through their own security headers. Those pages will still have a prominent external-open action using the same real URL.
