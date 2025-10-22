export default function FixedBg() {
  return (
    <>
      {/* Background image, fixed to the viewport */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/Background.jpg")' }}
      />
      {/* Dark gradient + tiled overlay so text is readable everywhere */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/35 to-black/45 bg-overlay" />
    </>
  );
}
