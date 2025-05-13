import React, { useState, useEffect } from 'react';
import { Calculator, ChevronDown, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Prediction = Database['public']['Tables']['keam_predictions']['Row'];
type College = Database['public']['Tables']['colleges']['Row'];

interface PredictionResult {
  college: College;
  branch: string;
  probability: 'high' | 'medium' | 'low';
  lastYearClosingRank: number;
}

const KeamPredictor = () => {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [predictionsData, collegesData] = await Promise.all([
        supabase.from('keam_predictions').select('*'),
        supabase.from('colleges').select('*')
      ]);

      setPredictions(predictionsData.data || []);
      setColleges(collegesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const predictColleges = (userRank: number, userCategory: string) => {
    const relevantPredictions = predictions.filter(p => 
      p.category.toLowerCase() === userCategory.toLowerCase()
    );

    const results: PredictionResult[] = [];
    const processedColleges = new Set();

    relevantPredictions.forEach(prediction => {
      const college = colleges.find(c => c.id === prediction.college_id);
      if (!college || processedColleges.has(college.id)) return;

      const rankDifference = prediction.closing_rank - userRank;
      let probability: 'high' | 'medium' | 'low';

      if (rankDifference > 1000) {
        probability = 'high';
      } else if (rankDifference > 0) {
        probability = 'medium';
      } else {
        probability = 'low';
      }

      if (probability !== 'low') {
        results.push({
          college,
          branch: prediction.branch,
          probability,
          lastYearClosingRank: prediction.closing_rank
        });
        processedColleges.add(college.id);
      }
    });

    return results.sort((a, b) => {
      if (a.probability === b.probability) {
        return a.lastYearClosingRank - b.lastYearClosingRank;
      }
      return a.probability === 'high' ? -1 : 1;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const predictedResults = predictColleges(parseInt(rank), category);
    setResults(predictedResults);
    setShowResults(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            KEAM Rank Predictor
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Predict your potential college admissions based on your KEAM rank
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="rank" className="block text-sm font-medium text-gray-700">
                  Your KEAM Rank
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="rank"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your rank"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1 relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                    required
                  >
                    <option value="">Select your category</option>
                    <option value="general">General Merit</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                    <option value="obc">OBC</option>
                    <option value="oec">OEC</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Calculator className="h-5 w-5 mr-2" />
                    Predict Colleges
                  </>
                )}
              </button>
            </form>

            {showResults && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="mt-8 border-t border-gray-200 pt-8"
              >
                <div className="bg-indigo-50 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" />
                  <p className="text-sm text-indigo-700">
                    Based on previous year's data and your rank ({rank}), here are the colleges you might be eligible for:
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {results.length > 0 ? (
                    <>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900">High Chance (90%+)</h3>
                        <ul className="mt-2 space-y-2 text-sm text-gray-600">
                          {results
                            .filter(r => r.probability === 'high')
                            .map((result, index) => (
                              <li key={index}>
                                • {result.college.name} - {result.branch}
                                <span className="text-gray-500 ml-2">
                                  (Last year's closing rank: {result.lastYearClosingRank})
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900">Medium Chance (50-90%)</h3>
                        <ul className="mt-2 space-y-2 text-sm text-gray-600">
                          {results
                            .filter(r => r.probability === 'medium')
                            .map((result, index) => (
                              <li key={index}>
                                • {result.college.name} - {result.branch}
                                <span className="text-gray-500 ml-2">
                                  (Last year's closing rank: {result.lastYearClosingRank})
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500">
                      No colleges found matching your criteria. Try adjusting your rank or category.
                    </div>
                  )}
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Note: This prediction is based on historical data and should be used as a reference only. 
                  Actual cutoffs may vary during counseling.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default KeamPredictor;