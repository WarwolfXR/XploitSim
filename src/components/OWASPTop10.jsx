import React from 'react';
import styles from './OWASP.module.css'; // Import CSS Module

const OWASPTop10 = () => {
  const vulnerabilities = [
    {
      id: 1,
      name: "Broken Access Control",
      description: "Restrictions on what authenticated users are allowed to do are not properly enforced, allowing attackers to access unauthorized functionality or data.",
      link: "./broken-access-control",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      name: "Cryptographic Failures",
      description: "Failures related to cryptography which often lead to exposure of sensitive data like passwords, credit cards, and health records.",
      link: "./cryptographic-failures",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      name: "Injection",
      description: "Untrusted data is sent to an interpreter as part of a command or query, leading to data loss, corruption, or unauthorized access.",
      link: "./injection",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    },
    {
      id: 4,
      name: "Insecure Design",
      description: "Missing or ineffective control design that fails to prevent security flaws before implementation.",
      link: "./insecure-design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    },
    {
      id: 5,
      name: "Security Misconfiguration",
      description: "Insecure configurations in any part of the application stack, from network services to platform settings.",
      link: "./security-misconfiguration",
      image: "https://images.unsplash.com/photo-1563013541-2d2c1c5b1a15?w=400&h=250&fit=crop",
    },
    {
      id: 6,
      name: "Vulnerable Components",
      description: "Using components with known vulnerabilities that can be exploited to compromise applications.",
      link: "./vulnerable-components",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop",
    },
    {
      id: 7,
      name: "Authentication Failures",
      description: "Broken authentication mechanisms that allow credential stuffing, brute force, and session hijacking attacks.",
      link: "./authentication-failures",
      // FIX: Changed the image URL to be different from Security Misconfiguration
      image: "https://images.unsplash.com/photo-1573495627361-ab2b80860cf1?w=400&h=250&fit=crop",
    },
    {
      id: 8,
      name: "Software & Data Integrity",
      description: "Failures related to software updates, critical data, and CI/CD pipelines without integrity verification.",
      link: "./software-data-integrity",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    },
    {
      id: 9,
      name: "Security Logging Failures",
      description: "Failures in logging, monitoring, and incident response capabilities that prevent threat detection.",
      link: "./security-logging-failures",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    },
    {
      id: 10,
      name: "Server-Side Request Forgery",
      description: "Web applications that fetch remote resources without validating user-supplied URLs.",
      link: "./server-side-request-forgery",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop",
    }
  ];

  const VulnerabilityCard = ({ vulnerability }) => {
    return (
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <img
            src={vulnerability.image}
            alt={vulnerability.name}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x200/667eea/ffffff?text=Security+${vulnerability.id}`;
            }}
          />
          <div className={styles.cardOverlay}>
            <div className={styles.cardNumber}>
              {vulnerability.id}
            </div>
          </div>
        </div>

        <div className={styles.cardContent}>
          <h3 className={`${styles.cardTitle} ${styles.lineClamp2}`}>
            {vulnerability.name}
          </h3>

          <p className={`${styles.cardDescription} ${styles.lineClamp3}`}>
            {vulnerability.description}
          </p>

          <a
            href={vulnerability.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            Learn More
            <svg className={styles.linkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            OWASP Top 10 Vulnerabilities
          </h1>
          <p className={styles.subtitle}>
            The most critical web application security risks identified by the Open Web Application Security Project
          </p>
        </div>

        {/* First Row - 5 cards */}
        <div className={styles.row}>
          {vulnerabilities.slice(0, 5).map((vuln) => (
            <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
          ))}
        </div>

        {/* Second Row - 5 cards */}
        <div className={styles.row}>
          {vulnerabilities.slice(5, 10).map((vuln) => (
            <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OWASPTop10;