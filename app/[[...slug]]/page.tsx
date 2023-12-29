'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../src/custom_pages/app'), { ssr: false });

export default function Page() {
  return <App />;
}
