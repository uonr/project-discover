import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Schema {
  language: string;
  stars: number;
  excludeBlockChain: boolean;
}

function makeGitHubSearch({ language, stars, excludeBlockChain }: Schema) {
  let search = `https://github.com/search?q=language:${language} stars:>${stars} sort:updated `;
  if (excludeBlockChain) {
    search += 'NOT blockchain NOT wallet NOT nft NOT "Smart Contract" NOT web3';
  }
  return search.replace(' ', '+');
}

function App() {
  const { register, handleSubmit } = useForm<Schema>({
    defaultValues: { language: 'rust', stars: 16, excludeBlockChain: true },
  });

  const onSubmit = (data: Schema) => {
    const url = makeGitHubSearch(data);
    window.open(url, '_blank');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between py-2 px-4 border-b items-center">
        <div>
          <label htmlFor="language">Lanuage:</label>
          <input id="language" className="border p-1 rounded ml-2" {...register('language', { required: true })} />
        </div>
        <div>
          <label htmlFor="stars">Minium stars:</label>
          <input type="number" className="border p-1 rounded ml-2" id="stars" {...register('stars')} />
        </div>
        <div>
          <label>
            Exclude block chain related projects
            <input className="ml-2" type="checkbox" {...register('excludeBlockChain')} />
          </label>
        </div>
        <div>
          <button
            className="bg-green-600 text-white rounded py-1 px-2 hover:bg-green-500 active:bg-green-700"
            type="submit"
          >
            search
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
