import { render, screen } from "@testing-library/react";
import Features from "@/components/Features";

describe("Features Component", () => {
  it("renders all feature cards", () => {
    render(<Features />);

    // Check that all 6 feature cards are rendered
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`feature-card-${i}`)).toBeInTheDocument();
    }
  });

  it("renders feature titles", () => {
    render(<Features />);

    const expectedTitles = [
      "Fast Performance",
      "Secure & Reliable",
      "Mobile Responsive",
      "Easy Integration",
      "Global Scale",
      "24/7 Support",
    ];

    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders feature icons", () => {
    render(<Features />);

    const expectedIcons = ["🚀", "🔒", "📱", "⚡", "🌍", "💡"];

    expectedIcons.forEach((icon) => {
      expect(screen.getByText(icon)).toBeInTheDocument();
    });
  });

  it("renders feature descriptions", () => {
    render(<Features />);

    expect(
      screen.getByText(/Lightning-fast loading times/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Enterprise-grade security/)).toBeInTheDocument();
    expect(
      screen.getByText(/Perfectly designed for all devices/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Simple APIs and comprehensive documentation/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Deploy anywhere in the world/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Round-the-clock support/)).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    render(<Features />);

    const featuresSection = screen
      .getByTestId("feature-card-0")
      .closest("section");
    expect(featuresSection).toHaveClass("features-section");

    const firstCard = screen.getByTestId("feature-card-0");
    expect(firstCard).toHaveClass("feature-card");
  });

  it("renders features in correct order", () => {
    render(<Features />);

    const cards = screen.getAllByTestId(/feature-card-/);
    expect(cards).toHaveLength(6);

    // Check that cards are in the correct order by checking their content
    expect(cards[0]).toHaveTextContent("Fast Performance");
    expect(cards[1]).toHaveTextContent("Secure & Reliable");
    expect(cards[2]).toHaveTextContent("Mobile Responsive");
    expect(cards[3]).toHaveTextContent("Easy Integration");
    expect(cards[4]).toHaveTextContent("Global Scale");
    expect(cards[5]).toHaveTextContent("24/7 Support");
  });
});
