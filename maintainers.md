# Maintainers' Guide

This document is intended to help the maintainers of Metosin's open source projects.
Here are recommendations and ideas for making a useful and approachable open source project.
They're not hard-and-fast rules.
Comments and feedback are welcome.

## Reviewing pull requests

When we receive pull requests (PRs), they must be reviewed and merged once they're ready.

* **Review feedback must be actionable**.
  The aim is to make the PR mergeable, or to close it if it's not appropriate for the project.
* Sometimes when a PR needs just a small fix to be ready, it's easiest to fix it yourself. It's okay to do it.
* A PR should be reviewed by the same maintainer from start to end. However, feel free to ask help if you need it!
* Timely reviews keep the contribution process smooth.
* Merging:
  * Merge the PR with a merge commit (not squash or rebase). In GitHub, use the button "Merge pull request".
  * Update the changelog afterwards.

## New project template

Your repository should definitely have a `README.md` file, a `LICENSE` file, and a `CONTRIBUTING.md` file.

We cannot accept external contributions unless the project has clear licensing information.
Having a real `LICENSE` file is important so that various automated tools can pick up the license.
It’s also good to mention the license in the `README.md` and the project.clj file.
Unless you have a good reason to do otherwise, default to the *Eclipse Public License, version 2.0*.

We have prepared a [template of these files](./template) for new projects.

## Documentation

A good README tells the reader what the library is for.

API docs are a necessity.
Luckily [cljdoc](https://cljdoc.org) generates nice API doc pages for Clojars relesases by reading the docstrings.
Here's [an example](https://cljdoc.org/d/metosin/ring-http-response/).
You can find more info [here](https://github.com/cljdoc/cljdoc/blob/master/doc/userguide/for-library-authors.adoc).

Once the API docs are in shape, adding some examples to the README is a good idea.

Depending on the complextiy of the project, you might need in-depth documentation.
It can be either in the README or in a separate `docs` folder.

## GitHub setup

Write a description and set up some labels for the GitHub repo.
Check out other related libraries for useful labels.

Access rights:

* Create or move the repository under the [Metosin](https://github.com/metosin/) organization.
* Set the repository to be public.
* Under _Settings_ → _Manage Access_, invite the Open Source team (metosin/open-source) to the repo as Admin.

## Clojure tooling

Leiningen works great, but if you want to set up `deps.edn` based workflow, go for it.

* Example of a simple Leiningen project: [ring-http-response](https://github.com/metosin/ring-http-response)
* Example of a multi-module Leiningen project: [reitit](https://github.com/metosin/reitit)
* Example of a deps.edn project: [malli](https://github.com/metosin/malli)

## Continuous integration

GitHub Actions (GHA) works great. Travis has limited their open-source offering and we should migrate away from it.

* Example of running tests with GHA: [ring-http-response](https://github.com/metosin/ring-http-response/blob/master/.github/workflows/clojure.yml)
* Example of building releases with GHA: [ring-http-response](https://github.com/metosin/ring-http-response/blob/master/.github/workflows/release.yml) 

Versions to test against:

* Clojure: the latest release should be enough
* Java: test against actively-used LTS releases and the latest release (in August 2021: 8, 11, 16)
  * Always build releases with the oldest supported LTS (in August 2021: 8)
  * Testing against all the Java versions is needed only if you have Java code or heavy Java interop
* Leiningen: the latest version (or a hard-coded fresh version) should be enough

## Releases (Clojars)

If you merge a PR into a repository that is not very active, just release it immediate.
For more active projects, it makes sense to batch the changes into bigger releases.
Batching breaking changes is a great idea.

Check if the are instructions for releasing in the repo and follow them. Before the release:

* Update the version number. We use [Break Versioning](https://github.com/ptaoussanis/encore/blob/master/BREAK-VERSIONING.md) (unless documented otherwise in the repository).
* Check that the changelog is up-to-date.

Doing the release:

* Tag the release commit with a version number tag. (example: [reitit](https://github.com/metosin/reitit/releases))
* If the project contains Java code, always build it with the oldest LTS we support (Java 8).
  Otherwise it won't work with the older Java versions.
  * If you accidentally build it with a newer Java, bump up the patch version and create another release with old Java.
* Never AOT compile a library release.
* Signing the releases is not needed (but if you have a working PGP setup, no need to disable it). ([rationale](https://quanttype.net/posts/2020-07-26-signing-jars-is-worthless.html))
* Consider automating the releases (example: [opqdonut/clj-github-actions-example](https://github.com/opqdonut/clj-github-actions-example))
* If you want to make a pre-release, use a `-SNAPSHOT` version.

Advertising releases:

* Small fixes and dependency bumps do not need to be announced. But it's okay to announce if you want!
* Announce releases with bigger fixes, new features, or breaking changes on #announcements and the project channel on Clojruians Slack.
* Major releases deserve a blog post on [Metosin blog](https://www.metosin.fi/blog/).

