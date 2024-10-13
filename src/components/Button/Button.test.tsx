import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders text', () => {
    render(<Button>Test</Button>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies the circular class when isCircular is true', () => {
    render(<Button isCircular={true}>Circular Button</Button>);

    const button = screen.getByText('Circular Button');
    expect(button).toHaveClass('button--circular');
  });

  it('does not apply the circular class when isCircular is false', () => {
    render(<Button isCircular={false}>Normal Button</Button>);

    const button = screen.getByText('Normal Button');
    expect(button).not.toHaveClass('button--circular');
  });

  it('triggers onClick when the button is clicked', () => {
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}>Clickable Button</Button>);

    const button = screen.getByText('Clickable Button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly when no children are provided', () => {
    render(<Button />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
