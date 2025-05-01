import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for extended matchers
import BeerCard from './BeerCard'; 
import { IOrderItem } from '@/types';

describe('BeerCard', () => {
  const item: IOrderItem = {
    name: 'Corona',
    quantity: 2,
  };

  it('Show the beer name and quantity.', () => {
    render(<BeerCard item={item} />);
    
    expect(screen.getByText('Corona')).toBeInTheDocument();

  
    expect(screen.getByText('x2')).toBeInTheDocument();
  });
});