import { render, screen } from '@testing-library/react';

function Demo() {
  return <h1>Hello, Manassé</h1>;
}

test('affiche un message', () => {
  render(<Demo />);
  expect(screen.getByText('Hello, Manassé')).toBeInTheDocument();
});
