import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import BeerDetailPopover from './BeerDetailPopover'; 
import { IBeer } from '@/types';


describe('BeerDetailPopover', () => {
  const mockBeer: IBeer = {
    name: 'Corona',
    price: 100,
    description: 'A light and refreshing beer.',
    image: '/images/corona.png',
    quantity: 1,
    rating: 4.5,
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<BeerDetailPopover beer={mockBeer} onClose={mockOnClose} />);
  });

  it('should render beer details correctly', () => {
    // Verificar que el nombre de la cerveza se renderiza
    expect(screen.getByText('Corona')).toBeInTheDocument();

    // Verificar que la descripción de la cerveza se renderiza
    expect(screen.getByText('A light and refreshing beer.')).toBeInTheDocument();

    // Verificar que la imagen de la cerveza se renderiza
    expect(screen.getByAltText('Corona')).toHaveAttribute('src', '/images/corona.png');
  });

  it('should display the initial quantity as 1', () => {
    // Verificar que la cantidad inicial es 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should increase the quantity when clicking + button', () => {
    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    // Verificar que la cantidad aumentó a 2
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should decrease the quantity when clicking - button', () => {
    const decreaseButton = screen.getByText('−');
    fireEvent.click(decreaseButton);

    // Verificar que la cantidad disminuyó a 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should not decrease quantity below 1', () => {
    const decreaseButton = screen.getByText('−');
    fireEvent.click(decreaseButton);
    fireEvent.click(decreaseButton);

    // Verificar que la cantidad no baje de 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should call onClose when clicking the close button', () => {
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    // Verificar que onClose haya sido llamado
    expect(mockOnClose).toHaveBeenCalled();
  });
});