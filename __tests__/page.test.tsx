import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock the components to avoid complex rendering
jest.mock("@/components/Hero", () => {
  return function MockHero() {
    return <div data-testid="hero-component">Hero Component</div>;
  };
});

jest.mock("@/components/Features", () => {
  return function MockFeatures() {
    return <div data-testid="features-component">Features Component</div>;
  };
});

jest.mock("@/components/Footer", () => {
  return function MockFooter() {
    return <div data-testid="footer-component">Footer Component</div>;
  };
});

describe("Home Page", () => {
  it("renders all main components", () => {
    render(<Home />);

    expect(screen.getByTestId("hero-component")).toBeInTheDocument();
    expect(screen.getByTestId("features-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
  });

  it("renders components in correct order", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    const children = Array.from(main.children);

    expect(children[0]).toHaveAttribute("data-testid", "hero-component");
    expect(children[1]).toHaveAttribute("data-testid", "features-component");
    expect(children[2]).toHaveAttribute("data-testid", "footer-component");
  });
});
