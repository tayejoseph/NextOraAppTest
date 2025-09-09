import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer Component", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 NextJS Landing Page/)).toBeInTheDocument();
  });

  it("renders built with text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Built with ❤️ using Next.js and TypeScript/)
    ).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    render(<Footer />);
    const footer = screen
      .getByText(/© 2024 NextJS Landing Page/)
      .closest("footer");
    expect(footer).toHaveClass("footer");
  });

  it("renders all footer content", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Check that both paragraphs are rendered
    const paragraphs = screen.getAllByText(/NextJS Landing Page|Built with/);
    expect(paragraphs).toHaveLength(2);
  });
});
