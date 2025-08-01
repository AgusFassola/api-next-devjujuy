'use client';

import { useEffect, useState } from "react";
import { Character, charactersAPIResponse } from "./types/character";
import Link from "next/link";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const fetchCharacters = async (page: number) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data: charactersAPIResponse = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    }

  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Characters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map(character => (
          <Link href={`/character/${character.id}`} key={character.id} className="block">
            <div key={character.id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold">{character.name}</h2>
              <p className="text-sm text-gray-400">Status: {character.status}</p>
              <p className="text-sm text-gray-400">Species: {character.species}</p>
              <img src={character.image} alt={character.name} className="w-full rounded mb-2" />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}
          className=" disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >Back</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}
          className=" disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >Next</button>
      </div>
    </div>
  );
    
}
