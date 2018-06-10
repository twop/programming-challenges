//https://www.hackerrank.com/challenges/ctci-connected-cell-in-a-grid/problem

type Size = {
  h: number;
  w: number;
};

type Grid<T> = T[][];

type Region = { [key: number]: string };

type RunningRow = {
  cur?: Region;
  regions: Region[];
};

type Aggregate = {
  complete: Region[];
  running: Region[];
};

const strVal = (x: number, y: number) => `(${x}, ${y})`;

const calcRegions = <T>(
  data: Grid<T>,
  height: number,
  width: number,
  isFilled: (v: T) => boolean
): Region[] => {
  if (width <= 0 || height <= 0) return [];

  const toIndex = (x: number, y: number) => y * width + x;
  const getX = (index: number) => index % width;
  const getY = (index: number) => (index - getX(index)) / width;

  const touchesAbove = (index: number, region: Region): boolean => {
    const x = getX(index);
    const y = getY(index);

    return !!(
      region[toIndex(x, y - 1)] ||
      region[toIndex(Math.max(0, x - 1), y - 1)] ||
      region[toIndex(Math.min(width - 1, x + 1), y - 1)]
    );
  };

  const overlap = (a: Region, b: Region) => {
    for (const key in a) {
      if (touchesAbove(Number(key), b)) {
        return true;
      }
    }
    return false;
  };

  const aggregateRow = (y: number) => (
    { cur, regions }: RunningRow,
    val: T,
    x: number
  ): RunningRow => {
    if (cur && isFilled(val)) {
      return { regions, cur: { ...cur, [toIndex(x, y)]: strVal(x, y) } };
    }

    if (cur && !isFilled(val)) {
      return { regions: [...regions, cur] };
    }

    if (!cur && isFilled(val)) {
      const newRegion = { [toIndex(x, y)]: strVal(x, y) };
      return { regions, cur: newRegion };
    }

    return { cur, regions };
  };

  const aggregate = (
    { running, complete }: Aggregate,
    rowRegions: Region[]
  ): Aggregate => {
    type Res = {
      merged: Region[];
      untouched: Region[];
      toNext: Region[];
    };

    const { merged, untouched, toNext } = rowRegions.reduce(
      ({ merged, untouched, toNext }: Res, r) => {
        const mergedOverlap = merged.filter(i => overlap(r, i));
        const untouchedOverlap = untouched.filter(i => overlap(r, i));

        if (mergedOverlap.length <= 0 && untouched.length <= 0) {
          return { merged, untouched, toNext: [...toNext, r] };
        }

        return {
          merged: merged
            .filter(i => !overlap(r, i))
            .concat(
              mergedOverlap
                .concat(untouchedOverlap)
                .reduce((a, b) => ({ ...a, ...b }), r)
            ),
          untouched: untouched.filter(i => !overlap(r, i)),
          toNext
        };
      },
      { merged: [], untouched: running, toNext: [] }
    );

    // console.log("\n---------------------");
    // console.log("prevRun", running);
    // console.log("prevComplete", complete);
    // console.log("row", rowRegions);

    const res: Aggregate = {
      complete: complete.concat(untouched),
      running: merged.concat(toNext)
    };

    // console.log("\n");
    // console.log("newRun", res.running);
    // console.log("newComplete", res.complete);

    return res;
  };

  const rowToRegions = (row: T[], y: number): Region[] => {
    const { regions, cur } = row.reduce(aggregateRow(y), { regions: [] });
    return cur ? [...regions, cur] : regions;
  };

  const start: Aggregate = { complete: [], running: [] };
  const { complete, running } = data.map(rowToRegions).reduce(aggregate, start);

  return complete.concat(running);
};

const mergeRegions = (a: Region, b: Region): Region => ({ ...a, ...b });

const largestRegionSize = (regions: Region[]) =>
  regions.reduce((size, r) => Math.max(size, Object.keys(r).length), 0);

const input: Grid<number> = [[1, 1, 0], [0, 0, 1], [1, 0, 0]];

const res = calcRegions(input, 3, 3, v => v === 1);

console.log(res);
console.log(largestRegionSize(res));
