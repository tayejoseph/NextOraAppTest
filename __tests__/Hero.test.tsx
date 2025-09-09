import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "@/components/Hero";

describe("Hero Component", () => {
  it("renders the hero title", () => {
    render(<Hero />);
    expect(
      screen.getByText("Welcome to Our Amazing Platform")
    ).toBeInTheDocument();
  });

  it("renders the hero subtitle", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Build, deploy, and scale your applications/)
    ).toBeInTheDocument();
  });

  it("renders the CTA button with correct initial text", () => {
    render(<Hero />);
    const button = screen.getByTestId("cta-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Get Started Today");
  });

  it("changes button text when clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const button = screen.getByTestId("cta-button");
    await user.click(button);

    expect(button).toHaveTextContent("Thanks for clicking!");
  });

  it("reverts button text after 2 seconds", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const button = screen.getByTestId("cta-button");
    await user.click(button);

    expect(button).toHaveTextContent("Thanks for clicking!");

    await waitFor(
      () => {
        expect(button).toHaveTextContent("Get Started Today");
      },
      { timeout: 3000 }
    );
  });

  it("has correct CSS classes", () => {
    render(<Hero />);
    const heroSection = screen
      .getByText("Welcome to Our Amazing Platform")
      .closest("section");
    expect(heroSection).toHaveClass("hero-section");

    const button = screen.getByTestId("cta-button");
    expect(button).toHaveClass("cta-button");
  });
});
