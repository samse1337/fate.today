import { useState, useEffect } from 'react';

export default function WelcomeScreen() {
  const [stage, setStage] = useState<'entering' | 'visible' | 'exiting' | 'done'>('entering');

  useEffect(() => {
    const visibleTimer = setTimeout(() => {
      setStage('visible');
    }, 100);

    const exitTimer = setTimeout(() => {
      setStage('exiting');
    }, 2500);

    const doneTimer = setTimeout(() => {
      setStage('done');
    }, 3500);

    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <div className={`hello-screen ${stage === 'exiting' ? 'exiting' : ''}`}>
      <h1 className={`hello-text ${stage === 'visible' || stage === 'exiting' ? 'visible' : ''}`}>
        hello
      </h1>
    </div>
  );
}
