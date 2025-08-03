'use client';

import { useEffect, useState } from "react";
import { Character } from "./types/character";
import CharacterCard from "@/components/CharacterCard";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchCharacters = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${search}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("No characters found");
          setCharacters([]);
          setHasNextPage(false);
          setHasPrevPage(false);
          return;
        }
        throw new Error("Failed to fetch characters");
      }
      
      const data = await response.json();
      setTotalPages(data.info?.pages || 1);
      setCharacters(data.results);
      setHasNextPage(!!data.info?.next);
      setHasPrevPage(!!data.info?.prev);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      setError("Error fetching characters");
      setCharacters([]);
      setHasNextPage(false);
      setHasPrevPage(false);
    } finally {
      setLoading(false);
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

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && !loading && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { !loading && characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      {!loading && characters.length >0 && (
        <div className="flex justify-center mt-6 gap-4">
          <button onClick={handlePreviousPage} disabled={!hasPrevPage}
            className=" disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >Back</button>
          <span> Page {page} / {totalPages} </span>
          <button onClick={handleNextPage} disabled={!hasNextPage}
            className=" disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >Next</button>
        </div>
      ) }
      
    </div>
  );
    
}
