import "@testing-library/jest-dom";

import { Track } from "../../../View/subView";

describe("Track class:", () => {
  let rootElement;
  beforeEach(() => {
    rootElement = document.createElement("div");
  });

  test("should destroy element", () => {
    const track = new Track({
      rootElement,
      isVertical: false,
      handleTrackClick: () => undefined,
    });
    const trackElement = track.getElement();
    track.destroy();

    expect(rootElement).not.toContainElement(trackElement);
  });

  test("should be in root element", () => {
    const track = new Track({
      rootElement,
      isVertical: true,
      handleTrackClick: () => undefined,
    });
    const trackElement = track.getElement();

    expect(rootElement).toContainElement(trackElement);
  });
});
