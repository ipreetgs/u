/* =====================================================================
   DevOps Quest — CONTENT
   Edit this file to update the portfolio text. `**bold**` is supported.
   ===================================================================== */
window.DQ = window.DQ || {};

DQ.PROFILE = {
  name: 'Gurpreet Singh',
  role: 'Senior DevOps Engineer',
  company: 'OpsTree',
  location: 'Punjab, India',
  openTo: 'Chandigarh · Mohali · Remote',
  years: 'Nearly 5 years',
  email: 'preetgur.gsr@gmail.com',
  linkedin: 'https://linkedin.com/in/ipreetgs',
  github: 'https://github.com/ipreetgs',
  instagram: 'https://instagram.com/__gurpreet__23',
  cv: 'GurpreetCV.pdf',
  photo: 'avatar-lg.jpg',
  objective: 'Targeting Senior DevOps, Cloud, Platform and SRE roles — building scalable, secure and highly automated cloud platforms.',
  summary: [
    'Senior DevOps Engineer with **nearly 5 years** building CI/CD, Infrastructure-as-Code and Kubernetes platforms across **AWS, Microsoft Azure and Google Cloud**.',
    'End-to-end **CI/CD pipelines**, **Terraform/Terragrunt** IaC and **Amazon EKS / ECS** orchestration for scalable, highly available cloud-native environments.',
    '**DevSecOps** — SonarQube, Checkmarx CxOne, Checkov, Trivy and OWASP ZAP embedded into delivery pipelines, plus hands-on CVE remediation and platform upgrades.',
    '**Observability & reliability** with Dynatrace, AppDynamics, Grafana, Prometheus, ELK and Chaos Mesh, including production root cause analysis on Amazon EKS.'
  ],
  highlights: [
    ['25+', 'enterprise apps on standardized CI/CD'],
    ['13+', 'apps on zero-downtime blue-green'],
    ['100%', 'accurate Git/SVN → GitHub migration'],
    ['3', 'clouds — AWS · Azure · GCP']
  ]
};

/* Experience, oldest first (the page shows newest first). */
DQ.EXPERIENCE = [
  {
    id: 'edu', org: 'SBSSTU, Firozpur', role: 'B.Tech — Computer Science Engineering',
    period: '2017 – 2021', building: 'academy', icon: 'fa-graduation-cap',
    bullets: ['Bachelor of Technology in Computer Science Engineering at Shaheed Bhagat Singh State Technical University.'],
    tags: []
  },
  {
    id: 'eh1', org: 'EH1 Infotech', role: 'Network Security Trainee',
    period: 'Jun 2018 – Aug 2018', building: 'shield', icon: 'fa-user-shield',
    bullets: ['Focused on **VAPT** (Vulnerability Assessment and Penetration Testing) and network security protocols.'],
    tags: ['VAPT', 'Network Security', 'Pentesting']
  },
  {
    id: 'txp', org: 'TestingXperts', place: 'Punjab', role: 'DevOps Engineer',
    period: 'Jan 2022 – Aug 2026', building: 'castle', icon: 'fa-chess-rook',
    bullets: [
      'Automated AWS infrastructure provisioning using **Terraform & Jenkins**.',
      'Optimized AWS VM costs using **Lambda** for auto-shutdown.',
      'Deployed Python apps on GCP using **Cloud Build**.',
      'Spearheaded repo migrations to GitHub using **Ansible** & custom scripts.'
    ],
    tags: ['AWS', 'Terraform', 'Jenkins', 'AWS Lambda', 'GCP Cloud Build', 'Ansible']
  },
  {
    id: 'opstree', org: 'OpsTree', place: 'Noida', role: 'Senior DevOps Engineer',
    period: 'Aug 2026 – Present', now: true, building: 'tower', icon: 'fa-tree',
    bullets: [
      'Onboarding **AI-based Java Spring Boot microservices** onto a client\'s existing **Amazon EKS** platform, reusing **VPC, ECR, IAM, Jenkins, Argo CD (GitOps) and ELK** patterns to design, deploy and hand over the DEV environment.',
      'Performing **RCA of Amazon EKS workload and platform failures**, documenting findings, fixes and preventive actions.',
      'Leading the **upgrade of an obsolete self-managed GitLab EE server** (15.x on EC2, Amazon Linux 2, behind AWS ALB) flagged for **multiple CVEs**, via a safe in-place upgrade path.',
      'Building **Terraform** infrastructure for **Amazon ECS** services through modular, **PR-reviewed IaC** workflows.',
      'Implementing **production-ready CI** with the onsite team (authoring a whitepaper) and building an **anomaly detection stack with Grafana**.'
    ],
    tags: ['Amazon EKS', 'Argo CD', 'Jenkins', 'ELK', 'GitLab EE', 'Terraform', 'Amazon ECS', 'Grafana']
  }
];

/* Projects. `now: true` = current OpsTree work (shown first). */
DQ.PROJECTS = [
  {
    id: 'eks-ai', org: 'OpsTree', now: true, icon: 'fa-solid fa-dharmachakra',
    title: 'AI Microservices on Amazon EKS', sub: 'Platform onboarding & GitOps delivery',
    bullets: [
      'Onboarding **AI-based Java Spring Boot microservices** onto a client\'s existing **Amazon EKS** platform.',
      'Reusing the established **VPC, ECR, IAM, Jenkins, Argo CD (GitOps) and ELK** patterns.',
      'Designing, deploying and handing over the **DEV environment**.'
    ],
    tags: ['Amazon EKS', 'Argo CD', 'Jenkins', 'Amazon ECR', 'IAM', 'ELK', 'Spring Boot']
  },
  {
    id: 'gitlab', org: 'OpsTree', now: true, icon: 'fa-brands fa-gitlab',
    title: 'GitLab EE Upgrade & CVE Remediation', sub: 'Security patching of a core platform',
    bullets: [
      'Leading the upgrade of an obsolete **self-managed GitLab EE 15.x** server flagged for **multiple CVEs**.',
      'The server runs on **EC2 (Amazon Linux 2)** behind an **AWS ALB**.',
      'Following a **safe in-place upgrade path** to keep the platform available.'
    ],
    tags: ['GitLab EE', 'EC2', 'Amazon Linux 2', 'AWS ALB', 'CVE Remediation']
  },
  {
    id: 'ecs-tf', org: 'OpsTree', now: true, icon: 'fa-solid fa-cubes',
    title: 'Terraform IaC for Amazon ECS', sub: 'Modular, PR-reviewed infrastructure',
    bullets: [
      'Building **Terraform** infrastructure for **Amazon ECS** services.',
      'Modular IaC delivered through **pull-request-reviewed** workflows.'
    ],
    tags: ['Terraform', 'Amazon ECS', 'AWS', 'IaC']
  },
  {
    id: 'eks-rca', org: 'OpsTree', now: true, icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Amazon EKS Reliability & RCA', sub: 'Root cause analysis & prevention',
    bullets: [
      'Performing **RCA** of Amazon EKS **workload and platform failures**.',
      'Documenting findings, fixes and **preventive actions**.'
    ],
    tags: ['Amazon EKS', 'Kubernetes', 'RCA', 'Incident Management']
  },
  {
    id: 'ci-grafana', org: 'OpsTree', now: true, icon: 'fa-solid fa-chart-line',
    title: 'Production CI & Grafana Anomaly Detection', sub: 'CI standards & observability',
    bullets: [
      'Implementing **production-ready CI** with the onsite team, including authoring a **whitepaper**.',
      'Building an **anomaly detection stack with Grafana**.'
    ],
    tags: ['CI', 'Grafana', 'Anomaly Detection', 'Whitepaper']
  },
  {
    id: 'deluxe', org: 'Deluxe Corporation', icon: 'fa-solid fa-network-wired',
    title: 'Deluxe Corporation (DPP)', sub: 'Infrastructure-as-Code & CI/CD pipelines',
    bullets: [
      'Provisioned v-Sphere infrastructure using **Terraform & Terragrunt** with reusable modules.',
      'Automated deployments via **Harness** pipelines, integrating SonarQube & Checkmarx.',
      'Orchestrated **zero-downtime blue-green deployments** across all environments.',
      'Deployed **Dynatrace** for real-time observability and performance optimization.'
    ],
    tags: ['Terraform', 'Harness', 'Dynatrace', 'JFrog']
  },
  {
    id: 'sra', org: 'SRA', icon: 'fa-solid fa-server',
    title: 'SRA (Solicitors Regulation Authority)', sub: 'Migration & Azure cloud management',
    bullets: [
      'Led **Azure Landing Zone** migration, provisioning Function Apps & Storage Accounts via Terraform.',
      'Optimized cloud spend by upgrading WebApp SKUs (P2v2 → P3v0) for better performance.',
      'Configured **Azure Front Door** for global access, security, and routing.',
      'Built Azure dashboards using **KQL** for proactive anomaly detection.'
    ],
    tags: ['Azure', 'Terraform', 'KQL', 'Front Door']
  },
  {
    id: 'netnumber', org: 'Net Number', icon: 'fa-solid fa-right-left',
    title: 'Net Number Migrations', sub: 'Repo migration & governance',
    bullets: [
      'Migrated **Git/SVN repositories to GitHub** with zero disruption.',
      'Developed **Python/Shell** scripts to verify integrity and commit history.',
      'Implemented repository locking via **Ansible** to prevent legacy commits.'
    ],
    tags: ['Python', 'Ansible', 'GitHub Migration']
  }
];

/* The Inferno — real problems and how they were fixed. */
DQ.PROBLEMS = [
  {
    id: 'cve', boss: true, ongoing: true, kind: 'lich', where: 'OpsTree', icon: 'fa-shield-virus',
    colors: { body: '#3b0764', dark: '#1e0336', light: '#6b21a8', horn: '#facc15', eye: '#4ade80' },
    name: 'The CVE Lich', threat: 'An obsolete GitLab EE 15.x flagged for multiple CVEs',
    problem: 'A self-managed **GitLab EE 15.x** server on **EC2 (Amazon Linux 2)**, behind an **AWS ALB**, had fallen far behind on releases and was flagged for **multiple CVEs**.',
    fix: 'Leading the upgrade through a **safe, in-place upgrade path** rather than a risky rebuild.',
    result: 'Boss fight in progress at OpsTree — the Lich is caged while the upgrade proceeds.'
  },
  {
    id: 'crashloop', kind: 'imp', where: 'OpsTree', icon: 'fa-rotate',
    colors: { body: '#b91c1c', dark: '#7f1d1d', light: '#fca5a5', horn: '#fde68a', eye: '#fde047' },
    name: 'CrashLoop Daemon', threat: 'Amazon EKS workload & platform failures',
    problem: 'Workloads and platform components on **Amazon EKS** were failing, and without a clear root cause the same failures could keep coming back.',
    fix: '**Root cause analysis** of each EKS workload and platform failure.',
    result: 'Findings, fixes and **preventive actions** documented so the failures don\'t repeat.'
  },
  {
    id: 'hydra', kind: 'hydra', where: 'TestingXperts', icon: 'fa-code-branch',
    colors: { body: '#15803d', dark: '#14532d', light: '#86efac', horn: '#fef08a', eye: '#fde047' },
    name: 'The Pipeline Hydra', threat: '25+ apps, each shipping its own way',
    problem: 'Enterprise applications were released through inconsistent pipelines, so quality and security checks varied from app to app.',
    fix: 'Standardized CI/CD with **Harness, Jenkins and Azure DevOps**, adding automated **quality gates and security scanning** (SonarQube, Checkmarx, Trivy).',
    result: '**25+ enterprise applications** on standardized CI/CD — more frequent releases, fewer deployment failures.'
  },
  {
    id: 'downtime', kind: 'dragon', where: 'TestingXperts', icon: 'fa-power-off',
    colors: { body: '#c2410c', dark: '#7c2d12', light: '#fdba74', horn: '#fef3c7', eye: '#fde047' },
    name: 'The Downtime Dragon', threat: 'Releases that take production offline',
    problem: 'Deploying new versions of enterprise applications risked **downtime** for their users.',
    fix: '**Blue-green deployments** with automated rollbacks on Docker and Kubernetes (Amazon EKS).',
    result: '**Zero-downtime blue-green deployments** for 13+ enterprise applications.'
  },
  {
    id: 'cost', kind: 'golem', where: 'TestingXperts', icon: 'fa-dollar-sign',
    colors: { body: '#78716c', dark: '#44403c', light: '#d6d3d1', horn: '#facc15', eye: '#facc15' },
    name: 'The Cloud-Bill Golem', threat: 'Idle VMs and oversized resources',
    problem: 'Cloud spend kept growing from VMs left running and resources that weren\'t sized to their workload.',
    fix: '**AWS Lambda** automation to auto-shutdown idle VMs, plus **Azure resource rightsizing**.',
    result: '**Reduced cloud costs** across AWS and Azure.'
  },
  {
    id: 'migration', kind: 'ghost', where: 'Net Number', icon: 'fa-code-merge',
    colors: { body: '#67e8f9', dark: '#0e7490', light: '#cffafe', horn: '#fff', eye: '#22d3ee' },
    name: 'The Legacy Repo Wraith', threat: 'Git & SVN repos stuck in the past',
    problem: 'Repositories spread across **Git and SVN** had to move to **GitHub** without losing history or breaking anyone\'s workflow.',
    fix: '**Python, Shell and Ansible** automation to validate repository integrity, reconfigure Jenkins pipelines and lock legacy repos — plus GitHub governance (branch protection, PR workflows).',
    result: '**100% migration accuracy** with **zero workflow disruption**.'
  },
  {
    id: 'silent', kind: 'ghost', where: 'TestingXperts', icon: 'fa-bell-slash',
    colors: { body: '#cbd5e1', dark: '#475569', light: '#f1f5f9', horn: '#fff', eye: '#f43f5e' },
    name: 'The Silent-Failure Phantom', threat: 'Problems waiting for a human to notice',
    problem: 'Detected application problems sat waiting for someone to notice them and fix them by hand.',
    fix: 'A **Dynatrace auto-healing workflow integrated with Jenkins** to remediate detected problems automatically, with AppDynamics, Grafana and Prometheus alerting.',
    result: 'Detected problems **remediated automatically**, with proactive alerting in place.'
  },
  {
    id: 'fragile', kind: 'imp', where: 'TestingXperts', icon: 'fa-bolt',
    colors: { body: '#be185d', dark: '#831843', light: '#f9a8d4', horn: '#e9d5ff', eye: '#a3e635' },
    name: 'The Fragility Fiend', threat: 'Nobody knows what breaks first',
    problem: 'Services on **Amazon EKS** had never been tested against real failure, so their resilience was unknown.',
    fix: '**Chaos Mesh** resilience testing with **auto-healing** strategies.',
    result: 'Improved **availability and fault tolerance**.'
  }
];

/* Heaven — verbatim recommendations. */
DQ.REVIEWS = [
  { id: 'manisha', name: 'Manisha Verma', title: 'Software Engineer at TestingXperts', color: '#6366f1',
    text: 'A hardworking person with demonstrated outstanding technical abilities in cloud and DevOps. Their technical acumen, problem-solving skills, and ability to mentor others set them apart. Gurpreet is a true asset to any team looking to enhance their operational capabilities.' },
  { id: 'priti', name: 'Priti Ranga', title: 'DevOps Engineer', color: '#ca8a04',
    text: 'Gurpreet is an exceptional DevOps Engineer who streamlined our CI/CD processes, managed Azure IaaS, and optimized infrastructure with Terraform. Their technical expertise, problem-solving skills, and proactive approach greatly contributed to our team\'s success. Highly recommended!' },
  { id: 'navjit', name: 'Navjit Kaur', title: 'Software Engineer', color: '#16a34a',
    text: 'Gurpreet has consistently demonstrated exceptional technical expertise in DevOps practices, streamlining our workflows and improving our software quality. He is a proactive learner who keeps our team updated on industry best practices, a strong communicator who fosters collaboration, and a reliable, deadline-oriented professional.' },
  { id: 'inder', name: 'Inder Preet Singh', title: 'Associate Tech Lead – Penetration Tester at Trantor', color: '#dc2626',
    text: 'Gurpreet is a motivated, hard-working, and intelligent person who is an expert in his area.' },
  { id: 'mayur', name: 'Mayur Prabhat', title: 'DevSecOps Engineer at Axis Bank', color: '#9333ea',
    text: 'A hard working person with high skills and excellent knowledge in DevOps and development.' },
  { id: 'gurwinder', name: 'Gurwinder Singh', title: 'Student at Conestoga College', color: '#2563eb',
    text: 'Gurpreet Singh is working hard as a DevOps engineer and he is always eager to work and learn new skills.' }
];

/* Skills in the DevOps Sea. The first 8 sit on the ship's helm wheel;
   `spot` is the landmark in the sea scene that lights up for each one. */
DQ.SKILLS = [
  { id: 'cloud', spot: 'clouds', name: 'Cloud Platforms', icon: 'fa-solid fa-cloud', where: 'The three cloud kingdoms',
    flavor: 'Multi-cloud by design — this is where the infrastructure lives.',
    items: ['AWS — EKS, ECS, ECR, EC2, ALB, IAM, VPC, Lambda', 'Microsoft Azure', 'Google Cloud (GCP)'] },
  { id: 'k8s', spot: 'ship', name: 'Orchestration', icon: 'fa-solid fa-dharmachakra', where: 'HMS Kubernetes',
    flavor: '"Kubernetes" is Greek for helmsman — this ship steers every workload to the right node.',
    items: ['Kubernetes', 'Amazon EKS', 'Amazon ECS', 'Helm'] },
  { id: 'docker', spot: 'shark', name: 'Containers & Artifacts', icon: 'fa-brands fa-docker', where: 'The delivery shark',
    flavor: 'Builds the images, pushes them to the registry and delivers pods to the cluster.',
    items: ['Docker', 'Amazon ECR', 'JFrog Artifactory'] },
  { id: 'cicd', spot: 'octopus', name: 'CI/CD & GitOps', icon: 'fa-solid fa-infinity', where: 'The GitOps octopus',
    flavor: 'One arm per pipeline tool — every arm in sync with Git.',
    items: ['Harness', 'Jenkins', 'Azure DevOps', 'GitLab CI', 'Google Cloud Build', 'Argo CD'] },
  { id: 'iac', spot: 'island', name: 'Infrastructure as Code', icon: 'fa-solid fa-cubes', where: 'Terraform Isle',
    flavor: 'Land that only exists once it is declared in code and reviewed in a PR.',
    items: ['Terraform', 'Terragrunt', 'Ansible'] },
  { id: 'sec', spot: 'lighthouse', name: 'DevSecOps', icon: 'fa-solid fa-shield-halved', where: 'The security lighthouse',
    flavor: 'Its beam sweeps every pipeline for vulnerabilities before they reach the shore.',
    items: ['SonarQube', 'Checkmarx CxOne', 'Checkov', 'Trivy', 'OWASP ZAP', 'Burp Suite', 'Nessus', 'Azure Key Vault'] },
  { id: 'obs', spot: 'radar', name: 'Observability', icon: 'fa-solid fa-satellite-dish', where: 'The radar on the mast',
    flavor: 'Eyes on every metric, log and trace — spotting storms before they reach production.',
    items: ['Dynatrace', 'AppDynamics', 'Grafana', 'Prometheus', 'ELK', 'Azure Monitor (KQL)'] },
  { id: 'sre', spot: 'anchor', name: 'Reliability & Ops', icon: 'fa-solid fa-anchor', where: 'The reliability anchor',
    flavor: 'Holds production steady when the sea gets rough.',
    items: ['Root Cause Analysis (RCA)', 'Incident Management', 'Chaos Mesh', 'Auto-healing', 'Jira', 'ServiceNow', 'LittleFish'] },
  { id: 'code', spot: 'penguin', bonus: true, name: 'Linux & Code', icon: 'fa-brands fa-linux', where: 'The penguin on the iceberg',
    flavor: 'Cool, stable and mostly below the surface — like a good shell script.',
    items: ['Linux (Amazon Linux)', 'Bash', 'Python', 'Git', 'GitHub', 'GitLab', 'SVN'] }
];

/* Treasure chest on the sea floor. */
DQ.CERTS = [
  { name: 'Harness CI, CD & GitOps', by: 'Developer & Administrator', icon: 'fa-solid fa-infinity' },
  { name: 'Google Cloud Digital Leader', by: 'Google Cloud', icon: 'fa-brands fa-google' },
  { name: 'HHS Award', by: 'Outstanding performance · TestingXperts', icon: 'fa-solid fa-trophy' },
  { name: 'AWS Certificate', by: 'Amazon Web Services', icon: 'fa-brands fa-aws' },
  { name: 'Docker Essentials', by: 'Cognitive Class', icon: 'fa-brands fa-docker' },
  { name: 'Network Security & Pentesting', by: 'EH1 Infotech', icon: 'fa-solid fa-user-shield' },
  { name: 'Python OOP & AI', by: 'LinkedIn / Coursera', icon: 'fa-brands fa-python' }
];

/* Font Awesome icon for a skill/tag chip (exact name, then prefix match). */
DQ.CHIP_ICONS = {
  'Kubernetes': 'fa-solid fa-dharmachakra', 'Helm': 'fa-solid fa-dharmachakra',
  'Amazon': 'fa-brands fa-aws', 'AWS': 'fa-brands fa-aws', 'EC2': 'fa-brands fa-aws', 'IAM': 'fa-brands fa-aws',
  'Docker': 'fa-brands fa-docker', 'Microsoft Azure': 'fa-brands fa-microsoft', 'Azure': 'fa-brands fa-microsoft',
  'Google': 'fa-brands fa-google', 'GCP': 'fa-brands fa-google', 'Jenkins': 'fa-brands fa-jenkins',
  'Git': 'fa-brands fa-git-alt', 'GitHub': 'fa-brands fa-github', 'GitLab': 'fa-brands fa-gitlab',
  'Linux': 'fa-brands fa-linux', 'Python': 'fa-brands fa-python', 'Bash': 'fa-solid fa-terminal',
  'Jira': 'fa-brands fa-jira', 'Terraform': 'fa-solid fa-cubes', 'Terragrunt': 'fa-solid fa-cubes',
  'Ansible': 'fa-solid fa-gears', 'Grafana': 'fa-solid fa-chart-area', 'Prometheus': 'fa-solid fa-fire',
  'Argo CD': 'fa-solid fa-arrows-rotate', 'ELK': 'fa-solid fa-magnifying-glass', 'RCA': 'fa-solid fa-magnifying-glass',
  'Root Cause': 'fa-solid fa-magnifying-glass', 'Chaos Mesh': 'fa-solid fa-bolt', 'Auto-healing': 'fa-solid fa-heart-pulse',
  'Harness': 'fa-solid fa-infinity', 'CVE': 'fa-solid fa-bug', 'Spring Boot': 'fa-solid fa-leaf',
  'Dynatrace': 'fa-solid fa-gauge-high', 'AppDynamics': 'fa-solid fa-gauge', 'SonarQube': 'fa-solid fa-satellite-dish',
  'Trivy': 'fa-solid fa-shield-virus', 'Checkov': 'fa-solid fa-list-check', 'Checkmarx': 'fa-solid fa-shield-halved',
  'OWASP': 'fa-solid fa-user-secret', 'Burp': 'fa-solid fa-user-secret', 'Nessus': 'fa-solid fa-crosshairs',
  'JFrog': 'fa-solid fa-box-archive', 'SVN': 'fa-solid fa-code-branch', 'ServiceNow': 'fa-solid fa-ticket',
  'LittleFish': 'fa-solid fa-fish', 'Incident': 'fa-solid fa-truck-medical', 'VAPT': 'fa-solid fa-user-secret'
};
