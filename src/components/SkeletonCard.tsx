export function SkeletonCard() {
  return (
    <div className='skeleton-card' aria-hidden='true'>
      <div className='skeleton-img skeleton' />
      <div className='skeleton-title skeleton' />
      <div className='skeleton-meta skeleton' />
    </div>
  );
}
