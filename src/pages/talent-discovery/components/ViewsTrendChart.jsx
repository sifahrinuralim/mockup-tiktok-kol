import { useId } from 'react';

import { cn } from '@/utils/cn';
import { formatCompactNumber } from '@/utils/metrics';

/** Dimensi kanvas SVG (dipakai bersama viewBox agar responsif). */
const VIEWBOX_WIDTH = 680;
const VIEWBOX_HEIGHT = 240;

/** Ruang kosong tiap sisi kanvas untuk label sumbu. */
const PADDING = {
  top: 16,
  right: 16,
  bottom: 34,
  left: 60,
};

/** Jumlah segmen garis bantu horizontal (sumbu Y). */
const GRID_SEGMENTS = 4;

const toX = (index, count, plotWidth) => {
  if (count <= 1) return PADDING.left + plotWidth / 2;
  return PADDING.left + (index / (count - 1)) * plotWidth;
};

const toY = (value, maxValue, plotHeight) =>
  PADDING.top + (1 - value / maxValue) * plotHeight;

/** Indeks label sumbu X: awal, dua titik tengah, dan titik terakhir. */
const getXLabelIndexes = (count) => {
  if (count <= 1) return [0];
  return [0, Math.round((count - 1) / 3), Math.round(((count - 1) * 2) / 3), count - 1];
};

/**
 * Grafik garis (area chart) SVG tanpa dependency untuk tren total views harian.
 * Responsif via viewBox sehingga nyaman ditampilkan di dalam Quick View.
 */
export const ViewsTrendChart = ({ data, className }) => {
  const gradientId = `views-trend-${useId().replace(/:/g, '')}`;
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
    (path, point) =>
      `${path} L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
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
        aria-label={`Grafik total views harian 30 hari terakhir. Puncak ${formatCompactNumber(
          rawMax,
          1,
        )} view per hari.`}
        className="h-auto w-full"
      >
        <desc>
          Grafik garis yang menunjukkan tren kenaikan total views harian kreator dalam 30 hari
          terakhir.
        </desc>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid horizontal + label sumbu Y */}
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
                {formatCompactNumber(value, 0)}
              </text>
            </g>
          );
        })}

        {/* Area + garis tren */}
        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Titik akhir data */}
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r="4"
          fill="#ffffff"
          stroke="#4f46e5"
          strokeWidth="3"
        />

        {/* Label sumbu X */}
        {xLabelIndexes.map((index) => (
          <text
            key={`x-${index}`}
            x={points[index].x}
            y={VIEWBOX_HEIGHT - 8}
            textAnchor="middle"
            fontSize="11"
            fill="#94a3b8"
          >
            {index === count - 1 ? 'Hari ini' : `${count - index} hari lalu`}
          </text>
        ))}
      </svg>
    </div>
  );
};
