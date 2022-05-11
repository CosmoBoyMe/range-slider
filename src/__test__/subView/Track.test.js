import '@testing-library/jest-dom';
import { Track } from '../../subView';

describe('Track class:', () => {
  let rootElement;
  beforeEach(() => {
    rootElement = document.createElement('div');
  });

  test('shold destroy element', () => {
    const track = new Track(
      { element: rootElement, isVertical: false, handleTrackClick: (event) => undefined },
    );
    const trackElement = track.getElement();
    track.destroy();

    expect(rootElement).not.toContainElement(trackElement);
  });

  test('shold be in root element', () => {
    const track = new Track(
      { element: rootElement, isVertical: true, handleTrackClick: (event) => undefined },
    );
    const trackElement = track.getElement();

    expect(rootElement).toContainElement(trackElement);
  });
});
