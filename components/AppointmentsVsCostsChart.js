import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppointmentsVsCostsChart() {
  const chartWidth = 300;
  const chartHeight = 170;
  const originX = 25;
  const originY = 15;
  const plotWidth = chartWidth - originX - 20;
  const plotHeight = chartHeight - originY - 15;

  // Grid configuration
  const numRows = 6;
  const numCols = 8;

  // Yellow Line (Costos) points: [xPercent, yPercent] (0 = top/left, 1 = bottom/right)
  const yellowData = [
    [0.10, 0.82],
    [0.22, 0.74],
    [0.32, 0.76],
    [0.42, 0.58],
    [0.55, 0.48],
    [0.67, 0.47],
    [0.76, 0.38],
    [0.86, 0.40],
    [0.94, 0.22],
  ];

  // Blue Line (Citas) points
  const blueData = [
    [0.08, 0.58],
    [0.20, 0.58],
    [0.30, 0.63],
    [0.40, 0.53],
    [0.52, 0.64],
    [0.64, 0.58],
    [0.76, 0.58],
    [0.85, 0.48],
    [0.96, 0.35],
  ];

  const renderSegments = (points, color, thickness = 3.5) => {
    return points.map((p, i) => {
      if (i === points.length - 1) return null;
      const next = points[i + 1];
      const x1 = originX + p[0] * plotWidth;
      const y1 = originY + p[1] * plotHeight;
      const x2 = originX + next[0] * plotWidth;
      const y2 = originY + next[1] * plotHeight;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;

      return (
        <View
          key={`seg-${color}-${i}`}
          style={{
            position: 'absolute',
            left: cx - length / 2,
            top: cy - thickness / 2,
            width: length,
            height: thickness,
            backgroundColor: color,
            borderRadius: thickness / 2,
            transform: [{ rotate: `${angle}rad` }],
          }}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Leyenda */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#E8A33D' }]} />
          <Text style={styles.legendText}>Costos ($k)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#457B9D' }]} />
          <Text style={styles.legendText}>Citas registradas</Text>
        </View>
      </View>

      <View style={[styles.chartBox, { width: chartWidth, height: chartHeight }]}>
        {/* Cuadrícula horizontal */}
        {Array.from({ length: numRows + 1 }).map((_, i) => {
          const y = originY + (i / numRows) * plotHeight;
          return (
            <View
              key={`grid-h-${i}`}
              style={[
                styles.gridLineH,
                {
                  top: y,
                  left: originX,
                  width: plotWidth + 8,
                },
              ]}
            />
          );
        })}

        {/* Cuadrícula vertical */}
        {Array.from({ length: numCols + 1 }).map((_, i) => {
          const x = originX + (i / numCols) * plotWidth;
          return (
            <View
              key={`grid-v-${i}`}
              style={[
                styles.gridLineV,
                {
                  left: x,
                  top: originY - 4,
                  height: plotHeight + 4,
                },
              ]}
            />
          );
        })}

        {/* Eje Y (flecha hacia arriba) */}
        <View style={[styles.axisY, { left: originX, top: originY, height: plotHeight }]} />
        <View style={[styles.arrowUp, { left: originX - 6, top: originY - 14 }]} />

        {/* Eje X (flecha hacia la derecha) */}
        <View
          style={[
            styles.axisX,
            { left: originX, top: originY + plotHeight, width: plotWidth + 8 },
          ]}
        />
        <View
          style={[
            styles.arrowRight,
            { left: originX + plotWidth + 8, top: originY + plotHeight - 6 },
          ]}
        />

        {/* Líneas de datos */}
        {renderSegments(yellowData, '#E8A33D')}
        {renderSegments(blueData, '#457B9D')}
      </View>

      {/* Meses en el eje X */}
      <View style={[styles.monthsRow, { width: chartWidth - 30 }]}>
        <Text style={styles.monthLabel}>Jun</Text>
        <Text style={styles.monthLabel}>Jul</Text>
        <Text style={styles.monthLabel}>Ago</Text>
        <Text style={styles.monthLabel}>Sep</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 12,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  chartBox: {
    position: 'relative',
  },
  gridLineH: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#C5D8EA',
  },
  gridLineV: {
    position: 'absolute',
    width: 1,
    backgroundColor: '#C5D8EA',
  },
  axisY: {
    position: 'absolute',
    width: 3.5,
    backgroundColor: '#4A7C9D',
  },
  axisX: {
    position: 'absolute',
    height: 3.5,
    backgroundColor: '#4A7C9D',
  },
  arrowUp: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4A7C9D',
  },
  arrowRight: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 14,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#4A7C9D',
  },
  monthsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 10,
    marginTop: 6,
  },
  monthLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
});
