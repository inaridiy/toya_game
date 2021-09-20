import { EventDispatcher, GameEvent } from '../src/engine/core/EventDispatcher';
const spyLog = jest.spyOn(console, 'log');
spyLog.mockImplementation((x: string) => x);

describe('EventDispatcherのテスト', () => {
  const eventDispatcher = new EventDispatcher<string>();
  const mockCB = jest.fn();
  test('addEventLisnerのテスト', () => {
    eventDispatcher.addEventListener('test', mockCB);
    expect('test' in eventDispatcher._eventListeners).toBe(true);
    eventDispatcher.addEventListener('test', mockCB);
    expect(eventDispatcher._eventListeners.test.length).toBe(2);
  });

  test('despathのテスト', () => {
    const event = new GameEvent('テスト');
    mockCB.mockClear();
    eventDispatcher.dispatchEvent('test', event);
    expect(mockCB.mock.calls.length).toBe(2);
    expect(mockCB.mock.calls[0]).toEqual([event]);
    expect(mockCB.mock.calls[1]).toEqual([event]);

    const event2 = new GameEvent('テスト2');
    mockCB.mockClear();
    eventDispatcher.dispatchEvent('test', event2);
    expect(mockCB.mock.calls.length).toBe(2);
    expect(mockCB.mock.calls[0]).toEqual([event2]);
    expect(mockCB.mock.calls[1]).toEqual([event2]);

    const event3 = new GameEvent('テスト3');
    mockCB.mockClear();
    eventDispatcher.dispatchEvent('Doesnt exist.', event3);
    expect(mockCB.mock.calls.length).toBe(0);
  });
});
