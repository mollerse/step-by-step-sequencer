function frequencyFromNoteNumber(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

export default class Synth {
  constructor(actx) {
    this.actx = actx;
    this.out = this.comp();
    this.out.connect(actx.destination);

    this.A = 0.0;
    this.D = 0.5;
    this.S = 0.0;
    this.R = 0.0;

    this.notes = {};
  }

  envelope(A, D, S, R) {
    this.A = A;
    this.D = D;
    this.S = S;
    this.R = R;
  }

  osc(type, freq, detune = 0) {
    let o = this.actx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    o.detune.value = detune;
    o.start();

    return o;
  }

  amp() {
    let g = this.actx.createGain();
    g.gain.value = 0.0;

    return g;
  }

  comp() {
    let c = this.actx.createDynamicsCompressor();
    c.threshold.value = 0;
    c.knee.value = 20;
    c.ratio.value = 5;
    c.attack.value = 0;
    c.release.value = 0.25;

    return c;
  }

  play(note, at, dur) {
    if (!note) return;
    let freq = frequencyFromNoteNumber(note);

    let A = this.A * dur;
    let D = this.D * dur;
    let R = this.R * dur;

    let v = this.osc("square", freq, 0);
    let a = this.amp();

    a.gain.setValueAtTime(1, at);
    a.connect(this.out);
    v.connect(a);

    a.gain.linearRampToValueAtTime(1.0, at + A);
    a.gain.linearRampToValueAtTime(this.S, at + A + D);
    a.gain.linearRampToValueAtTime(this.S, at + A + D);
    a.gain.linearRampToValueAtTime(0.0001, at + A + D + R);
    v.stop(at + A + D + R);
  }
}
