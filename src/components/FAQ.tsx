import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'How do I add items to my cart?',
      answer: 'Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.'
    },
    {
      question: 'How can I view my cart?',
      answer: 'Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and other digital payment methods.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is confirmed, you can track it from your profile section under "Order History".'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Please check individual product details for specific return information.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        Frequently Asked Questions
      </h1>
      {faqItems.map((item, index) => (
        <div
          key={item.question}
          style={{
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <button
            onClick={() => toggleAccordion(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(index);
              }
            }}
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              textAlign: 'left'
            }}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 style={{ margin: 0 }}>{item.question}</h3>
            <span aria-hidden="true">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div id={`faq-answer-${index}`} style={{ padding: '1rem', backgroundColor: '#fff' }}>
              <p style={{ margin: 0 }}>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
