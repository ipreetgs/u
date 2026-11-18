# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences, all confirmed by the owner: recruiters and hiring managers; engineers and tech leads who judge technical depth; freelance or consulting clients; and anyone he shares the link with (friends, colleagues, LinkedIn contacts). The CV's stated job objective is Senior DevOps Engineer, Cloud Engineer, Platform Engineer and Site Reliability Engineer roles, open to Chandigarh, Mohali or remote.

## Product Purpose

A personal portfolio for Gurpreet Singh, a Senior DevOps Engineer with nearly five years of experience (OpsTree, Noida, since Aug 2026; TestingXperts, Punjab, Jan 2022 to Aug 2026). It shows his work in CI/CD, Infrastructure-as-Code, Kubernetes and DevSecOps across AWS, Azure and GCP.

Success is the visitor downloading the CV. That is the one action the owner most wants; contact links (email, LinkedIn, GitHub, Instagram) support it.

## Positioning

Specific, CV-backed outcomes: CI/CD standardized across 25+ enterprise applications, zero-downtime blue-green deployments for 13+, a Git and SVN to GitHub migration at 100% accuracy, and current Amazon EKS platform work at OpsTree. Derived from the CV rather than interviewed separately.

## Operating Context

- Static site in a GitHub repository (github.com/ipreetgs/u). The hosting or deploy target is not stated.
- `GurpreetCV.pdf` is the CV the site links to for download.
- `classic.html` is a plain résumé-style version of the same content kept alongside `index.html`.

## Capabilities and Constraints

- Plain HTML, CSS and JavaScript with no build step or framework. All site wording lives in `data.js`. Scroll animation uses GSAP loaded from a CDN.
- **Confirmed constraint: stick to the CV.** Every claim must trace to `GurpreetCV.pdf`. Do not infer problem statements or extend the facts, and do not list certifications beyond the CV's: Harness CI, CD and GitOps (Developer and Administrator), Google Cloud Digital Leader, and the HHS Award from TestingXperts.
- **Confirmed exceptions:** the SRA project, the EH1 Infotech traineeship (Jun to Aug 2018) and the six recommendations come from the earlier version of the site, not the CV. The owner chose to keep all three.
- **Left as is by choice:** a few lines go slightly beyond the CV's wording (some TestingXperts bullets, "across all environments" on Deluxe, "repository locking via Ansible" on Net Number), and the CV's Observability & Chaos Engineering and IACT key projects are not on the site. The owner declined to change these for now; do not re-raise them unprompted.

## Brand Commitments

The owner explicitly asked for a modern, interactive, cartoon-style animated site (explicitly not a retro or pixel-game look) that travels through cloud and DevOps scenes: experience and projects in the sky and clouds, skills at sea (Kubernetes as a ship with a helm wheel, Docker as a shark delivering container pods), reviews in heaven, problems solved in hell, and the CV downloadable from a cloud. Recorded as stated, not expanded.

## Evidence on Hand

- `GurpreetCV.pdf`: the source of truth. Work history at OpsTree and TestingXperts, major highlights, key projects (Deluxe Corporation, Net Number, Observability and Chaos Engineering, IACT) and the three credentials above.
- Six recommendations, quoted verbatim, from Manisha Verma, Priti Ranga, Navjit Kaur, Inder Preet Singh, Mayur Prabhat and Gurwinder Singh. They come from the earlier version of the site, not the CV.
- Photos: `pic1.jpg`, `pic.jpg`, `avatar-lg.jpg`; favicon `g.jpg`.
- Absent, so do not invent: traffic or analytics data, a live URL, client names or metrics beyond the CV, and any certification not on the CV.

## Product Principles

1. The CV is the source of truth for claims: add nothing inferred or embellished beyond it, apart from the exceptions the owner confirmed above.
2. Getting the CV is the primary action, so it stays one obvious step away from every part of the site.
3. The current role (OpsTree) leads over earlier work.
4. Visitors range from skimmers to engineers: the key facts must be quick to reach, with depth for those who want it.
