import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  GitBranch,
  Menu,
  Sparkles,
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Cable,
  Server,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { useLanguage } from "./i18n/LanguageContext";
import type { Language } from "./i18n/translations";

import "./App.css";
import "./portfolio-redesign.css";

function App() {
  const { language, setLanguage, t } = useLanguage();

  const [menuOpen, setMenuOpen] = useState(false);

  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const reduceMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  const handleContactSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setContactStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      form.reset();
      setContactStatus("success");
    } catch (error) {
      console.error("EmailJS error:", error);
      setContactStatus("error");
    }
  };

  const menuLinks = [
    { href: "#about", label: t.aboutMe },
    { href: "#projects", label: t.projects },
    { href: "#services", label: t.services },
    { href: "#contact", label: t.contact },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : -12,
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.25,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -8,
      transition: {
        duration: reduceMotion ? 0 : 0.18,
      },
    },
  };

  const techGroups = [
    {
      title: t.frontend,
      icon: Code2,
      items: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        "Responsive Design",
      ],
    },
    {
      title: t.backend,
      icon: Database,
      items: [
        "Node.js",
        "Supabase",
        "PostgreSQL",
        "REST APIs",
        "JSON",
        "Authentication",
      ],
    },
    {
      title: t.tools,
      icon: GitBranch,
      items: [
        "Git",
        "GitHub",
        "Vite",
        "Vercel",
        "HTTP / HTTPS",
        "API Integration",
        "Server Deployment",
      ],
    },
  ];

  const services = [
    {
      number: "01",
      icon: <Code2 size={25} />,
      title: t.serviceWebTitle,
      description: t.serviceWebDesc,
    },
    {
      number: "02",
      icon: <Database size={25} />,
      title: t.serviceFullTitle,
      description: t.serviceFullDesc,
    },
    {
      number: "03",
      icon: <Sparkles size={25} />,
      title: t.serviceAiTitle,
      description: t.serviceAiDesc,
    },
    {
      number: "04",
      icon: <Cable size={25} />,
      title: t.serviceApiTitle,
      description: t.serviceApiDesc,
    },
    {
      number: "05",
      icon: <Server size={25} />,
      title: t.serviceServerTitle,
      description: t.serviceServerDesc,
    },
  ];

  const projects = [
    {
      number: "01",
      name: t.projectNamzService,
      description: t.projectNamzServiceDesc,
      url: "https://namz-service.vercel.app",
      visual: "namz-service",
      symbol: "N",
      tags: ["SERVICE", "WEB"],
    },
    {
      number: "02",
      name: t.projectRestoo,
      description: t.projectRestooDesc,
      url: "https://restoo-jade.vercel.app",
      visual: "restoo",
      symbol: "R",
      tags: ["RESTAURANT", "WEB APP"],
    },
    {
      number: "03",
      name: t.projectBaqal,
      description: t.projectBaqalDesc,
      url: "https://baqal-omega.vercel.app",
      visual: "baqal",
      symbol: "B",
      tags: ["GROCERY", "WEB APP"],
    },
    {
      number: "04",
      name: t.projectNamzLog,
      description: t.projectNamzLogDesc,
      url: "https://namz-log.vercel.app",
      visual: "namz-log",
      symbol: "L",
      tags: ["LOGISTICS", "WEB APP"],
    },
  ];

  const whatsappMessage =
    language === "fr"
      ? "Bonjour Achraf Chiro, j'ai découvert votre portfolio et je souhaite discuter d'un projet."
      : language === "ar"
        ? "مرحباً أشرف شيرو، اطلعت على معرض أعمالك وأرغب في مناقشة مشروع معك."
        : "Hello Achraf Chiro, I discovered your portfolio and would like to discuss a project with you.";

  return (
    <main
      className="portfolio"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* NAVIGATION */}

      <header className="navbar">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
        >
          <span className="brand-mark">A.</span>
          <span>
            ACHRAF<span className="brand-dot">.</span>
          </span>
        </a>

        <nav
          className="nav-links"
          aria-label="Main navigation"
        >
          {menuLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div
            className="language-switch"
            aria-label="Choose language"
          >
            {(["fr", "en", "ar"] as Language[]).map((item) => (
              <button
                key={item}
                type="button"
                className={language === item ? "active" : ""}
                onClick={() => {
                  setLanguage(item);
                  closeMenu();
                }}
                aria-pressed={language === item}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <a className="nav-cta" href="#contact">
            {t.contact}
            <ArrowUpRight size={16} />
          </a>

          <button
            className="mobile-menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-menu"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
            >
              {menuLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: language === "ar" ? 10 : -10,
                        }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                    delay: reduceMotion ? 0 : index * 0.045,
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={17} />
                </motion.a>
              ))}

              <a
                className="mobile-menu-contact"
                href="#contact"
                onClick={closeMenu}
              >
                {t.contact}
                <ArrowUpRight size={17} />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="availability">
            <span className="availability-dot" />
            {t.availability}
          </div>

          <p className="eyebrow">
            <Sparkles size={15} />
            {t.role}
          </p>

          <h1>
            {t.heroLine1}
            <br />
            {t.heroLine2} <span>{t.heroHighlight}</span>
            <br />
            {t.heroLine3}
            <span className="accent-dot">.</span>
          </h1>

          <p className="hero-description">
            {t.heroDescription}
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#projects">
              {t.exploreWork}
              <ArrowUpRight size={18} />
            </a>

            <a className="button-secondary" href="#about">
              {t.aboutMe}
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="visual-core">
            <span>A</span>
            <div className="core-caption">
              {t.buildingFuture}
            </div>
          </div>

          <div className="floating-label label-top">
            {t.creativeThinking}
          </div>

          <div className="floating-label label-bottom">
            {t.cleanCode}
          </div>
        </div>

        <a className="scroll-indicator" href="#about">
          <span>{t.scroll}</span>
          <ArrowDown size={15} />
        </a>
      </section>

      {/* INTRODUCTION */}

      <section className="intro-section" id="introduction">
        <p className="section-kicker">
          {t.introduction}
        </p>

        <h2>
          {t.introTitle}
          <br />
          <span>{t.introHighlight}</span>
        </h2>

        <p>{t.introDescription}</p>
      </section>

      {/* ABOUT */}

      <motion.section
        className="about-section"
        id="about"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
        }}
      >
        <div className="section-heading">
          <p className="section-kicker">
            {t.aboutLabel}
          </p>

          <h2>
            {t.aboutTitle}
            <br />
            <span>{t.aboutHighlight}</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <p>{t.aboutDescription}</p>
            <p>{t.aboutSecond}</p>
          </div>

          <div className="about-focus">
            <span className="focus-icon">
              <Sparkles size={20} />
            </span>

            <p className="focus-heading">
              {t.aboutFocus}
            </p>

            <div className="focus-item">
              <span>01</span>
              <p>{t.focusOne}</p>
            </div>

            <div className="focus-item">
              <span>02</span>
              <p>{t.focusTwo}</p>
            </div>

            <div className="focus-item">
              <span>03</span>
              <p>{t.focusThree}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* TECHNOLOGIES */}

      <motion.section
        className="tech-section"
        id="tech-stack"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
        }}
      >
        <div className="section-heading">
          <p className="section-kicker">
            {t.stackLabel}
          </p>

          <h2>
            {t.stackTitle}
            <br />
            <span>{t.stackHighlight}</span>
          </h2>

          <p className="stack-description">
            {t.stackDescription}
          </p>
        </div>

        <div className="tech-grid">
          {techGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.article
                className="tech-card"
                key={group.title}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : index * 0.1,
                }}
              >
                <div className="tech-card-heading">
                  <span className="tech-icon">
                    <Icon size={21} />
                  </span>

                  <h3>{group.title}</h3>
                </div>

                <div className="tech-tags">
                  {group.items.map((item) => (
                    <span className="tech-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* PROJECTS */}

      <motion.section
        className="projects-section"
        id="projects"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
        }}
      >
        <div className="section-heading">
          <p className="section-kicker">
            {t.projectsLabel}
          </p>

          <h2>
            {t.projectsTitle}
            <br />
            <span>{t.projectsHighlight}</span>
          </h2>

          <p className="projects-description">
            {t.projectsDescription}
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.name}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
            >
              <a
                className={`project-visual project-visual--${project.visual}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — ${t.liveDemo}`}
              >
                <span className="project-visual-number">
                  PROJECT / {project.number}
                </span>

                <span className="project-visual-symbol">
                  {project.symbol}
                </span>

                <span className="project-visual-name">
                  {project.name}
                </span>

                <span className="project-visual-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </a>

              <div className="project-content">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3>{project.name}</h3>
                <p>{project.description}</p>

                <a
                  className="project-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.viewProject}
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* SERVICES */}

      <motion.section
        className="services-section"
        id="services"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
        }}
      >
        <div className="section-heading">
          <p className="section-kicker">
            {t.serviceLabel}
          </p>

          <h2>
            {t.serviceTitle}
            <br />
            <span>{t.serviceHighlight}</span>
          </h2>

          <p className="services-description">
            {t.serviceDescription}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.article
              className="service-card"
              key={service.number}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 22 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
            >
              <div className="service-card-top">
                <span className="service-icon">
                  {service.icon}
                </span>

                <span className="service-number">
                  {service.number}
                </span>
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className="service-card-line" />
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* CONTACT */}

      <motion.section
        className="contact-section"
        id="contact"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
        }}
      >
        <div className="contact-container">
          <div className="contact-heading">
            <p className="section-kicker">
              {t.contactLabel}
            </p>

            <h2>
              {t.contactTitle}
              <br />
              <span>{t.contactHighlight}</span>
            </h2>

            <p className="contact-description">
              {t.contactDescription}
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >
            <div className="contact-fields">
              <label>
                <span>{t.contactName}</span>

                <input
                  type="text"
                  name="name"
                  placeholder={t.contactName}
                  required
                  maxLength={100}
                />
              </label>

              <label>
                <span>{t.contactEmail}</span>

                <input
                  type="email"
                  name="email"
                  placeholder={t.contactEmail}
                  required
                  maxLength={150}
                />
              </label>
            </div>

            <label>
              <span>{t.contactSubject}</span>

              <input
                type="text"
                name="subject"
                placeholder={t.contactSubject}
                required
                maxLength={150}
              />
            </label>

            <label>
              <span>{t.contactMessage}</span>

              <textarea
                name="message"
                placeholder={t.contactMessage}
                rows={6}
                required
                maxLength={5000}
              />
            </label>

            <button
              className="contact-submit"
              type="submit"
              disabled={contactStatus === "sending"}
            >
              {contactStatus === "sending" ? (
                t.contactSending
              ) : (
                <>
                  {t.contactSend}
                  <Send size={17} />
                </>
              )}
            </button>

            {contactStatus === "success" && (
              <p
                className="contact-feedback success"
                role="status"
              >
                <CheckCircle2 size={18} />

                {language === "fr"
                  ? "Message envoyé avec succès !"
                  : language === "ar"
                    ? "تم إرسال الرسالة بنجاح!"
                    : "Message sent successfully!"}
              </p>
            )}

            {contactStatus === "error" && (
              <p
                className="contact-feedback error"
                role="alert"
              >
                <AlertCircle size={18} />

                {language === "fr"
                  ? "Échec de l'envoi. Veuillez réessayer."
                  : language === "ar"
                    ? "تعذر إرسال الرسالة. حاول مرة أخرى."
                    : "Message could not be sent. Please try again."}
              </p>
            )}

            <p className="contact-note">
              {t.contactNote}
            </p>
          </form>
        </div>
      </motion.section>

      {/* WHATSAPP */}

      <a
        className="whatsapp-float"
        href={`https://wa.me/212639683870?text=${encodeURIComponent(
          whatsappMessage,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={25} strokeWidth={2.2} />
        <span>WhatsApp</span>
      </a>
    </main>
  );
}

export default App;