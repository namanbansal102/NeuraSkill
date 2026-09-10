import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">BotChain Network Video</h1>
      <iframe width="968" height="545" src="https://www.youtube.com/embed/aeKNok4fKEs" title="Neuraskill"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
    </div>
  );
};

export default Page;
