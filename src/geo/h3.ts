/**
 * H3 utilities for hex cell manipulation and GeoJSON conversion
 */

import { cellToBoundary } from 'h3-js';

/**
 * Converts an H3 cell to a GeoJSON Feature with Polygon geometry
 * @param cell H3 cell string identifier
 * @returns GeoJSON Feature object
 */
export function h3CellToFeature(cell: string) {
  const boundary = cellToBoundary(cell, true); // true = GeoJSON format [lng, lat]
  const ring = [...boundary, boundary[0]]; // Close the ring

  return {
    type: 'Feature' as const,
    properties: { cell },
    geometry: {
      type: 'Polygon' as const,
      coordinates: [ring],
    },
  };
}

/**
 * Converts multiple H3 cells to a GeoJSON FeatureCollection
 * @param cells Array of H3 cell identifiers
 * @returns GeoJSON FeatureCollection
 */
export function h3CellsToFeatureCollection(cells: string[]) {
  return {
    type: 'FeatureCollection' as const,
    features: cells.map(h3CellToFeature),
  };
}

