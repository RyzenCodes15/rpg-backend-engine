import './globals.css';

export const metadata = {
  title: 'Full-Stack RPG Game',
  description: 'Full-Stack RPG Game Interface',
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
