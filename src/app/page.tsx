"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/_elements/button/button";
import Register from "@/components/register/register";
import Modal from "@/components/_elements/modal/modal";

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
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <div className={styles.app}>
        <header className={styles.header}>
          <img src="images/logo.png" alt="BotNestAI" />
          <nav>
            <a href="#industries">Industries</a>
            <a href="#plans">Plans</a>
            <a href="#contact">Contacts</a>
          </nav>
          <nav>
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.signInButton}
                onClick={() => setIsLoginOpen(true)}
              >
                Sign in
              </button>
              <Button size="small" onClick={() => setIsRegisterOpen(true)}>
                Sign Up
              </Button>
            </div>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h2>Intelligent Consultant Bots for Your Business</h2>
            <p>
              Automate customer communication and increase sales with AI bots
              for any industry.
            </p>
            <Button size="large" width="auto">
              Get started — it's free
            </Button>
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
                <Button size="medium">Select</Button>
              </div>
            ))}
          </div>
        </section>

        <footer id="contact" className={styles.footer}>
          <p>© 2025 FoxChat.ai — All rights reserved.</p>
        </footer>
      </div>
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Register"
      >
        <Register />
      </Modal>
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Sign In"
      >
        <div>Login form here</div>
      </Modal>
    </>
  );
};

export default HomePage;
