import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About Component', () => {
  test('renders about page with title and description', () => {
    render(<About />);
    
    expect(screen.getByText('About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<About />);
    
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
  });

  test('renders company statistics section', () => {
    render(<About />);
    
    expect(screen.getByText('Company Statistics')).toBeInTheDocument();
  });

  test('team member cards display correct information', () => {
    render(<About />);
    
    // Check Sarah Wilson's card
    const sarahCard = screen.getByText('Sarah Wilson').closest('div');
    expect(sarahCard).toHaveTextContent('CEO');
    expect(sarahCard).toHaveTextContent('Executive');
    expect(sarahCard).toHaveTextContent('Experience: 15 years (Senior)');
    
    // Check Mike Chen's card
    const mikeCard = screen.getByText('Mike Chen').closest('div');
    expect(mikeCard).toHaveTextContent('CTO');
    expect(mikeCard).toHaveTextContent('Technology');
    expect(mikeCard).toHaveTextContent('Experience: 12 years (Senior)');
  });

  test('renders company mission section', () => {
    render(<About />);
    
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
  });

  // test('renders company mission description', () => {
  //   render(<About />);
    
  //   const missionText = screen.getByText(/We are dedicated to creating innovative solutions/);
  //   expect(missionText).toBeInTheDocument();
  //   expect(missionText).toHaveTextContent(
  //     'We are dedicated to creating innovative solutions that help businesses grow and succeed. Our team of experienced professionals works tirelessly to deliver high-quality products and services that exceed our clients\' expectations.'
  //   );
  // });

  // test('statistics cards have correct structure', () => {
  //   render(<About />);
    
  //   const statCards = screen.getAllByText(/Years in Business|Team Members|Projects Completed|Client Satisfaction/);
  //   expect(statCards).toHaveLength(4);
    
  //   // Check if each stat card has the correct class
  //   const statCardElements = screen.getAllByText(/10\+|50\+|200\+|98%/);
  //   statCardElements.forEach(card => {
  //     expect(card.closest('div')).toHaveClass('stat-card');
  //   });
  // });

  // test('team cards have correct structure', () => {
  //   render(<About />);
    
  //   const teamCards = screen.getAllByText(/Sarah Wilson|Mike Chen|Emily Davis|David Rodriguez|Lisa Thompson|James Miller/);
  //   expect(teamCards).toHaveLength(6);
    
  //   // Check if each team card has the correct class
  //   teamCards.forEach(card => {
  //     expect(card.closest('div')).toHaveClass('team-card');
  //   });
  // });

  test('navigation buttons are clickable', () => {
    render(<About />);
    
    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');
    
    expect(homeButton).toBeEnabled();
    expect(productsButton).toBeEnabled();
  });

  // test('navigation functions are called when buttons are clicked', () => {
  //   render(<About />);
    
  //   const homeButton = screen.getByText('Go to Home');
  //   const productsButton = screen.getByText('Go to Products');
    
  //   fireEvent.click(homeButton);
  //   fireEvent.click(productsButton);
    
  //   // The mock navigate function should be called
  //   // We can't test the actual navigation in this mock setup
  //   expect(homeButton).toBeInTheDocument();
  //   expect(productsButton).toBeInTheDocument();
  // });

  // xtest('component structure is correct', () => {
  //   render(<About />);
    
  //   // Check main container
  //   const mainContainer = screen.getByText('About Our Company').closest('div');
  //   expect(mainContainer).toHaveClass('about-container');
    
  //   // Check navigation buttons container
  //   const navContainer = screen.getByText('Go to Home').closest('div');
  //   expect(navContainer).toHaveClass('navigation-buttons');
    
  //   // Check company stats section
  //   const statsSection = screen.getByText('Company Statistics').closest('div');
  //   expect(statsSection).toHaveClass('company-stats');
    
  //   // Check team section
  //   const teamSection = screen.getByText('Our Team').closest('div');
  //   expect(teamSection).toHaveClass('team-section');
    
  //   // Check company description
  //   const descriptionSection = screen.getByText('Our Mission').closest('div');
  //   expect(descriptionSection).toHaveClass('company-description');
  // });
});
