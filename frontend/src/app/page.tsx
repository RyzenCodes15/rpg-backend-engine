import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-pixel text-rpg-primary mb-8 text-center drop-shadow-[0_0_10px_rgba(200,75,49,0.8)]">
        Scalable RPG Engine
      </h1>
      
      <p className="text-xl md:text-2xl font-retro text-rpg-text mb-12 text-center max-w-2xl">
        A production-grade backend engine designed for massively multiplayer online role-playing games.
      </p>

      <div className="flex gap-4">
        <Link href="/login" className="font-pixel text-xs sm:text-sm uppercase py-3 px-6 pixel-border bg-rpg-primary hover:bg-rpg-primaryHover text-white transition-transform active:translate-y-1">
          Login
        </Link>
        <Link href="/register" className="font-pixel text-xs sm:text-sm uppercase py-3 px-6 pixel-border bg-rpg-surface hover:bg-rpg-border text-rpg-text transition-transform active:translate-y-1">
          Register
        </Link>
      </div>
    </div>
  );
}
