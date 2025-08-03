'use client';

import { useEffect, useState } from "react";
import { Character } from "./types/character";
import CharacterCard from "@/components/CharacterCard";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  


  useEffect(() => {
    const fetchCharacters = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${search}`);
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    }
  };
  
    fetchCharacters();
  }, [page, search]);

  const handleNextPage = () => {
        setPage((p) => p+1)
  };

  const handlePreviousPage = () => {
        setPage((p) => Math.max(p-1,1))
  };  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Characters</h1>
      <input
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={(e) =>{
          setPage(1);
          setSearch(e.target.value)
          }
        }
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <button onClick={handlePreviousPage} disabled={page === 1}
          className=" disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >Back</button>
        <span> Page {page} </span>
        <button onClick={handleNextPage}
          className=" disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >Next</button>
      </div>
    </div>
  );
    
}
