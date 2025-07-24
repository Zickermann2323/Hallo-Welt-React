import React from 'react';
import BallGame from 'components/BallGame';
import { Helmet } from 'react-helmet';

export default function HomePage() {
  return (
    <article>
      <Helmet>
        <title>Ball Game</title>
        <meta name="description" content="Simple ball guessing game" />
      </Helmet>
      <BallGame />
    </article>
  );
}

