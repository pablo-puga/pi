import Decimal from 'decimal.js';

export const leibniz = function *() {
    let pi = new Decimal(0);
    let sign = 1;
    let next = 1;

    while (true) {
        const addend = (new Decimal(sign)).div(next);
        pi = pi.add(addend);
        sign = -sign;
        next += 2;
        yield pi.mul(4).toPrecision(Decimal.precision);
    }
};

export const nilakantha = function *() {
    let pi = new Decimal(3);
    let sign = 1;
    let next = 2;

    while (true) {
        const addend = (new Decimal(sign)).mul(4).div(new Decimal(next * (next + 1) * (next + 2)));
        pi = pi.add(addend);
        sign = -sign;
        next += 2;
        yield pi.toPrecision(Decimal.precision);
    }
};

export const wallis = function *() {
    let pi = new Decimal(1);
    let next = 1;

    while (true) {
        const twiceNext = 2 * next++;
        const multiplier = (new Decimal(twiceNext)).div(twiceNext - 1).mul(twiceNext).div(twiceNext + 1);
        pi = pi.mul(multiplier);
        yield pi.mul(2).toPrecision(Decimal.precision);
    }
};

export const viete = function *() {
    let pi = new Decimal(1);
    let prevNumerator = 0;

    while (true) {
        const numerator = (new Decimal(2)).add(prevNumerator).sqrt();
        pi = pi.mul(numerator).div(2);
        prevNumerator = numerator;
        yield (new Decimal(2)).div(pi).toPrecision(Decimal.precision);
    }
};