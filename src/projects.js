// Single source of truth for projects, used by both the Projects page
// (full case studies) and the Home "Selected work" cards (summaries).
// First entry is treated as the featured one on Home.

export const projects = [
  {
    slug: 'intelligence-plane',
    featured: true,
    category: '// mlops · research',
    cover: '/IntelligencePlane.png',
    year: '2025—PRES',
    arch: 'EVENT-DRIVEN',
    title: 'Intelligence Plane',
    org: 'ICICLE, NSF-funded AI Institute',
    period: 'Jan 2025 to Present',
    imageLabel: 'Project image',
    summary:
      'Event-driven middleware that orchestrates AI/ML workflows with minimal human intervention. Set a rule once, and it handles ingestion, retraining, and redeployment on its own.',
    metrics: [
      { value: '12h → <1h', label: 'Pipeline runtime' },
      { value: "PEARC '25", label: 'Published paper' },
      { value: '2 talks', label: 'All-Hands + Gateways' },
    ],
    body: [
      'AI and ML systems have a lot of moving parts. Data ingestion, pre-processing, training, fine-tuning, deployment. In most research environments, coordinating those steps is manual. A researcher kicks off one step, waits for it to finish, then triggers the next. That waiting and watching is where most of the time goes, not the compute itself.',
      'At ICICLE, an NSF-funded AI institute at Ohio State, I contribute to the Middleware and Tools project. The goal is to orchestrate those workflows with minimum human intervention. A user defines a simple rule, something like "retrain my model after 1,000 new images arrive," and the system handles everything from there. A file watcher detects the threshold, raises an event, collects what\'s needed, retrains the model, and pushes the updated version back into production. No one has to sit and watch.',
      'I built the initial prototype of this pipeline. That meant a MongoDB store for user-defined rules, a lightweight Kafka pub/sub layer connecting all the components, consumer services that bridge events to the right jobs, and Docker containers so everything runs consistently whether it\'s on a laptop, a research cluster, or the cloud.',
      'The original process took around 12 hours because each step waited on a human to initiate the next one. With the event-driven orchestration layer I built, that dropped to under an hour. Not because the compute got faster, but because the pipeline stopped waiting.',
    ],
    recognition:
      `Contributing author on the published paper "Beyond Automation: Integrating Agentic Capabilities into MLOps" (PEARC '25), with a lightning talk at the ICICLE All-Hands Meeting and a poster at Gateways '25.`,
    paper: { label: 'Beyond Automation: Integrating Agentic Capabilities into MLOps', href: '#' },
    tags: ['Python', 'Kafka', 'MongoDB', 'Docker', 'MLOps', 'Event-driven architecture'],
  },
  {
    slug: 'smart-fields',
    featured: false,
    category: '// edge ai · computer vision',
    cover: '/Smartfields.png',
    year: '2025',
    arch: 'EDGE INFERENCE',
    title: 'Smart Fields, Edge AI for Animal Ecology',
    org: 'Texas Advanced Computing Center, UT Austin',
    period: 'Jun 2025 to Aug 2025 · continued as Master\'s work through May 2026',
    imageLabel: 'Project image',
    summary:
      'On-device computer vision for camera traps in the wild. Raspberry Pis run YOLO to detect animals in real time and signal nearby drones to capture a closer look.',
    metrics: [
      { value: 'min → <5s', label: 'End-to-end processing' },
      { value: '50% → 95%', label: 'Detection accuracy' },
    ],
    body: [
      'The Texas Advanced Computing Center is UT Austin\'s research computing arm. I worked there on Smart Fields, automated AI/ML pipelines designed to run on edge devices for animal ecology research. The goal was to give ecologists a fully automated pipeline for observing and studying animals out in the field, with no human in the loop.',
      'The setup: camera traps built on Raspberry Pis, deployed in the wild. The moment motion is detected, an on-device pipeline captures the frame, runs it through a YOLO computer vision model, and scores the detection\'s confidence. If that score crosses a threshold, it triggers downstream actions: transferring the image to TACC cloud storage, or publishing an MQTT event that signals a nearby drone to fly to the trap and capture more detailed footage. All media is then uploaded to cloud and HPC storage for indexing and retention.',
      'When I joined, a basic version existed but it was slow, taking several minutes to capture, infer, and publish. The model was too heavy for the Raspberry Pi, and every captured frame was being sent to it, so images queued up faster than they could be processed.',
      'I fixed this two ways. First, I made the model lighter, with lower input resolution and a smaller YOLO variant, which cut per-frame compute significantly. Second, I added motion-based filtering at the capture level, so only frames with meaningful movement reached the model. Together those changes brought end-to-end processing from several minutes to under five seconds.',
      'On accuracy: the base YOLO model was trained on generic datasets and struggled with our specific animals and conditions, like low light, dense vegetation, and partial visibility. At 50% it was essentially guessing. I fine-tuned it on a domain-specific dataset collected from the actual camera traps, adjusted confidence thresholds, and validated against a fresh labeled set from the same environment. Accuracy went from 50% to 95%.',
      'I also wrote the consumer service that connected the Raspberry Pi pipeline to the drone service, bridging two separate projects into one cohesive workflow. That was the part that made it feel real.',
    ],
    tags: ['Python', 'YOLO', 'Docker', 'MQTT', 'Raspberry Pi', 'Edge AI', 'Computer Vision'],
  },
  {
    slug: 'b2b-ecommerce',
    featured: false,
    category: '// platform engineering',
    cover: '/E-commerce.png',
    year: '2022—24',
    arch: 'MICROSERVICES',
    title: 'B2B E-commerce Platform',
    org: 'Quinbay (Blibli.com)',
    period: 'Jul 2022 to Jul 2024',
    imageLabel: 'Project image',
    draft: true, // drafted from your bio, review/expand
    summary:
      'An early engineer on a small team building a B2B e-commerce platform from scratch. Prototype to global launch in about 10 months, on Java/Spring Boot microservices and Kafka.',
    metrics: [
      { value: '10 mo', label: 'To global launch' },
      { value: '50% fewer', label: 'Critical incidents' },
      { value: 'Award', label: 'Performance recognition' },
    ],
    body: [
      'The platform was a B2B e-commerce system built entirely from scratch on a microservices architecture using Java and Spring Boot. The core difference from a typical e-commerce product was the business model. B2B purchasing does not work like a shopping cart. Prices are negotiated, quantities are large, and terms vary by customer. That meant the entire product had to be designed around a different workflow.',
      'Instead of a cart, customers built a Request for Quotation. They would browse the catalog, add products to a draft RFQ with expected quantities and pricing, and submit it for review. That submission triggered an internal workflow where the business team reviewed the request, negotiated terms, and either approved or countered. Once both sides agreed, the platform converted the approved quotation directly into a sales order. The Quotation Service owned that entire lifecycle, and I took complete ownership of it in the months before launch.',
      'Getting that service right was more a design problem than an implementation problem. The states were many, the transitions were conditional, and the business rules changed as the product evolved. Once the design was solid, the implementation was largely a set of well-defined operations on top of it.',
      'The rest of the platform was equally deliberate in its choices. MongoDB handled product data because B2B catalogs are messy and unstructured, and a rigid relational schema would have been a constant fight. Elasticsearch sat alongside it purely for search, handling the complex filtering and relevance ranking that MongoDB was never built for. Kafka connected everything asynchronously, so when a product was updated upstream, the catalog service consumed the event and kept both stores in sync without any service needing to know about the others.',
    ],
    tags: ['Java', 'Spring Boot', 'Kafka', 'MongoDB', 'Elasticsearch', 'Microservices'],
  },
  {
    slug: 'alzheimers-detection',
    featured: false,
    category: '// deep learning · medical imaging',
    cover: '/Alzheimer.png',
    year: '2022',
    arch: 'COMPARATIVE DL',
    title: "Early Alzheimer's Detection",
    org: 'Undergraduate Capstone · IEEE Published',
    period: '2021 to 2022',
    imageLabel: 'MRI brain scan visualization',
    summary:
      "Comparative study of three deep learning architectures on MRI brain scans for early Alzheimer's detection. Paired with an AR/VR Unity application that renders affected brain regions in 3D.",
    metrics: [
      { value: 'IEEE', label: 'Published' },
      { value: '3 models', label: 'Architectures compared' },
      { value: 'AR/VR', label: 'Unity visualisation' },
    ],
    body: [
      "Alzheimer's disease is difficult to detect early. By the time symptoms show up, a lot of neurological damage has often already happened. The question we started with was whether deep learning models applied to MRI brain scans could pick up on early indicators that might otherwise be missed.",
      'This was my final year undergraduate project, done with a couple of teammates, and later published in IEEE. The core of the work was comparative. Rather than building one model and calling it done, we studied how different deep learning architectures approached the same problem and where each one struggled.',
      'We looked at three model types. 3D Convolutional Neural Networks, which process MRI data as a three dimensional structure and preserve the spatial relationships within the brain. Autoencoders, used for feature extraction from high dimensional scan data. And Deeply Supervised Networks, which apply supervision at multiple layers during training so each layer contributes to the final classification rather than leaving everything to the output.',
      "Once we had a winning model from the comparison, we trained it on MRI datasets and built an AR/VR application in Unity around it. A doctor or patient could upload a new scan and the application would generate a 3D model of the brain with the affected regions visible. The goal was simple: instead of reading a flat report, you could actually look at the brain and see what was going on. Getting the model's output into a form that a non-technical person could understand felt like the more useful half of the project.",
    ],
    tags: ['Python', 'Deep Learning', '3D CNN', 'MRI', 'Unity', 'AR/VR', 'IEEE'],
  },
]
