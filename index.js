export function useGestures({
  onTake = () => {},
  onMove = () => {},
  onRelease = () => {},
}) {
  let lastMove;

  function handleTouchStart(e) {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    handleTake(e.touches[0]);
  }

  function handleTouchMove(e) {
    handleMove(e.touches[0]);
  }

  function handleTouchEnd(e) {
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('touchcancel', handleTouchEnd);
    // weird chrome bug where touchend event is called without the touch data
    // so we patch with the last touch coordinate we have
    if (e.touches.length === 0) {
      handleRelease(lastMove);
    } else {
      handleRelease(e.touches[0]);
    }
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
    lastMove = { pageX, pageY };
    onTake({ pageX, initialX, pageY, initialY });
  }
  function handleMove({ pageX, pageY }) {
    const deltaX = pageX - initialX;
    const deltaY = pageY - initialY;
    lastMove = { pageX, pageY };
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
