/**
 * Similarity Chart Component
 * Visualizes similarity metrics between code files
 */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SimilarityChartProps {
  data: {
    method: string;
    similarity: number;
  }[];
}

export const SimilarityChart: React.FC<SimilarityChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="method" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="similarity" fill="#3b82f6" name="Similarity %" />
      </BarChart>
    </ResponsiveContainer>
  );
};
