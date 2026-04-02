import { useState, useEffect, useCallback } from 'react';
import { evaluationService } from '../services/api';
import logger from '../utils/logger';

export default function useEvaluations(userContext = {}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await evaluationService.getHistory(userContext);
      setHistory(res.data);
      setError(null);
    } catch (err) {
      logger.error("Error fetching history", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userContext.email, userContext.name, userContext.role]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refresh: fetchHistory };
}
