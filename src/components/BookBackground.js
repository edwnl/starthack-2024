import React from 'react';

const BookIcon = ({ style }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const BookBackground = () => {
  const books = [
    { top: '10%', left: '25%', rotate: '-15deg' },
    { top: '20%', left: '70%', rotate: '10deg' },
    { top: '50%', left: '20%', rotate: '5deg' },
    { top: '70%', left: '75%', rotate: '-10deg' },
    { top: '85%', left: '40%', rotate: '20deg' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {books.map((book, index) => (
        <BookIcon
          key={index}
          style={{
            position: 'absolute',
            top: book.top,
            left: book.left,
            transform: `rotate(${book.rotate})`,
            opacity: 0.1,
          }}
        />
      ))}
    </div>
  );
};

export default BookBackground;