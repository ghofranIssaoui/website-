"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

type Language = "fr" | "en";

interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    avis: string;
    contactUs: string;
  };
  hero: {
    subtitle: string;
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    description: string;
    connect: string;
    projects: string;
    clients: string;
    countries: string;
  };
  features: {
    title: string;
    subtitle: string;
    titlePrefix: string;
    titleSuffix: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
    }[];
    stats: {
      timeSaved: string;
      matchingPrecision: string;
      aiSupport: string;
      moreApplications: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    titleEnd: string;
    description: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sent: string;
    phone: string;
    address: string;
  };
  footer: {
    description: string;
    recruitment: string;
    contact: string;
    quickLinks: string;
    home: string;
    services: string;
    about: string;
    avis: string;
    rights: string;
  };
  about: {
    title: string;
    whoWeAre: string;
    whoWeAreDesc1: string;
    whoWeAreDesc2: string;
    whoWeAreDesc3: string;
    stats: {
      clients: string;
      projects: string;
      countries: string;
      experts: string;
    };
    values: {
      title: string;
      reliability: string;
      reliabilityDesc: string;
      reactivity: string;
      reactivityDesc: string;
      security: string;
      securityDesc: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    ia: {
      title: string;
      subtitle: string;
      description: string;
      details: { title: string; items: string[] }[];
    };
    web: {
      title: string;
      subtitle: string;
      description: string;
      details: { title: string; items: string[] }[];
    };
    mobile: {
      title: string;
      subtitle: string;
      description: string;
      details: { title: string; items: string[] }[];
    };
    devops: {
      title: string;
      subtitle: string;
      description: string;
      details: { title: string; items: string[] }[];
    };
    erp: {
      title: string;
      subtitle: string;
      description: string;
      details: { title: string; items: string[] }[];
    };
    data: {
      title: string;
      subtitle: string;
      description: string;
      details: { title: string; items: string[] }[];
    };
    iot: {
      title: string;
      subtitle: string;
      description: string;
      details: { title: string; items: string[] }[];
    };
    cm: {
      title: string;
      subtitle: string;
      description: string;
      details: { title: string; items: string[] }[];
    };
    designed: string;
    designedDesc: string;
    cta: string;
    stats: {
      clients: string;
      projects: string;
      countries: string;
      support: string;
    };
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  avisPage: {
    title: string;
    subtitle: string;
    reviews: string;
    noReviews: string;
    giveYour: string;
    opinion: string;
    description: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    rating: string;
    clickToRate: string;
    poor: string;
    fair: string;
    good: string;
    veryGood: string;
    excellent: string;
    comment: string;
    commentPlaceholder: string;
    submit: string;
    submitting: string;
    thankYou: string;
    successMessage: string;
    adminReply: string;
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      avis: "Avis",
      contactUs: "Contactez-nous",
    },
    hero: {
      subtitle: "3LMSolutions",
      title1: "Recrutement ",
      title2: "Intelligent",
      title3: "alimenté par ",
      title4: "l'IA",
      description: "SmartRecruitAI révolutionne votre processus de recrutement. Triez les CV, évaluez les candidats et planifiez des entretiens en quelques clics.",
      connect: "Se Connecter",
      projects: "Projets livrés",
      clients: "Clients satisfaits",
      countries: "Pays desservis",
    },
    features: {
      title: "Fonctionnalités",
      subtitle: "Le pouvoir de l'IA",
      titlePrefix: "Une solution ",
      titleSuffix: " pour vos recrutements",
      items: [
        { title: "IA Conversationnelle", description: "Chatbot intelligent disponible 24/7 pour répondre aux questions des candidats et guider le processus de recrutement." },
        { title: "Tri Automatique des CV", description: "L'IA analyse et classe les CVs en fonction de la compatibilité avec le poste vacant, gagnant un temps précieux." },
        { title: "Planification Intelligente", description: "Proposez et gérez les créneaux d'entretien automatiquement. Les candidats choisissent selon leurs disponibilités." },
        { title: "Collaboration RH", description: "Interface dédiée pour les équipes RH pour évaluer, shortlister et communiquer avec les candidats facilement." },
        { title: "Analyses Détaillées", description: "Tableaux de bord avec statistiques en temps réel sur les candidatures, performances et conversions." },
        { title: "Notifications Intelligentes", description: "Alertes email et push personnalisées pour tenir informé candidats et équipe RH à chaque étape." },
      ],
    },
    howItWorks: {
      title: "Comment ça marche",
      subtitle: "Recrutez plus vite, plus intelligemment",
      steps: [
        { title: "Publiez votre offre", description: "Créez une annonce détaillée avec les compétences requises, l'expérience nécessaire et la culture d'entreprise." },
        { title: "L'IA trie les candidats", description: "Notre algorithme analyse les CVs, évalue la compatibilité et shortliste automatiquement les meilleurs profils." },
        { title: "Planifiez et recrutez", description: "Proposez des créneaux d'entretien, évaluez les candidats et recrutez vos nouveaux talents en un clin d'œil." },
      ],
      stats: {
        timeSaved: "Temps économisé",
        matchingPrecision: "Précision de matching",
        aiSupport: "Support IA",
        moreApplications: "Plus de candidatures",
      },
    },
    contact: {
      title: "Prêt à ",
      subtitle: "transformer",
      titleEnd: " vos recrutements?",
      description: "Demandez une démo personnalisée ou posez vos questions. Notre équipe vous répondra sous 24h.",
      name: "Nom complet",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      subject: "Sujet",
      subjectPlaceholder: "Sujet de votre message",
      message: "Message",
      messagePlaceholder: "Comment pouvons-nous vous aider?",
      submit: "Envoyer le message",
      sent: "Message envoyé!",
      phone: "Téléphone",
      address: "Adresse",
    },
    footer: {
      description: "Solutions informatiques professionnelles pour particuliers et entreprises. Transformez vos processus de recrutement avec l'intelligence artificielle.",
      recruitment: "Recrutement Intelligent",
      contact: "Contact",
      quickLinks: "Liens rapides",
      home: "Accueil",
      services: "Services",
      about: "À propos",
      avis: "Avis",
      rights: "Tous droits réservés.",
    },
    about: {
      title: "À propos de nous",
      whoWeAre: "Qui sommes-nous ?",
      whoWeAreDesc1: "Nous sommes une équipe de passionnés dédiée à développer des solutions technologiques performantes et accessibles.",
      whoWeAreDesc2: "Notre mission : aider les petites et moyennes entreprises à optimiser leurs processus, gagner en efficacité et réussir leur transition digitale.",
      whoWeAreDesc3: "Avec un savoir-faire solide et une approche orientée client, nous créons des outils modernes qui apportent une réelle valeur à votre activité.",
      stats: {
        clients: "Clients à l'international",
        projects: "Projets logiciels livrés",
        countries: "Pays desservis",
        experts: "Experts IT",
      },
      values: {
        title: "Nos valeurs",
        reliability: "Fiabilité",
        reliabilityDesc: "Nous offrons un service constant et professionnel pour garantir votre satisfaction.",
        reactivity: "Réactivité",
        reactivityDesc: "Nos techniciens interviennent rapidement pour résoudre vos problèmes.",
        security: "Sécurité",
        securityDesc: "Vos données sont traitées avec la plus grande rigueur et confidentialité.",
      },
      cta: {
        title: "Découvrez de nouvelles opportunités",
        description: "Transformez vos idées en solutions digitales performantes. ERP, développement web et mobile, intelligence artificielle et analyse de données.",
        button: "En savoir plus",
      },
    },
    avisPage: {
      title: "Avis de nos clients",
      subtitle: "Découvrez ce que nos clients pensent de nos services",
      reviews: "avis",
      noReviews: "Aucun avis pour le moment. Soyez le premier à donner votre avis !",
      giveYour: "Donnez votre",
      opinion: "avis",
      description: "Votre opinion nous aide à améliorer nos services",
      name: "Nom complet *",
      namePlaceholder: "Votre nom",
      email: "Email (optionnel)",
      emailPlaceholder: "john@exemple.com",
      rating: "Note *",
      clickToRate: "Cliquez pour noter",
      poor: "Mauvais",
      fair: "Moyen",
      good: "Bon",
      veryGood: "Très bon",
      excellent: "Excellent",
      comment: "Commentaire *",
      commentPlaceholder: "Partagez votre expérience...",
      submit: "Envoyer mon avis",
      submitting: "Envoi en cours...",
      thankYou: "Merci !",
      successMessage: "Votre avis a été soumis avec succès et sera visible après validation.",
      adminReply: "3LMSolutions",
    },
    services: {
      title: "Solutions informatiques ",
      subtitle: "professionnelles",
      ia: {
        title: "Intelligence Artificielle IA",
        subtitle: "nearshore & offshore",
        description: "Notre service de conseil remote, nearshore et offshore met l'intelligence artificielle au service de votre croissance.",
        details: [
          { title: "Conseil en IA (nearshore & offshore)", items: ["Stratégie IA", "Architecture de solutions IA", "Intégration et déploiement"] },
          { title: "Développement d'agents / serveurs MCP", items: ["Agents autonomes", "Serveurs MCP (Modular, Multi-Agent)", "Intégration systèmes existants", "Automatisation intelligente"] },
          { title: "Intelligence des données (Data Intelligence)", items: ["Data engineering", "Data analytics", "Traitement et transformation", "Gouvernance et qualité"] },
          { title: "Solutions d'apprentissage automatique (Machine Learning)", items: ["Modèles prédictifs", "Deep learning", "Optimisation et entraînement", "MLOps et industrialisation"] },
        ],
      },
      web: {
        title: "Développement Web",
        subtitle: "Solutions digitales",
        description: "Nous accompagnons les entreprises dans la création, l'optimisation et le développement de leur présence digitale.",
        details: [
          { title: "Création et évolution de sites web", items: ["Création de sites vitrines, e-commerce", "Refonte et modernisation de sites existants", "Renforcement fonctionnel et technique"] },
          { title: "Ergonomie & Design", items: ["Conception UX/UI centrée utilisateur", "Design graphique et identité visuelle", "Optimisation des parcours"] },
          { title: "Hébergement & Infrastructure web", items: ["Hébergement web sécurisé et scalable", "Gestion des serveurs et domaines", "Sauvegardes et sécurité"] },
          { title: "Référencement & visibilité", items: ["Référencement naturel (SEO)", "Optimisation technique et éditoriale", "Suivi des performances"] },
        ],
      },
      mobile: {
        title: "Développement Mobile",
        subtitle: "Applications performantes",
        description: "Nous concevons et développons des applications mobiles performantes, sécurisées et évolutives.",
        details: [
          { title: "Développement d'applications mobiles", items: ["Applications iOS (Swift)", "Applications Android (Kotlin)", "Développement multiplateforme (Flutter, React Native)"] },
          { title: "Conception & stratégie mobile", items: ["Analyse des besoins métiers", "Définition de l'architecture", "Conseil technologique"] },
          { title: "UX/UI & expérience utilisateur", items: ["Design mobile centré utilisateur", "Prototypage et maquettes interactives", "Optimisation de l'ergonomie"] },
          { title: "Tests, déploiement & publication", items: ["Tests fonctionnels et de performance", "Déploiement sur App Store et Google Play", "Conformité aux standards"] },
        ],
      },
      devops: {
        title: "DevOps",
        subtitle: "Automatisation & CI/CD",
        description: "Nos services DevOps s'articulent autour de l'automatisation et de l'industrialisation de vos environnements.",
        details: [
          { title: "CI/CD & Automatisation", items: ["Conception et optimisation de pipelines CI/CD", "Automatisation des builds, tests et déploiements", "Standardisation des workflows DevOps"] },
          { title: "Infrastructure as Code", items: ["Gestion via Terraform, Ansible, CloudFormation", "Déploiement et configuration automatisés", "Réplication et scalabilité"] },
          { title: "Conteneurisation & Orchestration", items: ["Docker, Kubernetes, Helm", "Gestion des clusters et microservices", "Orchestration et déploiement continu"] },
          { title: "Monitoring & Observabilité", items: ["Collecte et gestion des logs (ELK, OpenTelemetry)", "Monitoring (Prometheus, Grafana)", "Alerting et supervision proactive"] },
        ],
      },
      erp: {
        title: "Développement ERP",
        subtitle: "Logiciels sur mesure",
        description: "Nos ERP sur mesure sont conçus pour s'aligner parfaitement avec vos besoins métiers.",
        details: [
          { title: "Conseil & cadrage ERP", items: ["Analyse des besoins métiers", "Audit fonctionnel et technique", "Définition de la solution et architecture"] },
          { title: "Conception & intégration ERP", items: ["Conception d'ERP sur mesure", "Paramétrage et personnalisation", "Intégration avec les systèmes existants"] },
          { title: "Modules fonctionnels ERP", items: ["Gestion de la production", "Gestion de la supply chain", "Gestion commerciale et stocks"] },
          { title: "Déploiement & mise en production", items: ["Tests fonctionnels et techniques", "Recette et validation utilisateur", "Mise en production"] },
        ],
      },
      data: {
        title: "Analyse des Données",
        subtitle: "Data Analytics",
        description: "Nos services d'analyse de données transforment vos informations brutes en insights exploitables.",
        details: [
          { title: "Data Engineering", items: ["Ingestion, transformation et pipelines (ETL/ELT)", "Automatisation des flux de données", "Intégration avec les systèmes existants"] },
          { title: "Architecture Data", items: ["Data lakes, data warehouses et datamarts", "Optimisation de la structuration", "Scalabilité et haute disponibilité"] },
          { title: "Analyse & Modélisation", items: ["Analyse descriptive, prédictive et prescriptive", "Développement de modèles ML & Deep Learning", "Simulation et scénarios décisionnels"] },
          { title: "Visualisation & Reporting", items: ["Tableaux de bord interactifs (Power BI, Tableau)", "Reporting automatisé et suivi des KPI", "Support à la décision stratégique"] },
        ],
      },
      iot: {
        title: "IoT",
        subtitle: "Internet des Objets",
        description: "Nous développons des écosystèmes IoT intelligents pour répondre aux enjeux de la santé, l'agriculture et l'énergie.",
        details: [
          { title: "Santé & IoT Médical", items: ["Dispositifs de monitoring à distance", "Collecte de données biométriques en temps réel", "Alertes intelligentes et détection d'anomalies"] },
          { title: "Agriculture Intelligente", items: ["Surveillance de l'humidité et qualité des sols", "Optimisation de l'irrigation", "Suivi climatique et analyse prédictive"] },
          { title: "Énergie & Optimisation Durable", items: ["Monitoring de consommation énergétique", "Détection de pertes et d'anomalies", "Gestion intelligente des bâtiments"] },
          { title: "Sécurité des Personnes & Bâtiments", items: ["Détection de chute et boutons d'alerte", "Géolocalisation sécurisée", "Vidéosurveillance augmentée par IA"] },
        ],
      },
      cm: {
        title: "Community Management",
        subtitle: "Social Media",
        description: "Nous créons, animons et développons vos communautés sur tous vos réseaux sociaux.",
        details: [
          { title: "Stratégie Social Media", items: ["Élaboration de stratégies sur mesure", "Définition de lignes éditoriales", "Identification des cibles et objectifs"] },
          { title: "Création de Contenus", items: ["Conception de visuels, vidéos et textes", "Création de contenus adaptés aux réseaux", "Optimisation pour l'engagement"] },
          { title: "Animation & Modération", items: ["Animation quotidienne des communautés", "Modération proactive", "Réponse aux commentaires et messages"] },
          { title: "Campagnes Publicitaires", items: ["Gestion de campagnes payantes (Facebook, Instagram, LinkedIn)", "Ciblage et optimisation", "Reporting détaillé"] },
        ],
      },
      designed: "Conçu pour les entreprises",
      designedDesc: "Nous sommes une équipe de passionnés dont la mission est d'améliorer la performance des entreprises grâce à des solutions technologiques innovantes.",
      cta: "Entrer en contact",
      stats: {
        clients: "Clients à l'international",
        projects: "Projets livrés",
        countries: "Pays desservis",
        support: "Support disponible",
      },
    },
    cta: {
      title: "Conçu pour les entreprises",
      description: "Nous sommes une équipe de passionnés dont la mission est d'améliorer la performance des entreprises grâce à des solutions technologiques innovantes. Nous créons des outils performants et sur mesure pour répondre à vos besoins métiers et résoudre vos défis opérationnels.",
      button: "Entrer en contact",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      avis: "Reviews",
      contactUs: "Contact Us",
    },
    hero: {
      subtitle: "3LMSolutions",
      title1: "Intelligent ",
      title2: "Recruitment",
      title3: "powered by ",
      title4: "AI",
      description: "SmartRecruitAI revolutionizes your recruitment process. Sort CVs, evaluate candidates and schedule interviews in just a few clicks.",
      connect: "Connect",
      projects: "Delivered Projects",
      clients: "Satisfied Clients",
      countries: "Countries Served",
    },
    features: {
      title: "Features",
      subtitle: "The Power of AI",
      titlePrefix: "A ",
      titleSuffix: " for your recruitment",
      items: [
        { title: "Conversational AI", description: "Intelligent chatbot available 24/7 to answer candidate questions and guide the recruitment process." },
        { title: "Automatic CV Sorting", description: "AI analyzes and ranks CVs based on compatibility with the vacant position, saving valuable time." },
        { title: "Smart Scheduling", description: "Propose and manage interview slots automatically. Candidates choose according to their availability." },
        { title: "HR Collaboration", description: "Dedicated interface for HR teams to evaluate, shortlist and communicate with candidates easily." },
        { title: "Detailed Analytics", description: "Dashboards with real-time statistics on applications, performance and conversions." },
        { title: "Smart Notifications", description: "Personalized email and push alerts to keep candidates and HR team informed at every stage." },
      ],
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Recruit faster, smarter",
      steps: [
        { title: "Post your job offer", description: "Create a detailed listing with required skills, necessary experience and company culture." },
        { title: "AI sorts candidates", description: "Our algorithm analyzes CVs, evaluates compatibility and automatically shortlists the best profiles." },
        { title: "Plan and recruit", description: "Propose interview slots, evaluate candidates and hire your new talents in a flash." },
      ],
      stats: {
        timeSaved: "Time Saved",
        matchingPrecision: "Matching Precision",
        aiSupport: "AI Support",
        moreApplications: "More Applications",
      },
    },
    contact: {
      title: "Ready to ",
      subtitle: "transform",
      titleEnd: " your recruitment",
      description: "Request a personalized demo or ask your questions. Our team will get back to you within 24h.",
      name: "Full name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "Subject of your message",
      message: "Message",
      messagePlaceholder: "How can we help you?",
      submit: "Send message",
      sent: "Message sent!",
      phone: "Phone",
      address: "Address",
    },
    footer: {
      description: "Professional IT solutions for individuals and businesses. Transform your recruitment processes with artificial intelligence.",
      recruitment: "Intelligent Recruitment",
      contact: "Contact",
      quickLinks: "Quick Links",
      home: "Home",
      services: "Services",
      about: "About",
      avis: "Reviews",
      rights: "All rights reserved.",
    },
    about: {
      title: "About Us",
      whoWeAre: "Who are we?",
      whoWeAreDesc1: "We are a team of passionate people dedicated to developing high-performance and accessible technological solutions.",
      whoWeAreDesc2: "Our mission: help small and medium enterprises optimize their processes, gain efficiency and succeed in their digital transformation.",
      whoWeAreDesc3: "With solid expertise and a customer-oriented approach, we create modern tools that bring real value to your business.",
      stats: {
        clients: "International Clients",
        projects: "Software Projects Delivered",
        countries: "Countries Served",
        experts: "IT Experts",
      },
      values: {
        title: "Our Values",
        reliability: "Reliability",
        reliabilityDesc: "We offer constant and professional service to guarantee your satisfaction.",
        reactivity: "Reactivity",
        reactivityDesc: "Our technicians intervene quickly to solve your problems.",
        security: "Security",
        securityDesc: "Your data is handled with the utmost rigor and confidentiality.",
      },
      cta: {
        title: "Discover New Opportunities",
        description: "Transform your ideas into high-performance digital solutions. ERP, web and mobile development, artificial intelligence and data analytics.",
        button: "Learn more",
      },
    },
    avisPage: {
      title: "Client Reviews",
      subtitle: "Discover what our clients think about our services",
      reviews: "reviews",
      noReviews: "No reviews yet. Be the first to leave one!",
      giveYour: "Give your",
      opinion: "review",
      description: "Your opinion helps us improve our services",
      name: "Full Name *",
      namePlaceholder: "Your name",
      email: "Email (optional)",
      emailPlaceholder: "john@example.com",
      rating: "Rating *",
      clickToRate: "Click to rate",
      poor: "Poor",
      fair: "Fair",
      good: "Good",
      veryGood: "Very Good",
      excellent: "Excellent",
      comment: "Comment *",
      commentPlaceholder: "Share your experience...",
      submit: "Submit Review",
      submitting: "Submitting...",
      thankYou: "Thank you!",
      successMessage: "Your review was submitted successfully and will be visible after approval.",
      adminReply: "3LMSolutions",
    },
    services: {
      title: "Professional IT ",
      subtitle: "Solutions",
      ia: {
        title: "Artificial Intelligence IA",
        subtitle: "nearshore & offshore",
        description: "Our remote, nearshore and offshore consulting service puts artificial intelligence at the service of your growth.",
        details: [
          { title: "AI Consulting (nearshore & offshore)", items: ["AI Strategy", "AI Solutions Architecture", "Integration and Deployment"] },
          { title: "Agents / MCP Servers Development", items: ["Autonomous Agents", "MCP Servers (Modular, Multi-Agent)", "Systems Integration", "Intelligent Automation"] },
          { title: "Data Intelligence", items: ["Data Engineering", "Data Analytics", "Data Processing and Transformation", "Governance and Quality"] },
          { title: "Machine Learning Solutions", items: ["Predictive Models", "Deep Learning", "Model Optimization and Training", "MLOps and Industrialization"] },
        ],
      },
      web: {
        title: "Web Development",
        subtitle: "Digital Solutions",
        description: "We support businesses in creating, optimizing and developing their digital presence.",
        details: [
          { title: "Website Creation and Evolution", items: ["Showcase, institutional and e-commerce sites", "Redesign and modernization of existing sites", "Functional and technical enhancement"] },
          { title: "Ergonomics & Design", items: ["User-centered UX/UI Design", "Graphic Design and Visual Identity", "User Journey Optimization"] },
          { title: "Hosting & Web Infrastructure", items: ["Secure and Scalable Web Hosting", "Server and Domain Management", "Backups and Security"] },
          { title: "SEO & Visibility", items: ["Natural Referencing (SEO)", "Technical and Editorial Optimization", "Performance Tracking"] },
        ],
      },
      mobile: {
        title: "Mobile Development",
        subtitle: "High-Performance Apps",
        description: "We design and develop high-performance, secure and scalable mobile applications.",
        details: [
          { title: "Mobile Application Development", items: ["iOS Applications (Swift)", "Android Applications (Kotlin)", "Cross-platform Development (Flutter, React Native)"] },
          { title: "Design & Mobile Strategy", items: ["Business and Functional Needs Analysis", "Architecture Definition", "Technology Consulting"] },
          { title: "UX/UI & User Experience", items: ["User-centered Mobile Design", "Interactive Prototyping and Mockups", "Ergonomics Optimization"] },
          { title: "Testing, Deployment & Publishing", items: ["Functional and Performance Testing", "App Store and Google Play Deployment", "Standards Compliance"] },
        ],
      },
      devops: {
        title: "DevOps",
        subtitle: "Automation & CI/CD",
        description: "Our DevOps services focus on automating and industrializing your environments.",
        details: [
          { title: "CI/CD & Automation", items: ["CI/CD Pipeline Design and Optimization", "Automated Builds, Tests and Deployments", "DevOps Workflow Standardization"] },
          { title: "Infrastructure as Code", items: ["Management via Terraform, Ansible, CloudFormation", "Automated Deployment and Configuration", "Replication and Scalability"] },
          { title: "Containerization & Orchestration", items: ["Docker, Kubernetes, Helm", "Cluster and Microservices Management", "Continuous Orchestration and Deployment"] },
          { title: "Monitoring & Observability", items: ["Log Collection and Management (ELK, OpenTelemetry)", "Monitoring (Prometheus, Grafana)", "Proactive Alerting and Supervision"] },
        ],
      },
      erp: {
        title: "ERP Development",
        subtitle: "Custom Software",
        description: "Our custom ERPs are designed to perfectly align with your business needs.",
        details: [
          { title: "ERP Consulting & Framing", items: ["Business Needs Analysis", "Functional and Technical Audit", "Solution and Architecture Definition"] },
          { title: "ERP Design & Integration", items: ["Custom ERP Design", "Software Customization and Configuration", "Integration with Existing Systems"] },
          { title: "ERP Functional Modules", items: ["Production Management", "Supply Chain Management", "Sales and Inventory Management"] },
          { title: "Deployment & Go-Live", items: ["Functional and Technical Testing", "User Acceptance Testing", "Production Deployment"] },
        ],
      },
      data: {
        title: "Data Analytics",
        subtitle: "Data Analytics",
        description: "Our data analytics services transform your raw information into actionable insights.",
        details: [
          { title: "Data Engineering", items: ["Ingestion, Transformation and ETL/ELT Pipelines", "Data Flow Automation and Optimization", "Integration with Existing Systems"] },
          { title: "Data Architecture", items: ["Data Lakes, Data Warehouses and Datamarts", "Data Structuring and Access Optimization", "Scalability and High Availability"] },
          { title: "Analysis & Modeling", items: ["Descriptive, Predictive and Prescriptive Analysis", "ML & Deep Learning Model Development", "Simulation and Decision Scenarios"] },
          { title: "Visualization & Reporting", items: ["Interactive Dashboards (Power BI, Tableau)", "Automated Reporting and KPI Tracking", "Strategic Decision Support"] },
        ],
      },
      iot: {
        title: "IoT",
        subtitle: "Internet of Things",
        description: "We develop intelligent IoT ecosystems to address challenges in health, agriculture and energy.",
        details: [
          { title: "Health & Medical IoT", items: ["Remote Monitoring Devices", "Real-time Biometric Data Collection", "Smart Alerts and Anomaly Detection"] },
          { title: "Smart Agriculture", items: ["Soil Moisture and Quality Monitoring", "Irrigation Optimization", "Climate Tracking and Predictive Analysis"] },
          { title: "Energy & Sustainable Optimization", items: ["Energy Consumption Monitoring", "Loss and Anomaly Detection", "Smart Building Management"] },
          { title: "People & Building Security", items: ["Fall Detection and Connected Alert Buttons", "Secure Geolocation", "AI-Enhanced Video Surveillance"] },
        ],
      },
      cm: {
        title: "Community Management",
        subtitle: "Social Media",
        description: "We create, animate and develop your communities on all your social networks.",
        details: [
          { title: "Social Media Strategy", items: ["Custom Strategy Development", "Editorial Guidelines Definition", "Target and Objectives Identification"] },
          { title: "Content Creation", items: ["Visuals, Videos and Text Design", "Social Network-Adapted Content", "Engagement and Virality Optimization"] },
          { title: "Animation & Moderation", items: ["Daily Community Animation", "Proactive Moderation", "Comments and Messages Response"] },
          { title: "Advertising Campaigns", items: ["Paid Campaigns Management (Facebook, Instagram, LinkedIn)", "Targeting and Optimization", "Detailed Reporting"] },
        ],
      },
      designed: "Designed for Businesses",
      designedDesc: "We are a team of passionate people whose mission is to improve business performance through innovative technological solutions.",
      cta: "Get in Touch",
      stats: {
        clients: "International Clients",
        projects: "Projects Delivered",
        countries: "Countries Served",
        support: "Support Available",
      },
    },
    cta: {
      title: "Designed for Businesses",
      description: "We are a team of passionate people whose mission is to improve business performance through innovative technological solutions. We create high-performance, tailor-made tools to meet your business needs and solve your operational challenges.",
      button: "Get in Touch",
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang && (savedLang === "fr" || savedLang === "en")) {
      setLang(savedLang);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export default function Navigation() {
  const { isDark, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },


    { href: "/avis", label: t.nav.avis },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-theme">
      <div className={`absolute inset-0 backdrop-blur-lg border-b ${isDark ? 'bg-dark-900/95 border-white/10' : 'bg-light-100/95 border-dark-200'}`} />
      
      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src="/13.png" alt="3LMSolutions" className="w-12 h-12" />
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-dark-800'}`}>3LMSolutions</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-primary"
                    : `${isDark ? 'text-white/70' : 'text-dark-600'} hover:text-primary`
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                )}
              </Link>
            ))}
            
            <Link
              href="/#contact"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              {t.nav.contactUs}
            </Link>

            {/* Language Switcher */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isDark ? 'bg-white/10' : 'bg-dark-200'}`}>
              <button
                onClick={() => setLang("fr")}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  lang === "fr" 
                    ? "bg-primary text-white" 
                    : `${isDark ? 'text-white/70 hover:text-white' : 'text-dark-600 hover:text-dark-800'}`
                }`}
              >
                FR
              </button>
              <span className={`text-xs ${isDark ? 'text-white/30' : 'text-dark-400'}`}>/</span>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  lang === "en" 
                    ? "bg-primary text-white" 
                    : `${isDark ? 'text-white/70 hover:text-white' : 'text-dark-600 hover:text-dark-800'}`
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/40 transition-all duration-300"
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-dark-800'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className={`md:hidden absolute top-16 left-0 right-0 py-4 px-6 border-t ${isDark ? 'bg-dark-800 border-white/10' : 'bg-light-200 border-dark-200'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : isDark ? 'text-white' : 'text-dark-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 py-3 text-center bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium"
            >
              {t.nav.contactUs}
            </Link>
            <div className={`flex items-center gap-4 mt-4 ${isDark ? 'text-white' : 'text-dark-800'}`}>
              <button onClick={() => setLang("fr")} className={lang === "fr" ? "text-primary" : ""}>FR</button>
              <button onClick={() => setLang("en")} className={lang === "en" ? "text-primary" : ""}>EN</button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
    );
  }
