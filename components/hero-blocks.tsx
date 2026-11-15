/**
 * The "Build Your Next" staircase: blocks drop in from the bottom row up,
 * then a dashed slot at the top keeps receiving the next block.
 */
const ROWS: { color: string; cols: number[] }[] = [
  { color: "bg-g-blue", cols: [1, 2, 3, 4] },
  { color: "bg-g-green", cols: [2, 3, 4] },
  { color: "bg-g-yellow", cols: [3, 4] },
  { color: "bg-g-red", cols: [4] },
];

export function HeroBlocks() {
  let i = 0;
  return (
    <div
      className="grid w-full max-w-[12rem] grid-cols-4 gap-2 sm:max-w-[19rem] sm:gap-2.5"
      style={{ gridTemplateRows: "repeat(5, minmax(0, 1fr))" }}
      aria-hidden="true"
    >
      {/* the open slot */}
      <div className="relative col-start-4 row-start-1 aspect-square">
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed border-ink/60 sm:rounded-2xl">
          <span className="mono text-xl text-ink/60">+</span>
        </div>
        <div className="next-block absolute inset-0 rounded-xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] sm:rounded-2xl">
          <span className="mono absolute inset-0 flex items-center justify-center text-[0.65rem] font-bold uppercase tracking-widest sm:text-[0.7rem]">
            you
          </span>
        </div>
        <span className="mono absolute -top-6 left-1/2 -translate-x-1/2 text-base text-ink/60">↓</span>
      </div>

      {ROWS.map((row, r) =>
        row.cols.map((col) => {
          const delay = 0.25 + i++ * 0.11;
          return (
            <div
              key={`${r}-${col}`}
              className={`block-drop aspect-square rounded-xl border-2 border-ink sm:rounded-2xl ${row.color} shadow-[3px_3px_0_0_var(--ink)]`}
              style={{ gridColumnStart: col, gridRowStart: 5 - r, animationDelay: `${delay}s` }}
            />
          );
        }),
      )}
    </div>
  );
}
