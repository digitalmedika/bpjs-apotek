# Changesets

Run `bun run changeset` for every user-facing package change, then commit the generated markdown file with the code change.

When changes land on `main`, the release workflow opens or updates a release PR. Merging that PR publishes the package to npm and creates a GitHub release.
