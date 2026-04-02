import { useState, useEffect, useCallback } from 'react';
import { evaluationService } from '../services/api';
import logger from '../utils/logger';

export default function useEvaluations() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await evaluationService.getHistory();
      setHistory(res.data);
      setError(null);
    } catch (err) {
      logger.error("Error fetching history", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refresh: fetchHistory };
}
