<img width="150" src="https://raw.githubusercontent.com/metosin/media/master/metosin_black_vertical.svg" alt="Metosin" align="right" />

At [Metosin](https://www.metosin.fi/),
we have created a number of open source libraries and tools for Clojure.
This repository documents the way we work with them.

# Commercial support

Need help with our projects and libraries?
We provide support, training, performance optimization, and more. Contact us at XXX(address) for more information.

XXX(instructions for telling us that you use our libraries; cf. [clj-kondo](https://github.com/clj-kondo/clj-kondo/issues/438))

# List of notable libraries

- [reitit](https://github.com/metosin/reitit): fast data-driven router for Clojure(Script)
- [malli](https://github.com/metosin/malli): data-driven schemas for Clojure(Script)
- [muuntaja](https://github.com/metosin/muuntaja): fast HTTP format negotation, encoding, and decoding
- [jsonista](https://github.com/metosin/jsonista): fast JSON encoding and decoding

You may also know [compojure-api](https://github.com/metosin/compojure-api), [spec-tools](https://github.com/metosin/spec-tools), and [schema-tools](https://github.com/metosin/schema-tools). [Browse GitHub for more](https://github.com/metosin?q=&type=public&language=&sort=).

# For collaborators

All Metosin libraries welcome contributions!
See `CONTRIBUTING.md` file for the project in question for more details.
Here are some general guidelines:

## Issues and pull requests

* Please file bug reports and feature proposals as GitHub issues
* For small changes such as bug fixes or documentation changes, feel free to send a pull request
* If you want to make a big change or implement a big new feature, please open an issue to discuss it first.

## Security contact

XXX(to be written)

## Code of conduct

XXX(to be written)

# For maintainers

These are recommendations and ideas for making a useful and approachable open source project.
They're not hard-and-fast rules.
Comments and feedback are welcome.

## Triaging issues

XXX(to be written)

## Reviewing pull requests

XXX(to be written)

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

# Project lifecycle model

Our projects generally go through the following stages:

* **Experimental**: we're trying this out; there are no guarantees of stability or future of the project.
* **Under active development**: actively maintained and recommended; there may be upcoming breaking changes
* **Stable:** actively maintained; new releases are expected to be backwards-compatible
* **Deprecated:** not actively maintained nor recommended for new projects
