import React from 'react'
import { Character } from "@/app/types/character";
import Link from "next/link";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Link href={`/character/${character.id}`} key={character.id} className="block">
            <div key={character.id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold">{character.name}</h2>
              <p className="text-sm text-gray-400">Status: {character.status}</p>
              <p className="text-sm text-gray-400">Species: {character.species}</p>
              <img src={character.image} alt={character.name} className="w-full rounded mb-2" />
            </div>
          </Link>
  )
}
