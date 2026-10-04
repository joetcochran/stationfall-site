# The contract's text, every version

The Norm–Greg contract (`design/CONTRACT.md`) as it stood at each version, from v1.0 to the current one, and what each version changed from the one before. [The contract, version by version](contract-history.md) tells why each version was made and whether it helped. This page shows the words themselves.

Pick a version. "What changed" shows the lines added (+) and removed (−), with a few unchanged lines around each change and the words that changed within an edited line marked. "The text" shows the whole contract as that version left it. Each version shows its date and the commit that made it, with the decisions it names, and the contract's own note for it from its change list.

The versions are read from git by `scripts/wiki-data.mjs`: one for each commit that raised the version, taking the higher of the header's version and the change list's newest entry, because the header lagged the list twice. A commit that edited the contract without raising its version is listed under the version it revised. The page follows each new version with no hand edits.

<!-- app: contract-versions -->
