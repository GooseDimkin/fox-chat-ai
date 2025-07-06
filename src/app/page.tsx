import React from "react";
import styles from "./page.module.scss";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const plans = [
  {
    name: "Starter",
    price: "$19/mo",
    features: ["1 bot consultant", "Email Support", "Basic reports"],
  },
  {
    name: "Pro",
    price: "$49/mo",
    features: ["Up to 5 bots", "Priority support", "Advanced reports"],
  },
  {
    name: "Enterprise",
    price: "On request",
    features: ["Unlimited bots", "Personal manager", "Integrations"],
  },
];

const industries = [
  {
    title: "E-commerce",
    desc: "Automation of sales and customer support",
  },
  { title: "Finance", desc: "Consultations and assistance with products" },
  { title: "Real estate", desc: "Support for buyers and tenants" },
  { title: "Education", desc: "Help for students and teachers" },
];

const HomePage: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src="images/logo.png" alt="BotNestAI" />
        <nav>
          <a href="#industries">Industries</a>
          <a href="#plans">Plans</a>
          <a href="#contact">Contacts</a>
        </nav>
        <nav>
          <SignedOut>
            <div className={styles.buttonsWrapper}>
              <SignInButton>
                <button className={styles.signInButton}>Sign in</button>
              </SignInButton>
              <SignUpButton>
                <button className={styles.signUpButton}>Sign Up</button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2>Intelligent Consultant Bots for Your Business</h2>
          <p>
            Automate customer communication and increase sales with AI bots for
            any industry.
          </p>
          <button className={styles.ctaButton}>Start now</button>
        </div>
      </section>

      <section id="industries" className={styles.industries}>
        <h3>What industries are our bots suitable for</h3>
        <div className={styles.industriesGrid}>
          {industries.map((industry) => (
            <div key={industry.title} className={styles.industryCard}>
              <h4>{industry.title}</h4>
              <p>{industry.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="plans" className={styles.plans}>
        <h3>Choose a plan</h3>
        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <div key={plan.name} className={styles.planCard}>
              <h4>{plan.name}</h4>
              <p className={styles.planPrice}>{plan.price}</p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className={styles.ctaButtonOutline}>Select</button>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className={styles.footer}>
        <p>© 2025 FoxChat.ai — All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
