# Standalone project case studies and updated portrait

## Scope
- Make every project’s existing detail URL a complete case study clients can read without opening the live website.
- Keep the live website preview as an optional supporting section for projects with a real URL.
- Replace the shared portrait used across public-page hero sections with the newly attached photo.

## Implementation
- Expand the project content model with project-specific outcomes, highlights, process notes, and technology details so website, UI/UX, graphics, and logo projects do not reuse banking-specific copy.
- Refine the project detail layout into a self-contained narrative: overview, challenge, solution, key outcomes, process, deliverables/technology, gallery, testimonial, and related work.
- Preserve one canonical `/projects/:slug` page per project and ensure every project card links to its corresponding case study.
- Upload the attached portrait through the project asset flow and update the shared portrait display so Home, About, Services, Projects, Blog, and Testimonials use it consistently.
- Verify case studies and portrait cropping at desktop and phone sizes, then check the latest build and runtime signals.

## Notes
- Existing project facts will remain authoritative; where detailed metrics are unavailable, outcomes will be described without inventing numbers.
- The pending admin redesign remains separate and blocked until its reference image is provided.
