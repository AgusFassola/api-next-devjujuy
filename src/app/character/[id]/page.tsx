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
        <div className="p-6 ">
            <div className="flex flex-col items-start gap-6 md:flex-row">
                <img src={character.image} alt={character.name} className="w-full rounded mb-4" />
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

        </div>
    );
}
