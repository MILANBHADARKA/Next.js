export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
      <>
          <h2>Inner Lemon Layout Item</h2>
          {children}
      </>
    );
  }
  