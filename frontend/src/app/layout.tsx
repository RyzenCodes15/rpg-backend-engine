import './globals.css';

export const metadata = {
  title: 'RPG Engine Management',
  description: 'Scalable Multiplayer RPG Backend Engine Interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
