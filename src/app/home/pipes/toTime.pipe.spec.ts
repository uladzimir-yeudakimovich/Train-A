import { ToTimePipe } from './toTime.pipe';

describe('ToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new ToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
