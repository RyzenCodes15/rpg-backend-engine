import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 md:left-32 w-32 h-32 md:w-64 md:h-64 animate-[bounce_4s_infinite]">
          <Image src="/assets/heroes/warrior.png" alt="Warrior" fill className="object-contain pixelated" />
        </div>
        <div className="absolute bottom-1/4 right-10 md:right-32 w-32 h-32 md:w-64 md:h-64 animate-[bounce_5s_infinite_reverse]">
          <Image src="/assets/monsters/goblin.png" alt="Goblin" fill className="object-contain pixelated" />
        </div>
      </div>

      <div className="z-10 bg-rpg-surface/80 p-8 md:p-16 border-4 border-rpg-border pixel-border backdrop-blur-sm max-w-4xl w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-7xl font-pixel text-rpg-primary mb-8 text-center drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase">
          Monster<br/>Maniac
        </h1>
        
        <p className="text-xl md:text-2xl font-retro text-white mb-12 text-center max-w-2xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          A production-grade backend engine designed for massively multiplayer online role-playing games.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/login" className="font-pixel text-sm sm:text-base uppercase py-4 px-8 pixel-border bg-rpg-primary hover:bg-rpg-primaryHover text-white transition-transform active:translate-y-1 text-center drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Enter Realm
          </Link>
          <Link href="/register" className="font-pixel text-sm sm:text-base uppercase py-4 px-8 pixel-border bg-rpg-surface hover:bg-rpg-border text-white transition-transform active:translate-y-1 text-center drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
