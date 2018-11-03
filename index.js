export function useGestures({
  onTake = () => {},
  onMove = () => {},
  onRelease = () => {},
}) {
  function handleTouchStart(e) {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    handleTake(e.touches[0]);
  }

  function handleTouchMove(e) {
    handleMove(e.touches[0]);
  }

  function handleTouchEnd(e) {
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
    handleRelease(e.touches[0]);
  }

  function handleMouseDown(e) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    handleTake(e);
  }

  function handleMouseMove(e) {
    handleMove(e);
  }

  function handleMouseUp(e) {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    handleRelease(e);
  }

  let initialX = 0;
  let initialY = 0;

  function handleTake({ pageX, pageY }) {
    initialX = pageX;
    initialY = pageY;
    onTake({ pageX, initialX, pageY, initialY });
  }
  function handleMove({ pageX, pageY }) {
    const deltaX = pageX - initialX;
    const deltaY = pageY - initialY;
    onMove({ pageX, initialX, deltaX, pageY, initialY, deltaY });
  }
  function handleRelease({ pageX, pageY }) {
    onRelease({ pageX, initialX, pageY, initialY });
  }

  return {
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
  };
}
