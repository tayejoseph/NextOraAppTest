export default function Features() {
  const features = [
    {
      icon: "🚀",
      title: "Fast Performance",
      description:
        "Lightning-fast loading times and optimized performance for the best user experience.",
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime guarantee for your peace of mind.",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description:
        "Perfectly designed for all devices, from mobile phones to desktop computers.",
    },
    {
      icon: "⚡",
      title: "Easy Integration",
      description:
        "Simple APIs and comprehensive documentation for seamless integration.",
    },
    {
      icon: "🌍",
      title: "Global Scale",
      description:
        "Deploy anywhere in the world with our global CDN and edge locations.",
    },
    {
      icon: "💡",
      title: "24/7 Support",
      description:
        "Round-the-clock support from our expert team to help you succeed.",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            data-testid={`feature-card-${index}`}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
