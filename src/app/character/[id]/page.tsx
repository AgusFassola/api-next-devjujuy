import { Character } from "@/app/types/character";
import Link from "next/link";
type Params = {
  params: {
    id: string;
  };
};

export default async function CharacterPage({ params }: Params) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch character data");
  }
    const character: Character = await res.json();
    return (
        <main className="p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 bg-zinc-800 rounded-xl shadow">
                <img src={character.image} alt={character.name} className="w-64 h-64 rounded-xl object-cover mb-4" />
                <div>
                    <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
                    <p className="text-sm text-gray-400"><strong>Status:</strong> {character.status}</p>
                    <p className="text-sm text-gray-400"><strong>Species:</strong> {character.species}</p>
                    <p className="text-sm text-gray-400"><strong>Gender:</strong> {character.gender}</p>
                    <p className="text-sm text-gray-400"><strong>Origin:</strong> {character.origin.name}</p>
                    <p className="text-sm text-gray-400"><strong>Location:</strong> {character.location.name}</p>
                    <p className="text-sm text-gray-400"><strong>Created:</strong> {new Date(character.created).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400"><strong>Episodes:</strong> {character.episode.length}</p>
                    <button
                        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    ><Link href={"/"} >Back</Link></button>
                </div>
            </div>

        </main>
    );
}
