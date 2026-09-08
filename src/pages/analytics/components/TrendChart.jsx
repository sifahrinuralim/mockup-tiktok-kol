import { useId } from 'react';

import { cn } from '@/utils/cn';
import { formatCompactNumber } from '@/utils/metrics';

/** SVG canvas dimensions (viewBox so it stays responsive). */
const VIEWBOX_WIDTH = 720;
const VIEWBOX_HEIGHT = 260;

/** Empty space on each side of the canvas for axis labels. */
const PADDING = { top: 18, right: 18, bottom: 34, left: 64 };

/** Number of horizontal guide-line segments. */
const GRID_SEGMENTS = 4;

/** Line palette per metric: views (indigo) & engagement (cyan). */
const ACCENTS = {
  indigo: { stroke: '#4f46e5', areaTop: '#4f46e5', areaOpacity: '0.28' },
  cyan: { stroke: '#06b6d4', areaTop: '#06b6d4', areaOpacity: '0.24' },
};

const toX = (index, count, plotWidth) =>
  count <= 1 ? PADDING.left + plotWidth / 2 : PADDING.left + (index / (count - 1)) * plotWidth;

const toY = (value, maxValue, plotHeight) => PADDING.top + (1 - value / maxValue) * plotHeight;

/** X-axis labels: the start, two middle points, and the last one. */
const getXLabelIndexes = (count) => {
  if (count <= 1) return [0];
  return [0, Math.round((count - 1) / 3), Math.round(((count - 1) * 2) / 3), count - 1];
};

/** Formats Y-axis tick labels (percents use one decimal + the % symbol). */
const formatTick = (value, unit) =>
  unit === 'percent' ? `${value.toFixed(1)}%` : formatCompactNumber(value, 0);

/**
 * Dependency-free SVG area/line chart.
 * Used for the analytics views & engagement trends, with X-axis labels
 * computed from the period dates (date util).
 */
export const TrendChart = ({ data, labels, unit = 'count', accent = 'indigo', className }) => {
  const gradientId = `trend-${useId().replace(/:/g, '')}`;
  const color = ACCENTS[accent] ?? ACCENTS.indigo;
  const count = data.length;

  if (count === 0) return null;

  const plotWidth = VIEWBOX_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = VIEWBOX_HEIGHT - PADDING.top - PADDING.bottom;
  const baselineY = PADDING.top + plotHeight;

  const rawMax = Math.max(...data);
  const maxValue = Math.max(rawMax * 1.12, 1);

  const points = data.map((value, index) => ({
    x: toX(index, count, plotWidth),
    y: toY(value, maxValue, plotHeight),
  }));

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const linePath = points.reduce(
    (path, point) => `${path} L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
    `M ${firstPoint.x.toFixed(1)} ${firstPoint.y.toFixed(1)}`,
  );
  const areaPath = `${linePath} L ${lastPoint.x.toFixed(1)} ${baselineY} L ${firstPoint.x.toFixed(1)} ${baselineY} Z`;

  const gridValues = Array.from(
    { length: GRID_SEGMENTS + 1 },
    (_, index) => maxValue * (1 - index / GRID_SEGMENTS),
  );
  const xLabelIndexes = getXLabelIndexes(count);

  return (
    <div className={cn('w-full', className)}>
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        role="img"
        aria-label={`Daily trend chart. Peak ${formatTick(rawMax, unit)} per day.`}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color.areaTop} stopOpacity={color.areaOpacity} />
            <stop offset="100%" stopColor={color.areaTop} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {gridValues.map((value, index) => {
          const y = toY(value, maxValue, plotHeight);
          return (
            <g key={`grid-${index}`}>
              <line
                x1={PADDING.left}
                y1={y}
                x2={VIEWBOX_WIDTH - PADDING.right}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray={index === GRID_SEGMENTS ? undefined : '4 4'}
              />
              <text x={PADDING.left - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">
                {formatTick(value, unit)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={color.stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill="#ffffff" stroke={color.stroke} strokeWidth="3" />

        {xLabelIndexes.map((index) => (
          <text
            key={`x-${index}`}
            x={points[index].x}
            y={VIEWBOX_HEIGHT - 8}
            textAnchor="middle"
            fontSize="11"
            fill="#94a3b8"
          >
            {labels[index]}
          </text>
        ))}
      </svg>
    </div>
  );
};
