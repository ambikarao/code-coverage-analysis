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

  // test('renders all company statistics', () => {
  //   render(<About />);
    
  //   // Check statistics values
  //   expect(screen.getByText('10+')).toBeInTheDocument();
  //   expect(screen.getByText('50+')).toBeInTheDocument();
  //   expect(screen.getByText('200+')).toBeInTheDocument();
  //   expect(screen.getByText('98%')).toBeInTheDocument();
    
  //   // Check statistics labels
  //   expect(screen.getByText('Years in Business')).toBeInTheDocument();
  //   expect(screen.getByText('Team Members')).toBeInTheDocument();
  //   expect(screen.getByText('Projects Completed')).toBeInTheDocument();
  //   expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();
    
  //   // Check statistics descriptions
  //   expect(screen.getByText('Over a decade of experience')).toBeInTheDocument();
  //   expect(screen.getByText('Dedicated professionals')).toBeInTheDocument();
  //   expect(screen.getByText('Successful deliveries')).toBeInTheDocument();
  //   expect(screen.getByText('Happy customers')).toBeInTheDocument();
  // });

  // test('renders team section with title', () => {
  //   render(<About />);
    
  //   expect(screen.getByText('Our Team')).toBeInTheDocument();
  // });

  // test('renders all team members with correct data', () => {
  //   render(<About />);
    
  //   // Check if all team members are rendered
  //   expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
  //   expect(screen.getByText('Mike Chen')).toBeInTheDocument();
  //   expect(screen.getByText('Emily Davis')).toBeInTheDocument();
  //   expect(screen.getByText('David Rodriguez')).toBeInTheDocument();
  //   expect(screen.getByText('Lisa Thompson')).toBeInTheDocument();
  //   expect(screen.getByText('James Miller')).toBeInTheDocument();
  // });

  test('team member cards display correct information', () => {
    render(<About />);
    
    // Check Sarah Wilson's information appears on screen
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('Executive')).toBeInTheDocument();
    expect(screen.getByText('Experience: 15 years (Senior)')).toBeInTheDocument();

    // Check Mike Chen's information appears on screen
    expect(screen.getByText('CTO')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Experience: 12 years (Senior)')).toBeInTheDocument();
  });

  // test('renders correct number of team members', () => {
  //   render(<About />);
    
  //   const teamCards = screen.getAllByText(/Experience:/);
  //   expect(teamCards).toHaveLength(6);
  // });

  // test('experience level calculation works correctly', () => {
  //   render(<About />);
    
  //   // Senior level (10+ years)
  //   expect(screen.getByText('Experience: 15 years (Senior)')).toBeInTheDocument();
  //   expect(screen.getByText('Experience: 12 years (Senior)')).toBeInTheDocument();
  //   expect(screen.getByText('Experience: 10 years (Senior)')).toBeInTheDocument();
    
  //   // Mid-level (5-9 years)
  //   expect(screen.getByText('Experience: 8 years (Mid-level)')).toBeInTheDocument();
  //   expect(screen.getByText('Experience: 7 years (Mid-level)')).toBeInTheDocument();
  //   expect(screen.getByText('Experience: 9 years (Mid-level)')).toBeInTheDocument();
  // });

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
